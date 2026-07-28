import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Workout } from '../data/types';
import { mockWorkouts } from '../data/mockData';

interface WorkoutContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  completedWorkouts: Record<string, boolean>;
  toggleWorkoutComplete: (workoutId: string, day: string) => void;
  isWorkoutComplete: (workoutId: string, day: string) => boolean;
}

const WorkoutContext = createContext<WorkoutContextType>({} as WorkoutContextType);

export function WorkoutProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([...mockWorkouts]);
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({});

  const addWorkout = (workout: Workout) => {
    setWorkouts([...workouts, workout]);
  };

  const toggleWorkoutComplete = (workoutId: string, day: string) => {
    const key = `${workoutId}_${day}`;
    setCompletedWorkouts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const isWorkoutComplete = (workoutId: string, day: string) => {
    return !!completedWorkouts[`${workoutId}_${day}`];
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, completedWorkouts, toggleWorkoutComplete, isWorkoutComplete }}>
      {children}
    </WorkoutContext.Provider>
  );
}

export const useWorkouts = () => useContext(WorkoutContext);
