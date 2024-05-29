package com.fitTribe.fitnessApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fitTribe.fitnessApp.model.Comment;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String>{
    
}