package com.equipo7.ben10api.repository;

import com.equipo7.ben10api.enums.UserType;
import com.equipo7.ben10api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    boolean existsByUserType(UserType userType);
    Optional<User> findByUserType(UserType userType);
}
