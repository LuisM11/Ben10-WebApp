package com.equipo7.ben10api.controller;

import com.equipo7.ben10api.enums.UserType;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UserDTO {
    private Long id;
    private String username;
    private UserType userType;



}

