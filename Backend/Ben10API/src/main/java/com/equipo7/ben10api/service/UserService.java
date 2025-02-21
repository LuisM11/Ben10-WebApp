package com.equipo7.ben10api.service;

import com.equipo7.ben10api.dto.CreateUserDTO;
import com.equipo7.ben10api.enums.UserType;
import com.equipo7.ben10api.model.User;
import com.equipo7.ben10api.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(CreateUserDTO createUserDTO) {
        // Check if the role is BEN_10 and one already exists
        if (createUserDTO.getUserType().equals(UserType.BEN_10)) {
            if (userRepository.existsByUserType(UserType.BEN_10)) {
                throw new RuntimeException("Only one Ben 10 can exist!");
            }
        }

        User user = new User();
        user.setUsername(createUserDTO.getUsername());
        user.setUserType(createUserDTO.getUserType());

        // ✅ Hash the password before saving
        String hashedPassword = passwordEncoder.encode(createUserDTO.getPassword());
        user.setPassword(hashedPassword);

        return userRepository.save(user);
    }
    public boolean verifyPassword(String rawPassword, String hashedPassword) {
        return passwordEncoder.matches(rawPassword, hashedPassword);
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
}

