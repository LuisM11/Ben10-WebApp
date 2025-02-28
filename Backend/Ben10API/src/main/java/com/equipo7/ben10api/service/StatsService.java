package com.equipo7.ben10api.service;

import com.equipo7.ben10api.model.Stats;
import com.equipo7.ben10api.repository.StatsRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatsService {
    private final StatsRepository statsRepository;

    public StatsService(StatsRepository statsRepository) {
        this.statsRepository = statsRepository;
    }

    public List<Stats> getAllStats() {
        return statsRepository.findAll();
    }

    public Optional<Stats> getStatsById(Long id) {
        return statsRepository.findById(id);
    }

    public Stats createStats(Stats stats) {
        return statsRepository.save(stats);
    }

    public void deleteStats(Long id) {
        statsRepository.deleteById(id);
    }
}
