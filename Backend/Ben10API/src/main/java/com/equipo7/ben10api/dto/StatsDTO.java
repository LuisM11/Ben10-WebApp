package com.equipo7.ben10api.dto;


import lombok.Getter;

@Getter
public class StatsDTO {
    private int speed;
    private int strength;
    private int agility;
    private int intelligence;
    private int durability;
    private int energy;
    private int combatSkill;

    public StatsDTO(int speed, int strength, int agility, int intelligence, int durability, int energy, int combatSkill) {
        this.speed = speed;
        this.strength = strength;
        this.agility = agility;
        this.intelligence = intelligence;
        this.durability = durability;
        this.energy = energy;
        this.combatSkill = combatSkill;
    }

}

