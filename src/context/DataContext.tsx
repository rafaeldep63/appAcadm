import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const STORAGE_VERSION = 2;
const STORAGE_KEYS = {
  version: '@appAcadm_version',
  workouts: '@appAcadm_workouts',
  students: '@appAcadm_students',
  completedWorkouts: '@appAcadm_completedWorkouts',
  workoutHistory: '@appAcadm_workoutHistory',
  studentMeasurements: '@appAcadm_studentMeasurements',
};

const DataContext = createContext<DataContextType>({} as DataContextType);

async function loadData<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn('Error loading', key, e);
  }
  return fallback;
}

async function saveData(key: string, data: any) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn('Error saving', key, e);
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [loaded, setLoaded] = useState(false);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [completedWorkouts, setCompletedWorkouts] = useState<Record<string, boolean>>({});
  const [workoutHistory, setWorkoutHistory] = useState<WorkoutHistory[]>([]);
  const [studentMeasurements, setStudentMeasurements] = useState<Record<string, Measurement[]>>({});

  useEffect(() => {
    (async () => {
      const savedVersion = await AsyncStorage.getItem(STORAGE_KEYS.version);
      const needsReset = savedVersion !== String(STORAGE_VERSION);

      let w, s, c, h, m;
      if (needsReset) {
        w = mockWorkouts;
        s = mockStudents;
        c = {};
        h = [];
        m = {};
        await AsyncStorage.setItem(STORAGE_KEYS.version, String(STORAGE_VERSION));
        await Promise.all([
          saveData(STORAGE_KEYS.workouts, w),
          saveData(STORAGE_KEYS.students, s),
          saveData(STORAGE_KEYS.completedWorkouts, c),
          saveData(STORAGE_KEYS.workoutHistory, h),
          saveData(STORAGE_KEYS.studentMeasurements, m),
        ]);
      } else {
        [w, s, c, h, m] = await Promise.all([
          loadData<Workout[]>(STORAGE_KEYS.workouts, mockWorkouts),
          loadData<Student[]>(STORAGE_KEYS.students, mockStudents),
          loadData<Record<string, boolean>>(STORAGE_KEYS.completedWorkouts, {}),
          loadData<WorkoutHistory[]>(STORAGE_KEYS.workoutHistory, []),
          loadData<Record<string, Measurement[]>>(STORAGE_KEYS.studentMeasurements, {}),
        ]);
      }

      setWorkouts(w);
      setStudents(s);
      setCompletedWorkouts(c);
      setWorkoutHistory(h);
      setStudentMeasurements(m);
      setLoaded(true);
    })();
  }, []);

  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.workouts, workouts); }, [workouts, loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.students, students); }, [students, loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.completedWorkouts, completedWorkouts); }, [completedWorkouts, loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.workoutHistory, workoutHistory); }, [workoutHistory, loaded]);
  useEffect(() => { if (loaded) saveData(STORAGE_KEYS.studentMeasurements, studentMeasurements); }, [studentMeasurements, loaded]);

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
      {loaded ? children : null}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);