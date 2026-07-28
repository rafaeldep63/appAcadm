import { Exercise, GymClass, Student, Workout } from './types';

export const mockExercises: Exercise[] = [
  { id: '1', name: 'Supino Reto', muscle: 'Peito', equipment: 'Barra', description: 'Deitado no banco, empurre a barra para cima ate estender os bracos.', videoUrl: 'https://www.youtube.com/watch?v=VmB1G1K7v94' },
  { id: '2', name: 'Agachamento Livre', muscle: 'Quadriceps', equipment: 'Barra', description: 'Com a barra nos ombros, agache flexionando os joelhos ate 90°.', videoUrl: 'https://www.youtube.com/watch?v=ultWZbUMPL8' },
  { id: '3', name: 'Levantamento Terra', muscle: 'Costas/Posterior', equipment: 'Barra', description: 'Pise sobre a barra, flexione os quadris e levante mantendo as costas retas.', videoUrl: 'https://www.youtube.com/watch?v=op9kVnSo6Wc' },
  { id: '4', name: 'Desenvolvimento', muscle: 'Ombros', equipment: 'Halteres', description: 'Sentado ou em pe, empurre os halteres acima da cabeca.', videoUrl: 'https://www.youtube.com/watch?v=qEwKCR5JCog' },
  { id: '5', name: 'Rosca Direta', muscle: 'Biceps', equipment: 'Barra', description: 'Em pe, flexione os cotovelos levantando a barra em direcao aos ombros.', videoUrl: 'https://www.youtube.com/watch?v=kwG2ipFRgFo' },
  { id: '6', name: 'Triceps Pulley', muscle: 'Triceps', equipment: 'Polia', description: 'Empurre a barra para baixo estendendo os cotovelos.', videoUrl: 'https://www.youtube.com/watch?v=2-LAMcpzODU' },
  { id: '7', name: 'Puxada Frontal', muscle: 'Costas', equipment: 'Polia', description: 'Puxe a barra para baixo em direcao ao peito.', videoUrl: 'https://www.youtube.com/watch?v=CAwf7n6Luuc' },
  { id: '8', name: 'Leg Press', muscle: 'Quadriceps', equipment: 'Maquina', description: 'Empurre a plataforma com os pes estendendo os joelhos.', videoUrl: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ' },
  { id: '9', name: 'Elevacao Lateral', muscle: 'Ombros', equipment: 'Halteres', description: 'Em pe, eleve os halteres lateralmente ate a altura dos ombros.', videoUrl: 'https://www.youtube.com/watch?v=3VcKaXpzqRo' },
  { id: '10', name: 'Abdominal Crunch', muscle: 'Abdomen', equipment: 'Solo', description: 'Deitado, contraia o abdomen elevando os ombros do solo.', videoUrl: 'https://www.youtube.com/watch?v=Xyd_fa5zoEU' },
];

export const mockWorkouts: Workout[] = [
  {
    id: '1', name: 'Treino A - Peito e Tríceps', day: 'Segunda',
    exercises: [
      { exercise: mockExercises[0], sets: [{ reps: 12, weight: 60, rest: 90 }, { reps: 10, weight: 70, rest: 90 }, { reps: 8, weight: 80, rest: 120 }] },
      { exercise: mockExercises[5], sets: [{ reps: 15, weight: 20, rest: 60 }, { reps: 12, weight: 25, rest: 60 }] },
    ],
  },
  {
    id: '2', name: 'Treino B - Pernas', day: 'Terça',
    exercises: [
      { exercise: mockExercises[1], sets: [{ reps: 12, weight: 80, rest: 120 }, { reps: 10, weight: 100, rest: 120 }] },
      { exercise: mockExercises[7], sets: [{ reps: 15, weight: 120, rest: 90 }, { reps: 12, weight: 140, rest: 90 }] },
    ],
  },
  {
    id: '3', name: 'Treino C - Costas e Bíceps', day: 'Quarta',
    exercises: [
      { exercise: mockExercises[6], sets: [{ reps: 12, weight: 50, rest: 90 }, { reps: 10, weight: 60, rest: 90 }] },
      { exercise: mockExercises[4], sets: [{ reps: 12, weight: 20, rest: 60 }, { reps: 10, weight: 25, rest: 60 }] },
    ],
  },
];

export const mockClasses: GymClass[] = [
  { id: '1', name: 'Spinning', instructor: 'Carlos Silva', day: 'Segunda', time: '07:00', duration: 45, capacity: 30, enrolled: 22, description: 'Aula de bike indoor com musicas motivacionais.' },
  { id: '2', name: 'Musculação Guiada', instructor: 'Ana Santos', day: 'Terça', time: '09:00', duration: 60, capacity: 15, enrolled: 12, description: 'Treino de musculação supervisionado por personal.' },
  { id: '3', name: 'Zumba', instructor: 'Maria Oliveira', day: 'Quarta', time: '18:00', duration: 50, capacity: 40, enrolled: 35, description: 'Dança fitness com ritmos latinos.' },
  { id: '4', name: 'CrossFit', instructor: 'Pedro Lima', day: 'Quinta', time: '06:30', duration: 60, capacity: 20, enrolled: 18, description: 'Treino funcional de alta intensidade.' },
  { id: '5', name: 'Yoga', instructor: 'Julia Ferreira', day: 'Sexta', time: '19:00', duration: 60, capacity: 25, enrolled: 20, description: 'Pratica de yoga para flexibilidade e relaxamento.' },
  { id: '6', name: 'Pilates', instructor: 'Julia Ferreira', day: 'Sabado', time: '08:00', duration: 50, capacity: 20, enrolled: 15, description: 'Exercicios de Pilates para fortalecimento do core.' },
];

export const mockStudents: Student[] = [
  { id: '1', name: 'João Silva', email: 'joao@email.com', phone: '(11) 99999-1111', plan: 'premium', planStartDate: '2024-01-01', planEndDate: '2025-01-01', status: 'ativo' },
  { id: '2', name: 'Maria Santos', email: 'maria@email.com', phone: '(11) 99999-2222', plan: 'basico', planStartDate: '2024-03-15', planEndDate: '2025-03-15', status: 'ativo' },
  { id: '3', name: 'Pedro Costa', email: 'pedro@email.com', phone: '(11) 99999-3333', plan: 'vip', planStartDate: '2024-06-01', planEndDate: '2025-06-01', status: 'ativo' },
  { id: '4', name: 'Ana Oliveira', email: 'ana@email.com', phone: '(11) 99999-4444', plan: 'premium', planStartDate: '2024-02-10', planEndDate: '2024-08-10', status: 'inativo' },
  { id: '5', name: 'Lucas Ferreira', email: 'lucas@email.com', phone: '(11) 99999-5555', plan: 'basico', planStartDate: '2024-09-01', planEndDate: '2025-09-01', status: 'pendente' },
];
