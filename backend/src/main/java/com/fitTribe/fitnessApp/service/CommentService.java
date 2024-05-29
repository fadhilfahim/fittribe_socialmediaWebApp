package com.fitTribe.fitnessApp.service;

import com.fitTribe.fitnessApp.model.Comment;
import com.fitTribe.fitnessApp.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(String id) {
        return commentRepository.findById(id);
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }

    public Comment updateComment(String id, Comment comment) {
        if (commentRepository.existsById(id)) {
            comment.setId(id);
            return commentRepository.save(comment);
        }
        return null;
    }

    public void deleteComment(String id) {
        commentRepository.deleteById(id);
    }
}
