package com.equipo7.ben10api.service;

import com.equipo7.ben10api.dto.TransformationDTO;
import com.equipo7.ben10api.enums.UserType;
import com.equipo7.ben10api.exception.*;
import com.equipo7.ben10api.model.Alien;
import com.equipo7.ben10api.model.Transformation;
import com.equipo7.ben10api.model.User;
import com.equipo7.ben10api.repository.AlienRepository;
import com.equipo7.ben10api.repository.TransformationRepository;
import com.equipo7.ben10api.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.scheduling.support.CronTrigger;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransformationService {
    private final UserRepository userRepository;
    private final AlienRepository alienRepository;
    private final TransformationRepository transformationRepository;
    private final ThreadPoolTaskScheduler taskScheduler;

    public TransformationService(UserRepository userRepository, AlienRepository alienRepository, TransformationRepository transformationRepository) {
        this.userRepository = userRepository;
        this.alienRepository = alienRepository;
        this.transformationRepository = transformationRepository;
        this.taskScheduler = new ThreadPoolTaskScheduler();
        this.taskScheduler.initialize();
    }

    public List<Transformation> getTransformationsByUser(Long userId) {
        return transformationRepository.findByUserId(userId);
    }

    public TransformationDTO getActiveTransformation() {
        Transformation transformation = transformationRepository.findByActiveTrue()
                .orElseThrow(() -> new NoActiveTransformationException("No active transformation found."));

        return new TransformationDTO(
                transformation.getId(),
                transformation.getUser().getUsername(),
                transformation.getAlien().getName(),
                transformation.getInitDate(),
                transformation.getEndDate(),
                transformation.isActive()
        );
    }

    public TransformationDTO createTransformation(Long alienId) {
        User ben10 = userRepository.findByUserType(UserType.BEN_10)
                .orElseThrow(() -> new Ben10NotFoundException("Ben 10 user not found!"));

        Alien alien = alienRepository.findById(alienId)
                .orElseThrow(() -> new AlienNotFoundException("Alien not found!"));

        transformationRepository.findByUserIdAndActiveTrue(ben10.getId()).ifPresent(t -> {
            throw new TransformationAlreadyActiveException("Ben 10 is already transformed! Stop the current transformation first.");
        });

        LocalDateTime initDate = LocalDateTime.now();
        LocalDateTime endDate = initDate.plusSeconds(alien.getTransformationDuration());

        Transformation transformation = new Transformation(null,ben10, alien, initDate, endDate, true);
        transformationRepository.save(transformation);

        int durationSeconds = alien.getTransformationDuration();
        scheduleTransformationDeactivation(transformation.getId(), durationSeconds * 1000L);

        return new TransformationDTO(transformation.getId(), ben10.getUsername(), alien.getName(), initDate, endDate, true);
    }

    // ✅ Schedules deactivation exactly when transformation should end
    private void scheduleTransformationDeactivation(Long transformationId, long delayInMillis) {
        taskScheduler.schedule(() -> {
            Transformation transformation = transformationRepository.findById(transformationId)
                    .orElseThrow(() -> new TransformNotFoundException("Transformation not found!"));

            if (transformation.isActive()) {
                transformation.setActive(false);
                transformationRepository.save(transformation);
                System.out.println("Transformation " + transformationId + " has been automatically deactivated.");
            }
        }, new java.util.Date(System.currentTimeMillis() + delayInMillis)); // Runs after delay
    }

    public TransformationDTO stopActiveTransformation() {
        User ben10 = userRepository.findByUserType(UserType.BEN_10)
                .orElseThrow(() -> new Ben10NotFoundException("Ben 10 user not found!"));

        Transformation transformation = transformationRepository.findByUserIdAndActiveTrue(ben10.getId())
                .orElseThrow(() -> new NoActiveTransformationException("No active transformation found to stop."));

        transformation.setActive(false);
        transformation.setEndDate(LocalDateTime.now());
        transformationRepository.save(transformation);

        return new TransformationDTO(
                transformation.getId(),
                ben10.getUsername(),
                transformation.getAlien().getName(),
                transformation.getInitDate(),
                LocalDateTime.now(), // Set endDate to the current time
                false
        );
    }

    @PostConstruct
    public void checkAndRescheduleActiveTransformation() {
        List<Transformation> activeTransformation = transformationRepository.findAllByActiveTrue();

        if (!activeTransformation.isEmpty()) {
            Transformation transformation = activeTransformation.get(0);
            LocalDateTime now = LocalDateTime.now();
            LocalDateTime endDate = transformation.getEndDate();

            if (now.isBefore(endDate)) {
                long remainingMillis = Duration.between(now, endDate).toMillis();
                System.out.println("Rescheduling transformation " + transformation.getId() + " to deactivate in " + remainingMillis / 1000 + " seconds.");
                scheduleTransformationDeactivation(transformation.getId(), remainingMillis);
            } else {
                // If endDate is in the past, deactivate it immediately
                transformation.setActive(false);
                transformationRepository.save(transformation);
                System.out.println("Transformation " + transformation.getId() + " was expired and is now deactivated.");
            }
        }
    }

    public void deleteTransformation(Long id) {
        transformationRepository.deleteById(id);
    }
}