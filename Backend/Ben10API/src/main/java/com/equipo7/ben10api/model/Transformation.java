package com.equipo7.ben10api.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Duration;
import java.time.LocalDateTime;


@Entity
@Table(name = "transformations")
@Getter
@Setter
public class Transformation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Only BEN 10 can transform

    @ManyToOne
    @JoinColumn(name = "alien_id", nullable = false)
    private Alien alien;

    @Column(nullable = false)
    private LocalDateTime initDate;

    @Column(nullable = false)
    private LocalDateTime endDate;

    @Transient
    public Duration getDuration() {
        return Duration.between(initDate, endDate);
    }
}

