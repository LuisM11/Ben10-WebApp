package com.equipo7.ben10api.controller;

import com.equipo7.ben10api.dto.StatsDTO;

public class CreateAlienDTO {
    private String name;
    private String description;
    private String imageUrl;
    private StatsDTO stats; // Nested object

    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getImageUrl() { return imageUrl; }
    public StatsDTO getStats() { return stats; }
}

