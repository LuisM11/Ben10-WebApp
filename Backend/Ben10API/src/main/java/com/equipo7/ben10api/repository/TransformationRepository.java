package com.equipo7.ben10api.repository;

import com.equipo7.ben10api.model.Transformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TransformationRepository extends JpaRepository<Transformation, Long> {
    List<Transformation> findByUserId(Long userId);

    Optional<Transformation> findByUserIdAndActiveTrue(Long id);

    List<Transformation> findAllByActiveTrue();

    Optional<Transformation> findByActiveTrue();
}