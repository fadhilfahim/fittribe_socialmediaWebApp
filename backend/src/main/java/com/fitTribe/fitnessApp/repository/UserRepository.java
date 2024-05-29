package com.fitTribe.fitnessApp.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.fitTribe.fitnessApp.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String>{
    Optional<User> findByEmail(String email);
}
