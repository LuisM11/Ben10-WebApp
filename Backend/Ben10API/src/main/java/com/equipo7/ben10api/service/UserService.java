package com.equipo7.ben10api.service;

import com.equipo7.ben10api.dto.UserDTO;
import com.equipo7.ben10api.dto.AlienDTO;
import com.equipo7.ben10api.dto.CreateUserDTO;
import com.equipo7.ben10api.dto.StatsDTO;
import com.equipo7.ben10api.enums.UserType;
import com.equipo7.ben10api.exception.*;
import com.equipo7.ben10api.model.Alien;
import com.equipo7.ben10api.model.User;
import com.equipo7.ben10api.repository.AlienRepository;
import com.equipo7.ben10api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final AlienRepository alienRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, AlienRepository alienRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.alienRepository = alienRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(u -> new UserDTO(u.getId(), u.getUsername(), u.getUserType()))
                .collect(Collectors.toList());
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public UserDTO createUser(CreateUserDTO createUserDTO) {
        // Ensure only one BEN_10 user exists
        if (createUserDTO.getUserType().equals(UserType.BEN_10)) {
            if (userRepository.existsByUserType(UserType.BEN_10)) {
                throw new Ben10AlreadyExistsException("Only one Ben 10 can exist!");
            }
        }

        User user = new User();
        user.setUsername(createUserDTO.getUsername());
        user.setUserType(createUserDTO.getUserType());
        user.setPassword(passwordEncoder.encode(createUserDTO.getPassword())); // Hash password

        User savedUser = userRepository.save(user);

        // Return DTO (excluding password)
        return new UserDTO(savedUser.getId(), savedUser.getUsername(), savedUser.getUserType());
    }
    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    public List<AlienDTO> addAlienToBen10Favorites(Long alienId) {
        User ben10 = userRepository.findByUserType(UserType.BEN_10)
                .orElseThrow(() -> new Ben10NotFoundException("Ben 10 user not found!"));

        Alien alien = alienRepository.findById(alienId)
                .orElseThrow(() -> new AlienNotFoundException("Alien not found!"));

        if (ben10.getFavorites().contains(alien)) {
            throw new AlienAlreadyFavoritedException("This alien is already in Ben 10's favorites!");
        }

        ben10.addFavorite(alien);
        return getAlienDTOS(ben10);
    }

    public List<AlienDTO> removeAlienFromBen10Favorites(Long alienId) {
        User ben10 = userRepository.findByUserType(UserType.BEN_10)
                .orElseThrow(() -> new Ben10NotFoundException("Ben 10 user not found!"));

        Alien alien = alienRepository.findById(alienId)
                .orElseThrow(() -> new AlienNotFoundException("Alien not found!"));

        if (!ben10.getFavorites().contains(alien)) {
            throw new AlienNotFavoritedException("This alien is not in Ben 10's favorites!");
        }

        ben10.removeFavorite(alien);
        return getAlienDTOS(ben10);
    }

    public List<AlienDTO> getBen10Favorites() {
        User ben10 = userRepository.findByUserType(UserType.BEN_10)
                .orElseThrow(() -> new Ben10NotFoundException("Ben 10 user not found!"));

        return getAlienDTOS(ben10);
    }

    private List<AlienDTO> getAlienDTOS(User ben10) {
        userRepository.save(ben10);

        return ben10.getFavorites().stream()
                .map(a -> new AlienDTO(
                        a.getId(),
                        a.getName(),
                        a.getDescription(),
                        a.getImageUrl(),
                        a.getTransformationDuration(),
                        (a.getStats() != null) ? new StatsDTO(
                                a.getStats().getSpeed(),
                                a.getStats().getStrength(),
                                a.getStats().getAgility(),
                                a.getStats().getIntelligence(),
                                a.getStats().getDurability(),
                                a.getStats().getEnergy(),
                                a.getStats().getCombatSkill()
                        ) : null
                ))
                .collect(Collectors.toList());
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

