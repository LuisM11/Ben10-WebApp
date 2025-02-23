package com.equipo7.ben10api.controller;

import com.equipo7.ben10api.dto.AlienDTO;
import com.equipo7.ben10api.dto.CreateUserDTO;
import com.equipo7.ben10api.dto.UserDTO;
import com.equipo7.ben10api.model.User;
import com.equipo7.ben10api.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<UserDTO> getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return userService.getUserById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<UserDTO> createUser(@RequestBody CreateUserDTO createUserDTO) {
        UserDTO createdUser = userService.createUser(createUserDTO);
        return ResponseEntity.ok(createdUser);
    }

    //BEN10-Related Endpoints
    @GetMapping("/ben10/favorites")
    public ResponseEntity<List<AlienDTO>> getBen10Favorites() {
        List<AlienDTO> favorites = userService.getBen10Favorites();
        return ResponseEntity.ok(favorites);
    }

    @DeleteMapping("/ben10/favorites/{alienId}")
    public ResponseEntity<List<AlienDTO>> removeAlienFromBen10Favorites(@PathVariable Long alienId) {
        List<AlienDTO> updatedFavorites = userService.removeAlienFromBen10Favorites(alienId);
        return ResponseEntity.ok(updatedFavorites);
    }

    @PostMapping("/ben10/favorites/{alienId}")
    public ResponseEntity<List<AlienDTO>> addAlienToBen10Favorites(@PathVariable Long alienId) {
        List<AlienDTO> updatedFavorites = userService.addAlienToBen10Favorites(alienId);
        return ResponseEntity.ok(updatedFavorites);
    }
}

