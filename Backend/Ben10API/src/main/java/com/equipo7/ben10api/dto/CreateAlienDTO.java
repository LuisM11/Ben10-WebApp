package com.equipo7.ben10api.dto;

import lombok.Getter;

@Getter
public class CreateAlienDTO {
    private String name;
    private String description;
    private String imageUrl;
    private int transformationDuration; //in seconds
    private StatsDTO stats; // Nested object

}

