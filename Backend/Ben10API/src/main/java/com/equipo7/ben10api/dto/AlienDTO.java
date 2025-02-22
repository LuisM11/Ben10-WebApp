package com.equipo7.ben10api.dto;


import lombok.Getter;

@Getter
public class AlienDTO {
    private Long id;
    private String name;
    private String description;
    private String imageUrl;
    private StatsDTO stats; // Include stats directly

    public AlienDTO(Long id, String name, String description, String imageUrl, StatsDTO stats) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.stats = stats;
    }

}

