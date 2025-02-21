package com.equipo7.ben10api.repository;

import com.equipo7.ben10api.model.Alien;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AlienRepository extends JpaRepository<Alien, Long> {

}

