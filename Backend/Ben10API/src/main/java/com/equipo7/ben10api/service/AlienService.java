package com.equipo7.ben10api.service;

import com.equipo7.ben10api.dto.AlienDTO;
import com.equipo7.ben10api.dto.StatsDTO;
import com.equipo7.ben10api.model.Alien;
import com.equipo7.ben10api.repository.AlienRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlienService {
    private final AlienRepository alienRepository;

    public AlienService(AlienRepository alienRepository) {
        this.alienRepository = alienRepository;
    }

    public List<AlienDTO> getAllAliens() {
        return alienRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<AlienDTO> getAlienById(Long id) {
        return alienRepository.findById(id).map(this::convertToDTO);
    }

    public Alien createAlien(Alien alien) {
        return alienRepository.save(alien);
    }

    public void deleteAlien(Long id) {
        alienRepository.deleteById(id);
    }

    // Convert `Alien` entity to `AlienDTO`
    private AlienDTO convertToDTO(Alien alien) {
        StatsDTO statsDTO = new StatsDTO(
                alien.getStats().getSpeed(),
                alien.getStats().getStrength(),
                alien.getStats().getAgility(),
                alien.getStats().getIntelligence(),
                alien.getStats().getDurability(),
                alien.getStats().getEnergy(),
                alien.getStats().getCombatSkill()
        );

        return new AlienDTO(alien.getId(), alien.getName(), alien.getDescription(), alien.getImageUrl(), statsDTO);
    }
}