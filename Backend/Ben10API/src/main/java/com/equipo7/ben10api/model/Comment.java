package com.equipo7.ben10api.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
@Getter
@Setter
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "alien_id", nullable = false)
    private Alien alien;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    public Comment() {}

    public Comment(String content, User user, Alien alien) {
        this.content = content;
        this.user = user;
        this.alien = alien;
        this.createdAt = LocalDateTime.now(); // ✅ Set creation time automatically
    }
}

