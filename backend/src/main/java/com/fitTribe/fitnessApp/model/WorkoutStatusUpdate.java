package com.fitTribe.fitnessApp.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "workout_status_updates")
public class WorkoutStatusUpdate {
    @Id
    private String id;
    private String username;
    private String description;
    private double distanceRun; // in kilometers
    private int pushupsCompleted;
    private double weightLifted; // in kilograms
    private LocalDateTime timestamp;

    // Constructors
    public WorkoutStatusUpdate(String username, String description, double distanceRun, int pushupsCompleted, double weightLifted) {
        this.username = username;
        this.description = description;
        this.distanceRun = distanceRun;
        this.pushupsCompleted = pushupsCompleted;
        this.weightLifted = weightLifted;
        this.timestamp = LocalDateTime.now(); // Automatically set the timestamp to the current date and time
    }

    // Getters and Setters
    
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getDistanceRun() {
        return distanceRun;
    }

    public void setDistanceRun(double distanceRun) {
        this.distanceRun = distanceRun;
    }

    public int getPushupsCompleted() {
        return pushupsCompleted;
    }

    public void setPushupsCompleted(int pushupsCompleted) {
        this.pushupsCompleted = pushupsCompleted;
    }

    public double getWeightLifted() {
        return weightLifted;
    }

    public void setWeightLifted(double weightLifted) {
        this.weightLifted = weightLifted;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    // toString method to print the object details
    @Override
    public String toString() {
        return "WorkoutStatusUpdate{" +
                "username='" + username + '\'' +
                ", description='" + description + '\'' +
                ", distanceRun=" + distanceRun +
                " km, pushupsCompleted=" + pushupsCompleted +
                ", weightLifted=" + weightLifted +
                " kg, timestamp=" + timestamp +
                '}';
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
