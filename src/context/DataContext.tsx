import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Workout, Student, Measurement } from '../data/types';
import { mockWorkouts, mockStudents } from '../data/mockData';

interface DataContextType {
  workouts: Workout[];
  addWorkout: (workout: Workout) => void;
  deleteWorkout: (id: string) => void;
  students: Student[];
  addStudent: (student: Student) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  completedWorkouts: Record<string, boolean>;
  toggleWorkoutComplete: (workoutId: string, day: string) => void;
  isWorkoutComplete: (workoutId: string, day: string) => boolean;
  workoutHistory: WorkoutHistory[];
  addWorkoutHistory: (entry: WorkoutHistory) => void;
  studentMeasurements: Record<string, Measurement[]>;
  addMeasurement: (studentId: string, measurement: Measurement) => void;
}

export interface WorkoutHistory {
  id: string;
  workoutId: string;
  workoutName: string;
  studentId: string;
  date: string;
  duration: number;
  completed: boolean;
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export function DataProvider({ children }: { children: ReactNode }) {
  const [workouts, setWorkouts] = useState<Workout[]>([...mockWorkouts]);
  const [students, setStudents] = useState<Student[]>([...mockStudents]);
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({});
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [studentMeasurements, setStudentMeasurements] = useState<Record<string, Measurement[]>>({});

  const addWorkout = useCallback((workout: Workout) => {
    setWorkouts((prev) => [...prev, workout]);
  }, []);

  const deleteWorkout = useCallback((id: string) => {
    setWorkouts((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const addStudent = useCallback((student: Student) => {
    setStudents((prev) => [...prev, student]);
  }, []);

  const updateStudent = useCallback((id: string, data: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  }, []);

  const toggleWorkoutComplete = useCallback((workoutId: string, day: string) => {
    setCompletedWorkouts((prev) => {
      const key = `${workoutId}_${day}`;
      return { ...prev, [key]: !prev[key] };
    });
  }, []);

  const isWorkoutComplete = useCallback((workoutId: string, day: string) => {
    return !!completedWorkouts[`${workoutId}_${day}`];
  }, [completedWorkouts]);

  const addWorkoutHistory = useCallback((entry: WorkoutHistory) => {
    setWorkoutHistory((prev) => [entry, ...prev]);
  }, []);

  const addMeasurement = useCallback((studentId: string, measurement: Measurement) => {
    setStudentMeasurements((prev) => ({
      ...prev,
      [studentId]: [...(prev[studentId] || []), measurement],
    }));
  }, []);

  return (
    <DataContext.Provider value={{
      workouts, addWorkout, deleteWorkout,
      students, addStudent, updateStudent,
      completedWorkouts, toggleWorkoutComplete, isWorkoutComplete,
      workoutHistory, addWorkoutHistory,
      studentMeasurements, addMeasurement,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
