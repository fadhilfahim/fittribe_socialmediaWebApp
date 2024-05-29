package com.fitTribe.fitnessApp.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "posts")
public class Post {
    @Id
    private String id;
    private String content;
    private String caption;
    private User user;
    private List<Comment> comments;
    private List<User> likes;

    // Constructors, Getters, and Setters

    public Post() {
        this.comments = new ArrayList<>();
        this.likes = new ArrayList<>();
    }

    public Post(String content, String caption,User user) {
        this.content = content;
        this.caption = caption;
        this.user = user;
        this.comments = new ArrayList<>();
        this.likes = new ArrayList<>();
    }

    // Getters and Setters

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCaption() {
        return caption;
    }

    public void setCaption(String caption) {
        this.caption = caption;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Comment> getComments() {
        return comments;
    }

    public void setComments(List<Comment> comments) {
        this.comments = comments;
    }

    public List<User> getLikes() {
        return likes;
    }

    public void setLikes(List<User> likes) {
        this.likes = likes;
    }

    // Other methods

    public void addComment(Comment comment) {
        this.comments.add(comment);
    }

    public void addLike(User user) {
        this.likes.add(user);
    }
}
