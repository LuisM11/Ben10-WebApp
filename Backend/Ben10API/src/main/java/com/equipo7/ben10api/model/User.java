package com.equipo7.ben10api.model;

import com.equipo7.ben10api.enums.UserType;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false) // Ensure passwords are mandatory
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserType userType; // ENUM: COMMON, BEN_10

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Transformation> transformations;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_favorites",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "alien_id")
    )
    private Set<Alien> favorites = new HashSet<>();

    // ✅ Add Favorite Alien
    public void addFavorite(Alien alien) {
        favorites.add(alien);
    }

    // ✅ Remove Favorite Alien
    public void removeFavorite(Alien alien) {
        favorites.remove(alien);
    }
}

