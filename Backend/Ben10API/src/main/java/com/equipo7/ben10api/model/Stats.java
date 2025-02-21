package com.equipo7.ben10api.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "stats")
@Getter
@Setter
public class Stats {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int speed;
    private int strength;
    private int agility;
    private int intelligence;
    private int durability;
    private int energy; // Power reserves
    private int combatSkill; // Fighting ability

    @OneToOne(mappedBy = "stats", cascade = CascadeType.ALL)
    private Alien alien;
}
