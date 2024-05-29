package com.fitTribe.fitnessApp.service;

import com.fitTribe.fitnessApp.model.User;
import com.fitTribe.fitnessApp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;



@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }
        return userRepository.findById(id);
    }

    public User signUp(User user) {
        // Check if user with the provided email already exists
        Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser.isPresent()) {
            throw new IllegalArgumentException("User with this email already exists");
        }

        // Set default profile picture and bio
        user.setProfilePictureUrl("https://i.stack.imgur.com/34AD2.jpg");
        user.setBio("Tell us something interesting about you");

        // Save the new user
        return userRepository.save(user);
    }

    public User updateUser(String id, User user) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }
        if (userRepository.existsById(id)) {
            user.setId(id);
            return userRepository.save(user);
        } else {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
    }

    public void deleteUser(String id) {
        if (id == null || id.isEmpty()) {
            throw new IllegalArgumentException("User ID cannot be null or empty");
        }
        userRepository.deleteById(id);
    }

    public Optional<User> authenticateUser(String email, String password) {
        // Find user by email
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            // Check if password matches
            if (user.getPassword().equals(password)) {
                return Optional.of(user);
            }
        }
        return Optional.empty();
    }

}
