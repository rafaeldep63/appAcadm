import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Workout } from '../data/types';
import { Card, Badge } from '../components/UI';

interface Props {
  workout: Workout;
  onFinish: () => void;
}

export default function WorkoutExecutionScreen({ workout, onFinish }: Props) {
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [completedSets, setCompletedSets] = useState<boolean[][]>(
    workout.exercises.map((we) => we.sets.map(() => false))
  );
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const { addWorkoutHistory } = useData();
  const { currentUser: user } = useAuth();
  const startTime = useRef(Date.now());

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning]);

  const exercise = workout.exercises[currentExercise];
  const set = exercise?.sets[currentSet];
  const totalSets = workout.exercises.reduce((acc, we) => acc + we.sets.length, 0);
  const completedCount = completedSets.flat().filter(Boolean).length;
  const progress = (completedCount / totalSets) * 100;
  const canSkip = exercise && (currentSet < exercise.sets.length - 1 || currentExercise < workout.exercises.length - 1);

  const handleCompleteSet = () => {
    setIsRunning(false);
    const newCompleted = [...completedSets];
    newCompleted[currentExercise][currentSet] = true;
    setCompletedSets(newCompleted);

    if (currentSet < exercise.sets.length - 1) {
      setCurrentSet(currentSet + 1);
      setTimeout(() => setIsRunning(true), 100);
    } else if (currentExercise < workout.exercises.length - 1) {
      Alert.alert(
        'Proximo Exercicio',
        `Mude para: ${workout.exercises[currentExercise + 1].exercise.name}`,
        [{ text: 'OK', onPress: () => { setCurrentExercise(currentExercise + 1); setCurrentSet(0); setIsRunning(true); } }]
      );
    } else {
      const duration = Math.floor((Date.now() - startTime.current) / 1000);
      addWorkoutHistory({
        id: Date.now().toString(),
        workoutId: workout.id,
        workoutName: workout.name,
        studentId: user?.id || 'admin',
        date: new Date().toLocaleDateString('pt-BR'),
        duration,
        completed: true,
      });
      Alert.alert(
        'Parabens!',
        `Treino concluido em ${Math.floor(duration / 60)}min ${duration % 60}s!`,
        [{ text: 'Finalizar', onPress: onFinish }]
      );
    }
  };

  const handleSkipSet = () => {
    if (currentSet < exercise.sets.length - 1) {
      setCurrentSet(currentSet + 1);
    } else if (currentExercise < workout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setCurrentSet(0);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => {
          Alert.alert('Sair do Treino', 'Tem certeza que quer sair?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Sair', style: 'destructive', onPress: onFinish },
          ]);
        }}>
          <Text style={styles.closeIcon}>X</Text>
        </TouchableOpacity>
        <View style={styles.headerInfo}>
          <Text style={styles.headerTitle}>{workout.name}</Text>
          <Badge text={`${completedCount}/${totalSets}`} color={Colors.primary} bgColor={Colors.primary + '20'} />
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>{Math.round(progress)}% completo</Text>
      </View>

      <View style={styles.timerSection}>
        <Text style={styles.timerLabel}>TEMPO DE TREINO</Text>
        <Text style={styles.timerValue}>
          {String(Math.floor(timer / 60)).padStart(2, '0')}:{String(timer % 60).padStart(2, '0')}
        </Text>
      </View>

      <ScrollView style={styles.exerciseList} showsVerticalScrollIndicator={false}>
        {workout.exercises.map((we, exerciseIndex) => {
          const isCurrent = exerciseIndex === currentExercise;
          const isDone = exerciseIndex < currentExercise;
          return (
            <View key={exerciseIndex}>
              <View style={[styles.exerciseCard, isCurrent && styles.exerciseCardActive, isDone && styles.exerciseCardDone]}>
                <View style={styles.exerciseHeader}>
                  <View style={[styles.exerciseNumber, isCurrent && styles.exerciseNumberActive, isDone && styles.exerciseNumberDone]}>
                    {isDone ? (
                      <Text style={styles.checkIcon}>✓</Text>
                    ) : (
                      <Text style={[styles.exerciseNumberText, isCurrent && styles.exerciseNumberTextActive]}>{exerciseIndex + 1}</Text>
                    )}
                  </View>
                  <View style={styles.exerciseInfo}>
                    <Text style={[styles.exerciseName, isDone && styles.exerciseNameDone]}>{we.exercise.name}</Text>
                    <Text style={styles.exerciseMeta}>{we.exercise.muscle}</Text>
                  </View>
                  {isCurrent && <Badge text="AGORA" color={Colors.success} bgColor={Colors.successBg} />}
                </View>

                {isCurrent && (
                  <>
                    {we.exercise.videoUrl && (
                      <TouchableOpacity style={styles.videoButton} onPress={() => Linking.openURL(we.exercise.videoUrl!)}>
                        <Text style={styles.videoButtonIcon}>▶</Text>
                        <Text style={styles.videoButtonText}>Ver como fazer</Text>
                      </TouchableOpacity>
                    )}
                    <View style={styles.setsContainer}>
                      {we.sets.map((s, setIndex) => {
                        const isThisSet = setIndex === currentSet;
                        const isSetDone = completedSets[exerciseIndex][setIndex];
                        return (
                          <View key={setIndex} style={[styles.setItem, isThisSet && styles.setItemActive, isSetDone && styles.setItemDone]}>
                            <Text style={[styles.setItemNumber, isThisSet && styles.setItemNumberActive]}>{setIndex + 1}</Text>
                            <View style={styles.setItemDetails}>
                              <Text style={styles.setItemValue}>{s.reps} reps</Text>
                              <Text style={styles.setItemWeight}>{s.weight}kg</Text>
                            </View>
                            {isSetDone ? (
                              <Text style={styles.setItemCheck}>✓</Text>
                            ) : isThisSet ? (
                              <TouchableOpacity style={styles.completeSetButton} onPress={handleCompleteSet}>
                                <Text style={styles.completeSetText}>✓</Text>
                              </TouchableOpacity>
                            ) : (
                              <View style={styles.setItemPending} />
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </>
                )}

                {isDone && (
                  <View style={styles.doneSetsContainer}>
                    {we.sets.map((s, setIndex) => (
                      <View key={setIndex} style={styles.doneSetItem}>
                        <Text style={styles.doneSetText}>{setIndex + 1}x{s.reps} • {s.weight}kg</Text>
                        <Text style={styles.doneSetCheck}>✓</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>

      {exercise && (
        <View style={styles.bottomBar}>
          {canSkip && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkipSet}>
              <Text style={styles.skipText}>Pular</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.mainButton} onPress={handleCompleteSet}>
            <Text style={styles.mainButtonText}>
              {currentSet < exercise.sets.length - 1
                ? `Prox. Serie (${currentSet + 2}/${exercise.sets.length})`
                : currentExercise < workout.exercises.length - 1
                ? 'Proximo Exercicio'
                : 'Finalizar Treino'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl, paddingBottom: Spacing.md, gap: Spacing.md,
  },
  closeButton: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  closeIcon: { fontSize: 16, color: Colors.text },
  headerInfo: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerTitle: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.text, flex: 1 },
  progressContainer: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  progressBar: { height: 6, backgroundColor: Colors.border, borderRadius: 3, overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressText: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.xs },
  timerSection: { alignItems: 'center', paddingVertical: Spacing.md, marginBottom: Spacing.sm },
  timerLabel: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 2, marginBottom: Spacing.xs },
  timerValue: { fontSize: FontSize.hero, fontWeight: 'bold', color: Colors.primary, fontVariant: ['tabular-nums'] },
  exerciseList: { flex: 1, paddingHorizontal: Spacing.lg },
  exerciseCard: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md,
    marginBottom: Spacing.sm, borderWidth: 1, borderColor: Colors.border,
  },
  exerciseCardActive: { borderColor: Colors.primary, backgroundColor: Colors.primary + '08' },
  exerciseCardDone: { opacity: 0.6 },
  exerciseHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  exerciseNumber: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  exerciseNumberActive: { backgroundColor: Colors.primary },
  exerciseNumberDone: { backgroundColor: Colors.success },
  exerciseNumberText: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textMuted },
  exerciseNumberTextActive: { color: Colors.white },
  checkIcon: { fontSize: 14, color: Colors.white, fontWeight: 'bold' },
  exerciseInfo: { flex: 1 },
  exerciseName: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  exerciseNameDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  exerciseMeta: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  videoButton: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.danger + '15',
    borderRadius: BorderRadius.sm, padding: Spacing.sm, marginTop: Spacing.sm,
    gap: Spacing.sm, borderWidth: 1, borderColor: Colors.danger + '30',
  },
  videoButtonIcon: { fontSize: 14, color: Colors.danger },
  videoButtonText: { fontSize: FontSize.sm, color: Colors.danger, fontWeight: '600' },
  setsContainer: { marginTop: Spacing.md, gap: Spacing.sm },
  setItem: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm, padding: Spacing.sm, gap: Spacing.sm,
  },
  setItemActive: { borderWidth: 1, borderColor: Colors.primary, backgroundColor: Colors.primary + '10' },
  setItemDone: { opacity: 0.5 },
  setItemNumber: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textMuted, width: 24, textAlign: 'center' },
  setItemNumberActive: { color: Colors.primary },
  setItemDetails: { flex: 1, flexDirection: 'row', gap: Spacing.md },
  setItemValue: { fontSize: FontSize.sm, color: Colors.text, fontWeight: '500' },
  setItemWeight: { fontSize: FontSize.sm, color: Colors.textSecondary },
  setItemCheck: { fontSize: 16, color: Colors.success, fontWeight: 'bold' },
  setItemPending: { width: 24, height: 24, borderRadius: 6, borderWidth: 1, borderColor: Colors.border },
  completeSetButton: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.success,
    justifyContent: 'center', alignItems: 'center',
  },
  completeSetText: { color: Colors.white, fontSize: 14, fontWeight: 'bold' },
  doneSetsContainer: { marginTop: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm },
  doneSetItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 2 },
  doneSetText: { fontSize: FontSize.xs, color: Colors.textMuted },
  doneSetCheck: { fontSize: 12, color: Colors.success },
  bottomBar: {
    flexDirection: 'row', paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    gap: Spacing.sm, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border,
  },
  skipButton: {
    paddingVertical: Spacing.md, paddingHorizontal: Spacing.lg, borderRadius: BorderRadius.md,
    borderWidth: 1, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center',
  },
  skipText: { color: Colors.textSecondary, fontSize: FontSize.md, fontWeight: '500' },
  mainButton: {
    flex: 1, backgroundColor: Colors.primary, borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md, justifyContent: 'center', alignItems: 'center',
  },
  mainButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
});
