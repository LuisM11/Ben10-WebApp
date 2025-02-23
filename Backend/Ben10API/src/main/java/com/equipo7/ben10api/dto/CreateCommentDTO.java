package com.equipo7.ben10api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CreateCommentDTO {
    private Long userId;
    private Long alienId;
    private String content;
}
