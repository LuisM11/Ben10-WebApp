//package com.equipo7.ben10api.repository;
//
//
//
//import com.equipo7.ben10api.model.Comment;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//
//@Repository
//public interface CommentRepository extends JpaRepository<Comment, Long> {
//    List<Comment> findByAlienId(Long alienId);
//    List<Comment> findByUserId(Long userId);
//}
package com.equipo7.ben10api.repository;

import com.equipo7.ben10api.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByAlienIdAndParentIsNull(Long alienId); // Solo comentarios raíz
    List<Comment> findByUserId(Long userId);
    List<Comment> findByParentId(Long parentId); // Obtener respuestas de un comentario
}
