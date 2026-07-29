import { Exercise, Workout, Student, GymClass } from './types';

export const mockExercises: Exercise[] = [
  { id: 'ex1', name: 'Supino Reto', muscle: 'Peitoral', equipment: 'Barra', description: 'Deitado no banco reto, barra na altura do peito', videoUrl: 'https://www.youtube.com/watch?v=rT7DgCr-3bg' },
  { id: 'ex2', name: 'Supino Inclinado', muscle: 'Peitoral Superior', equipment: 'Halteres', description: 'Banco a 45°, halteres subindo na altura do peito' },
  { id: 'ex3', name: 'Desenvolvimento Militar', muscle: 'Ombro', equipment: 'Barra', description: 'Em pe, barra da clavicula ate acima da cabeca' },
  { id: 'ex4', name: 'Elevacao Lateral', muscle: 'Ombro Lateral', equipment: 'Halteres', description: 'Em pe, halteres subindo lateralmente ate altura dos ombros' },
  { id: 'ex5', name: 'Triceps Corda', muscle: 'Triceps', equipment: 'Cabo', description: 'Na polia, puxar corda para baixo estendendo os bracos' },
  { id: 'ex6', name: 'Triceps Frances', muscle: 'Triceps', equipment: 'Halteres', description: 'Deitado, halter atras da cabeca estendendo para cima' },
  { id: 'ex7', name: 'Remada Curvada', muscle: 'Costas', equipment: 'Barra', description: 'Tronco inclinado, barra puxada ate a barriga' },
  { id: 'ex8', name: 'Puxada Alta', muscle: 'Costas', equipment: 'Polia', description: 'Sentado, puxar barra ate o peito' },
  { id: 'ex9', name: 'Serrote', muscle: 'Costas', equipment: 'Halteres', description: 'Apoiado no banco, halter puxado ate o quadril' },
  { id: 'ex10', name: 'Rosca Direta', muscle: 'Biceps', equipment: 'Barra W', description: 'Em pe, barra subindo ate os ombros' },
  { id: 'ex11', name: 'Rosca Martelo', muscle: 'Biceps', equipment: 'Halteres', description: 'Em pe, halteres subindo com palmas viradas para dentro' },
  { id: 'ex12', name: 'Rosca Scott', muscle: 'Biceps', equipment: 'Barra W', description: 'Sentado no banco Scott, barra subindo contra apoio' },
  { id: 'ex13', name: 'Agachamento Livre', muscle: 'Quadriceps', equipment: 'Barra', description: 'Barra nas costas, descer ate 90°' },
  { id: 'ex14', name: 'Leg Press', muscle: 'Quadriceps', equipment: 'Maquina', description: 'Sentado, empurrar plataforma com os pes' },
  { id: 'ex15', name: 'Cadeira Extensora', muscle: 'Quadriceps', equipment: 'Maquina', description: 'Sentado, estender as pernas contra resistencia' },
  { id: 'ex16', name: 'Mesa Flexora', muscle: 'Posterior', equipment: 'Maquina', description: 'Deitado, flexionar as pernas contra resistencia' },
  { id: 'ex17', name: 'Stiff', muscle: 'Posterior', equipment: 'Barra', description: 'Tronco inclinado, barra descendo pela perna' },
  { id: 'ex18', name: 'Elevacao Panturrilha', muscle: 'Panturrilha', equipment: 'Maquina', description: 'Em pe, subir na ponta dos pes contra resistencia' },
  { id: 'ex19', name: 'Crucifixo Reto', muscle: 'Peitoral', equipment: 'Halteres', description: 'Deitado, halteres abertos lateralmente' },
  { id: 'ex20', name: 'Crucifixo Inclinado', muscle: 'Peitoral Superior', equipment: 'Halteres', description: 'Banco inclinado, halteres abertos lateralmente' },
  { id: 'ex21', name: 'Remada Alta', muscle: 'Ombro/Trapezio', equipment: 'Barra', description: 'Barra puxada ate o queixo' },
  { id: 'ex22', name: 'Elevacao Frontal', muscle: 'Ombro', equipment: 'Halteres', description: 'Halteres subindo a frente ate altura dos ombros' },
  { id: 'ex23', name: 'Encolhimento', muscle: 'Trapezio', equipment: 'Halteres', description: 'Ombros subindo em direcao as orelhas' },
  { id: 'ex24', name: 'Cadeira Flexora', muscle: 'Posterior', equipment: 'Maquina', description: 'Sentado, flexionar pernas contra resistencia' },
  { id: 'ex25', name: 'Abdutor', muscle: 'Gluteo', equipment: 'Maquina', description: 'Sentado, abrir as pernas contra resistencia' },
  { id: 'ex26', name: 'Panturrilha Sentado', muscle: 'Panturrilha', equipment: 'Maquina', description: 'Sentado, subir na ponta dos pes' },
  { id: 'ex27', name: 'Rosca Inversa', muscle: 'Antebraco', equipment: 'Barra W', description: 'Rosca com palmas viradas para baixo' },
  { id: 'ex28', name: 'Abanador', muscle: 'Ombro Lateral', equipment: 'Maquina', description: 'Na maquina de abducao de ombros' },
  { id: 'ex29', name: 'Supino Fechado', muscle: 'Triceps', equipment: 'Barra', description: 'Supino com pegada fechada' },
  { id: 'ex30', name: 'Crossover', muscle: 'Peitoral', equipment: 'Cabo', description: 'Em pe na polia, cruzar bracos a frente' },
];

