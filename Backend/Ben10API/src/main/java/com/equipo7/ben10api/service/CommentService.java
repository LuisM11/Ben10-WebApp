package com.equipo7.ben10api.service;

import com.equipo7.ben10api.dto.CommentDTO;
import com.equipo7.ben10api.dto.CreateCommentDTO;
import com.equipo7.ben10api.dto.UpdateCommentDTO;
import com.equipo7.ben10api.exception.AlienNotFoundException;
import com.equipo7.ben10api.exception.CommentNotFoundException;
import com.equipo7.ben10api.exception.UnauthorizedActionException;
import com.equipo7.ben10api.exception.UserNotFoundException;
import com.equipo7.ben10api.model.Alien;
import com.equipo7.ben10api.model.Comment;
import com.equipo7.ben10api.model.User;
import com.equipo7.ben10api.repository.AlienRepository;
import com.equipo7.ben10api.repository.CommentRepository;
import com.equipo7.ben10api.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;
    private final AlienRepository alienRepository;

    public CommentService(CommentRepository commentRepository, UserRepository userRepository, AlienRepository alienRepository) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.alienRepository = alienRepository;
    }

    public CommentDTO createComment(CreateCommentDTO request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new UserNotFoundException("User not found!"));
        Alien alien = alienRepository.findById(request.getAlienId())
                .orElseThrow(() -> new AlienNotFoundException("Alien not found!"));

        Comment comment = new Comment(request.getContent(), user, alien);
        commentRepository.save(comment);

        return new CommentDTO(comment.getId(), comment.getContent(), user.getId(), user.getUsername(), alien.getId(), comment.getCreatedAt());
    }

    public List<CommentDTO> getCommentsByAlien(Long alienId) {
        alienRepository.findById(alienId)
                .orElseThrow(() -> new AlienNotFoundException("Alien not found!"));

        return commentRepository.findByAlienId(alienId).stream()
                .map(comment -> new CommentDTO(comment.getId(), comment.getContent(),
                        comment.getUser().getId(), comment.getUser().getUsername(),
                        comment.getAlien().getId(), comment.getCreatedAt()))
                .collect(Collectors.toList());
    }

    public CommentDTO updateComment(UpdateCommentDTO request, Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found!"));

//        if (!comment.getUser().getId().equals(userId)) {
//            throw new UnauthorizedActionException("You can only edit your own comments.");
//        }

        comment.setContent(request.getContent());
        commentRepository.save(comment);

        return new CommentDTO(comment.getId(), comment.getContent(), comment.getUser().getId(), comment.getUser().getUsername(), comment.getAlien().getId(), comment.getCreatedAt());
    }

    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new CommentNotFoundException("Comment not found!"));

//        if (!comment.getUser().getId().equals(userId)) {
//            throw new UnauthorizedActionException("You can only delete your own comments.");
//        }

        commentRepository.delete(comment);
    }
}
