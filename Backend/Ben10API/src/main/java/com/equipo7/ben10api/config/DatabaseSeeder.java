package com.equipo7.ben10api.config;

import com.equipo7.ben10api.enums.UserType;
import com.equipo7.ben10api.model.User;
import com.equipo7.ben10api.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DatabaseSeeder {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public DatabaseSeeder(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    @PostConstruct
    public void seedDatabase() {
        if (!userRepository.existsByUserType(UserType.BEN_10)) {
            User ben10 = new User();
            ben10.setUsername("ben10");
            ben10.setUserType(UserType.BEN_10);
            ben10.setPassword(passwordEncoder.encode("password")); // Hash password

            userRepository.save(ben10);
        }
    }
}
