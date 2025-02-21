package com.equipo7.ben10api.service;

import com.equipo7.ben10api.controller.CreateAlienDTO;
import com.equipo7.ben10api.dto.AlienDTO;
import com.equipo7.ben10api.dto.StatsDTO;
import com.equipo7.ben10api.model.Alien;
import com.equipo7.ben10api.model.Stats;
import com.equipo7.ben10api.repository.AlienRepository;
import com.equipo7.ben10api.repository.StatsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AlienService {
    private final AlienRepository alienRepository;
    private final StatsRepository statsRepository;

    public AlienService(AlienRepository alienRepository, StatsRepository statsRepository) {
        this.alienRepository = alienRepository;
        this.statsRepository = statsRepository;
    }

    public List<AlienDTO> getAllAliens() {
        return alienRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<AlienDTO> getAlienById(Long id) {
        return alienRepository.findById(id).map(this::convertToDTO);
    }

    public AlienDTO createAlien(CreateAlienDTO createAlienDTO) {
        // Convert JSON DTO to Entity
        Alien alien = new Alien();
        alien.setName(createAlienDTO.getName());
        alien.setDescription(createAlienDTO.getDescription());
        alien.setImageUrl(createAlienDTO.getImageUrl());

        Stats stats = new Stats();
        stats.setSpeed(createAlienDTO.getStats().getSpeed());
        stats.setStrength(createAlienDTO.getStats().getStrength());
        stats.setAgility(createAlienDTO.getStats().getAgility());
        stats.setIntelligence(createAlienDTO.getStats().getIntelligence());
        stats.setDurability(createAlienDTO.getStats().getDurability());
        stats.setEnergy(createAlienDTO.getStats().getEnergy());
        stats.setCombatSkill(createAlienDTO.getStats().getCombatSkill());

        // Save Stats first
        Stats savedStats = statsRepository.save(stats);
        alien.setStats(savedStats);

        // Save Alien
        Alien savedAlien = alienRepository.save(alien);

        // Convert back to DTO
        StatsDTO statsDTO = new StatsDTO(
                savedStats.getSpeed(), savedStats.getStrength(), savedStats.getAgility(),
                savedStats.getIntelligence(), savedStats.getDurability(),
                savedStats.getEnergy(), savedStats.getCombatSkill());

        return new AlienDTO(savedAlien.getId(), savedAlien.getName(), savedAlien.getDescription(), savedAlien.getImageUrl(), statsDTO);
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