export const mockWorkouts: Workout[] = [
  {
    id: 'w1', name: 'Push A - Forca', day: 'Segunda', assignedTo: '2',
    exercises: [
      { exercise: mockExercises[0], sets: [{ reps: 8, weight: 60, rest: 120 }, { reps: 8, weight: 60, rest: 120 }, { reps: 6, weight: 65, rest: 120 }, { reps: 6, weight: 65, rest: 120 }] },
      { exercise: mockExercises[2], sets: [{ reps: 8, weight: 30, rest: 90 }, { reps: 8, weight: 30, rest: 90 }, { reps: 6, weight: 35, rest: 90 }] },
      { exercise: mockExercises[3], sets: [{ reps: 12, weight: 10, rest: 60 }, { reps: 12, weight: 10, rest: 60 }, { reps: 12, weight: 10, rest: 60 }] },
      { exercise: mockExercises[4], sets: [{ reps: 12, weight: 20, rest: 60 }, { reps: 12, weight: 20, rest: 60 }, { reps: 10, weight: 25, rest: 60 }] },
      { exercise: mockExercises[18], sets: [{ reps: 12, weight: 16, rest: 60 }, { reps: 12, weight: 16, rest: 60 }, { reps: 12, weight: 16, rest: 60 }] },
    ],
  },
  {
    id: 'w2', name: 'Pull A - Forca', day: 'Terca', assignedTo: '2',
    exercises: [
      { exercise: mockExercises[6], sets: [{ reps: 8, weight: 50, rest: 120 }, { reps: 8, weight: 50, rest: 120 }, { reps: 6, weight: 55, rest: 120 }, { reps: 6, weight: 55, rest: 120 }] },
      { exercise: mockExercises[7], sets: [{ reps: 10, weight: 50, rest: 90 }, { reps: 10, weight: 50, rest: 90 }, { reps: 8, weight: 55, rest: 90 }] },
      { exercise: mockExercises[9], sets: [{ reps: 10, weight: 20, rest: 60 }, { reps: 10, weight: 20, rest: 60 }, { reps: 10, weight: 20, rest: 60 }] },
      { exercise: mockExercises[10], sets: [{ reps: 12, weight: 10, rest: 60 }, { reps: 12, weight: 10, rest: 60 }, { reps: 12, weight: 10, rest: 60 }] },
      { exercise: mockExercises[26], sets: [{ reps: 15, weight: 8, rest: 60 }, { reps: 15, weight: 8, rest: 60 }, { reps: 15, weight: 8, rest: 60 }] },
    ],
  },
  {
    id: 'w3', name: 'Legs A - Forca', day: 'Quarta', assignedTo: '2',
    exercises: [
      { exercise: mockExercises[12], sets: [{ reps: 8, weight: 70, rest: 120 }, { reps: 8, weight: 70, rest: 120 }, { reps: 6, weight: 80, rest: 120 }, { reps: 6, weight: 80, rest: 120 }] },
      { exercise: mockExercises[13], sets: [{ reps: 10, weight: 120, rest: 90 }, { reps: 10, weight: 120, rest: 90 }, { reps: 10, weight: 120, rest: 90 }] },
      { exercise: mockExercises[16], sets: [{ reps: 10, weight: 30, rest: 90 }, { reps: 10, weight: 30, rest: 90 }, { reps: 10, weight: 30, rest: 90 }] },
      { exercise: mockExercises[14], sets: [{ reps: 12, weight: 40, rest: 60 }, { reps: 12, weight: 40, rest: 60 }, { reps: 12, weight: 40, rest: 60 }] },
      { exercise: mockExercises[17], sets: [{ reps: 15, weight: 50, rest: 60 }, { reps: 15, weight: 50, rest: 60 }, { reps: 15, weight: 50, rest: 60 }, { reps: 15, weight: 50, rest: 60 }] },
    ],
  },
  {
    id: 'w4', name: 'Push B - Hipertrofia', day: 'Quinta', assignedTo: '2',
    exercises: [
      { exercise: mockExercises[1], sets: [{ reps: 10, weight: 24, rest: 90 }, { reps: 10, weight: 24, rest: 90 }, { reps: 10, weight: 24, rest: 90 }, { reps: 8, weight: 28, rest: 90 }] },
      { exercise: mockExercises[19], sets: [{ reps: 12, weight: 14, rest: 60 }, { reps: 12, weight: 14, rest: 60 }, { reps: 12, weight: 14, rest: 60 }] },
      { exercise: mockExercises[4], sets: [{ reps: 12, weight: 22, rest: 60 }, { reps: 12, weight: 22, rest: 60 }, { reps: 10, weight: 25, rest: 60 }] },
      { exercise: mockExercises[5], sets: [{ reps: 12, weight: 12, rest: 60 }, { reps: 12, weight: 12, rest: 60 }, { reps: 12, weight: 12, rest: 60 }] },
      { exercise: mockExercises[28], sets: [{ reps: 15, weight: 5, rest: 45 }, { reps: 15, weight: 5, rest: 45 }, { reps: 15, weight: 5, rest: 45 }] },
    ],
  },
  {
    id: 'w5', name: 'Pull B - Hipertrofia', day: 'Sexta', assignedTo: '2',
    exercises: [
      { exercise: mockExercises[8], sets: [{ reps: 10, weight: 22, rest: 90 }, { reps: 10, weight: 22, rest: 90 }, { reps: 10, weight: 22, rest: 90 }, { reps: 8, weight: 26, rest: 90 }] },
      { exercise: mockExercises[7], sets: [{ reps: 12, weight: 45, rest: 60 }, { reps: 12, weight: 45, rest: 60 }, { reps: 12, weight: 45, rest: 60 }] },
      { exercise: mockExercises[11], sets: [{ reps: 10, weight: 14, rest: 60 }, { reps: 10, weight: 14, rest: 60 }, { reps: 10, weight: 14, rest: 60 }] },
      { exercise: mockExercises[9], sets: [{ reps: 12, weight: 18, rest: 60 }, { reps: 12, weight: 18, rest: 60 }, { reps: 12, weight: 18, rest: 60 }] },
      { exercise: mockExercises[26], sets: [{ reps: 15, weight: 10, rest: 45 }, { reps: 15, weight: 10, rest: 45 }, { reps: 15, weight: 10, rest: 45 }] },
    ],
  },
  {
    id: 'w6', name: 'Legs B - Hipertrofia', day: 'Sabado', assignedTo: '2',
    exercises: [
      { exercise: mockExercises[12], sets: [{ reps: 10, weight: 60, rest: 90 }, { reps: 10, weight: 60, rest: 90 }, { reps: 10, weight: 60, rest: 90 }, { reps: 8, weight: 70, rest: 90 }] },
      { exercise: mockExercises[17], sets: [{ reps: 10, weight: 40, rest: 90 }, { reps: 10, weight: 40, rest: 90 }, { reps: 10, weight: 40, rest: 90 }] },
      { exercise: mockExercises[15], sets: [{ reps: 12, weight: 35, rest: 60 }, { reps: 12, weight: 35, rest: 60 }, { reps: 12, weight: 35, rest: 60 }] },
      { exercise: mockExercises[14], sets: [{ reps: 15, weight: 35, rest: 60 }, { reps: 15, weight: 35, rest: 60 }, { reps: 15, weight: 35, rest: 60 }] },
      { exercise: mockExercises[25], sets: [{ reps: 15, weight: 40, rest: 45 }, { reps: 15, weight: 40, rest: 45 }, { reps: 15, weight: 40, rest: 45 }] },
      { exercise: mockExercises[26], sets: [{ reps: 20, weight: 5, rest: 45 }, { reps: 20, weight: 5, rest: 45 }, { reps: 20, weight: 5, rest: 45 }] },
    ],
  },
];

export const mockStudents: Student[] = [
  { id: '2', name: 'Joao Silva', email: 'joao@email.com', phone: '(31) 99999-0001', plan: 'vip', planStartDate: '01/01/2026', planEndDate: '31/12/2026', status: 'ativo' },
  { id: 's3', name: 'Maria Santos', email: 'maria@email.com', phone: '(31) 99999-0002', plan: 'premium', planStartDate: '01/03/2026', planEndDate: '01/09/2026', status: 'ativo' },
  { id: 's4', name: 'Carlos Oliveira', email: 'carlos@email.com', phone: '(31) 99999-0003', plan: 'basico', planStartDate: '15/01/2026', planEndDate: '15/07/2026', status: 'ativo' },
  { id: 's5', name: 'Ana Costa', email: 'ana@email.com', phone: '(31) 99999-0004', plan: 'vip', planStartDate: '01/02/2026', planEndDate: '01/02/2027', status: 'ativo' },
  { id: 's6', name: 'Pedro Almeida', email: 'pedro@email.com', phone: '(31) 99999-0005', plan: 'premium', planStartDate: '01/04/2026', planEndDate: '01/10/2026', status: 'inativo' },
];

export const mockClasses: GymClass[] = [];