//package com.equipo7.ben10api.dto;
//
//import lombok.AllArgsConstructor;
//import lombok.Getter;
//
//import java.time.LocalDateTime;
//
//@Getter
//@AllArgsConstructor
//public class CommentDTO {
//    private Long id;
//    private String content;
//    private Long userId;
//    private String username;
//    private Long alienId;
//    private LocalDateTime createdAt;
//}

package com.equipo7.ben10api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class CommentDTO {
    private Long id;
    private String content;
    private Long userId;
    private String username;
    private Long alienId;
    private LocalDateTime createdAt;
    private Long parentId; // Permite identificar si es una respuesta
}
