package com.fitTribe.fitnessApp.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fitTribe.fitnessApp.model.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String>{
    
}
