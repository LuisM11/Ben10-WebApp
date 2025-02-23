package com.equipo7.ben10api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
public class TransformationDTO {
    private Long id;
    private Long alienId;
    private String alienName;
    private LocalDateTime initDate;
    private LocalDateTime endDate;
    private boolean active;
}
