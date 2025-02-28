//package com.equipo7.ben10api.controller;
//
//import com.equipo7.ben10api.dto.CommentDTO;
//import com.equipo7.ben10api.dto.CreateCommentDTO;
//import com.equipo7.ben10api.dto.UpdateCommentDTO;
//import com.equipo7.ben10api.service.CommentService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/comments")
//public class CommentController {
//    private final CommentService commentService;
//
//    public CommentController(CommentService commentService) {
//        this.commentService = commentService;
//    }
//
//    @PostMapping
//    public ResponseEntity<CommentDTO> createComment(@RequestBody CreateCommentDTO request) {
//        return ResponseEntity.ok(commentService.createComment(request));
//    }
//
//    @GetMapping("/alien/{alienId}")
//    public ResponseEntity<List<CommentDTO>> getCommentsByAlien(@PathVariable Long alienId) {
//        return ResponseEntity.ok(commentService.getCommentsByAlien(alienId));
//    }
//
//    @PutMapping("/{commentId}")
//    public ResponseEntity<CommentDTO> updateComment(@RequestBody UpdateCommentDTO request, @PathVariable Long commentId) {
//        return ResponseEntity.ok(commentService.updateComment(request, commentId));
//    }
//
//    @DeleteMapping("/{commentId}")
//    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
//        commentService.deleteComment(commentId);
//        return ResponseEntity.noContent().build();
//    }
//}
package com.equipo7.ben10api.controller;

import com.equipo7.ben10api.dto.CommentDTO;
import com.equipo7.ben10api.dto.CreateCommentDTO;
import com.equipo7.ben10api.dto.UpdateCommentDTO;
import com.equipo7.ben10api.service.CommentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping
    public ResponseEntity<CommentDTO> createComment(@RequestBody CreateCommentDTO request) {
        return ResponseEntity.ok(commentService.createComment(request));
    }

    @GetMapping("/alien/{alienId}")
    public ResponseEntity<List<CommentDTO>> getCommentsByAlien(@PathVariable Long alienId) {
        return ResponseEntity.ok(commentService.getCommentsByAlien(alienId));
    }

    @GetMapping("/replies/{parentId}")
    public ResponseEntity<List<CommentDTO>> getReplies(@PathVariable Long parentId) {
        return ResponseEntity.ok(commentService.getReplies(parentId));
    }

    @PutMapping("/{commentId}")
    public ResponseEntity<CommentDTO> updateComment(@RequestBody UpdateCommentDTO request, @PathVariable Long commentId) {
        return ResponseEntity.ok(commentService.updateComment(request, commentId));
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
