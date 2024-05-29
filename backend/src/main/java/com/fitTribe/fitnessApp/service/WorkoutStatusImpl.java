package com.fitTribe.fitnessApp.service;


import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fitTribe.fitnessApp.model.WorkoutStatusUpdate;
import com.fitTribe.fitnessApp.repository.WorkoutStatusRepo;

@Service
public class WorkoutStatusImpl {
    @Autowired
    private WorkoutStatusRepo workoutStatusRepo;

    public WorkoutStatusUpdate createWorkoutStatus(WorkoutStatusUpdate workout){
        return workoutStatusRepo.save(workout);
    }
    // Read operation
    public List<WorkoutStatusUpdate> getAllWorkoutStatusUpdates() {
        return workoutStatusRepo.findAll();
    }

    public Optional<WorkoutStatusUpdate> getWorkoutStatusById(String id) {
        return workoutStatusRepo.findById(id);
    }

    // Update operation
    public WorkoutStatusUpdate updateWorkoutStatus(String id, WorkoutStatusUpdate updatedWorkout) {
        Optional<WorkoutStatusUpdate> existingWorkoutOptional = workoutStatusRepo.findById(id);
        if (existingWorkoutOptional.isPresent()) {
            WorkoutStatusUpdate existingWorkout = existingWorkoutOptional.get();
            existingWorkout.setUsername(updatedWorkout.getUsername());
            existingWorkout.setDescription(updatedWorkout.getDescription());
            existingWorkout.setDistanceRun(updatedWorkout.getDistanceRun());
            existingWorkout.setPushupsCompleted(updatedWorkout.getPushupsCompleted());
            existingWorkout.setWeightLifted(updatedWorkout.getWeightLifted());
            existingWorkout.setTimestamp(updatedWorkout.getTimestamp());
            return workoutStatusRepo.save(existingWorkout);
        } else {
            throw new RuntimeException("WorkoutStatusUpdate with id " + id + " not found.");
        }
    }

    // Delete operation
    public void deleteWorkoutStatus(String id) {
        workoutStatusRepo.deleteById(id);
    }
}
