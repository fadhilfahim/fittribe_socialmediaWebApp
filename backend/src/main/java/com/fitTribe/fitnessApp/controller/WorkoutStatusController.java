package com.fitTribe.fitnessApp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fitTribe.fitnessApp.model.WorkoutStatusUpdate;
import com.fitTribe.fitnessApp.service.WorkoutStatusImpl;

@RestController
@RequestMapping("/api/WorkoutStatus")
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutStatusController {
    
    @Autowired
    private WorkoutStatusImpl workoutStatusImpl;


    @PostMapping
    public ResponseEntity<WorkoutStatusUpdate> createWorkoutStatus(@RequestBody WorkoutStatusUpdate workout) {
        WorkoutStatusUpdate newWorkout = workoutStatusImpl.createWorkoutStatus(workout);
        return new ResponseEntity<>(newWorkout, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<WorkoutStatusUpdate>> getAllWorkoutStatusUpdates() {
        List<WorkoutStatusUpdate> workoutStatusUpdates = workoutStatusImpl.getAllWorkoutStatusUpdates();
        return new ResponseEntity<>(workoutStatusUpdates, HttpStatus.OK);
    }

    // Get workout status update by ID
    @GetMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdate> getWorkoutStatusById(@PathVariable String id) {
        Optional<WorkoutStatusUpdate> workoutStatusOptional = workoutStatusImpl.getWorkoutStatusById(id);
        return workoutStatusOptional.map(workoutStatus -> new ResponseEntity<>(workoutStatus, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    // Update workout status update
    @PutMapping("/{id}")
    public ResponseEntity<WorkoutStatusUpdate> updateWorkoutStatus(@PathVariable String id, @RequestBody WorkoutStatusUpdate updatedWorkout) {
        WorkoutStatusUpdate updatedStatus = workoutStatusImpl.updateWorkoutStatus(id, updatedWorkout);
        return new ResponseEntity<>(updatedStatus, HttpStatus.OK);
    }

    // Delete workout status update by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWorkoutStatus(@PathVariable String id) {
        workoutStatusImpl.deleteWorkoutStatus(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
