export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'aluno' | 'personal';
  avatar?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscle: string;
  equipment: string;
  description: string;
  image?: string;
  videoUrl?: string;
  gifUrl?: string;
}

export interface WorkoutSet {
  reps: number;
  weight: number;
  rest: number;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: WorkoutSet[];
  notes?: string;
}

export interface Workout {
  id: string;
  name: string;
  day: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  userId: string;
  workouts: Workout[];
  startDate: string;
  endDate?: string;
}

export interface GymClass {
  id: string;
  name: string;
  instructor: string;
  day: string;
  time: string;
  duration: number;
  capacity: number;
  enrolled: number;
  description: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  phone: string;
  plan: 'basico' | 'premium' | 'vip';
  planStartDate: string;
  planEndDate: string;
  status: 'ativo' | 'inativo' | 'pendente';
  measurements?: Measurement[];
}

export interface Measurement {
  id: string;
  date: string;
  weight: number;
  bodyFat?: number;
  chest?: number;
  waist?: number;
  hips?: number;
  arms?: number;
  thighs?: number;
  notes?: string;
}

export interface ProgressEntry {
  id: string;
  studentId: string;
  date: string;
  workoutCompleted: string;
  duration: number;
  notes?: string;
  feeling: 1 | 2 | 3 | 4 | 5;
}
