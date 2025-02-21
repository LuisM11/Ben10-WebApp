package com.equipo7.ben10api.controller;

import com.equipo7.ben10api.dto.AlienDTO;
import com.equipo7.ben10api.model.Alien;
import com.equipo7.ben10api.service.AlienService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/aliens")
public class AlienController {
    private final AlienService alienService;

    public AlienController(AlienService alienService) {
        this.alienService = alienService;
    }

    @GetMapping
    public List<AlienDTO> getAllAliens() {
        return alienService.getAllAliens();
    }

    @GetMapping("/{id}")
    public ResponseEntity<AlienDTO> getAlienById(@PathVariable Long id) {
        return alienService.getAlienById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alien createAlien(@RequestBody Alien alien) {
        return alienService.createAlien(alien);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAlien(@PathVariable Long id) {
        alienService.deleteAlien(id);
        return ResponseEntity.noContent().build();
    }
}
