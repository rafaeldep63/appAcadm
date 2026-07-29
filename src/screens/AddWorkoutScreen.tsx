import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { mockExercises } from '../data/mockData';
import { Exercise, Workout, WorkoutSet } from '../data/types';
import { Card, Badge } from '../components/UI';

interface Props {
  onBack: () => void;
  onSave: (workout: any) => void;
}

export default function AddWorkoutScreen({ onBack, onSave }: Props) {
  const { students } = useData();
  const { user, isAdmin } = useAuth();
  const [name, setName] = useState('');
  const [selectedDay, setSelectedDay] = useState('Segunda');
  const [assignedTo, setAssignedTo] = useState(isAdmin ? (students[0]?.id || '') : (user?.id || ''));
  const [selectedExercises, setSelectedExercises] = useState<{ exercise: Exercise; reps: string; weight: string; sets: string }[]>([]);

  const days = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

  const addExercise = (exercise: Exercise) => {
    if (selectedExercises.find((se) => se.exercise.id === exercise.id)) return;
    setSelectedExercises([
      ...selectedExercises,
      { exercise, reps: '12', weight: '0', sets: '3' },
    ]);
  };

  const removeExercise = (index: number) => {
    setSelectedExercises(selectedExercises.filter((_, i) => i !== index));
  };

  const updateExercise = (index: number, field: string, value: string) => {
    const updated = [...selectedExercises];
    (updated[index] as any)[field] = value;
    setSelectedExercises(updated);
  };

  const handleSave = () => {
    if (!name) {
      Alert.alert('Erro', 'Digite o nome do treino.');
      return;
    }
    if (isAdmin && !assignedTo) {
      Alert.alert('Erro', 'Selecione um aluno para receber o treino.');
      return;
    }
    if (selectedExercises.length === 0) {
      Alert.alert('Erro', 'Adicione pelo menos 1 exercicio.');
      return;
    }
    const newWorkout: Workout = {
      id: Date.now().toString(),
      name,
      day: selectedDay,
      assignedTo,
      exercises: selectedExercises.map((se) => ({
        exercise: se.exercise,
        sets: Array.from({ length: parseInt(se.sets) || 3 }, (): WorkoutSet => ({
          reps: parseInt(se.reps) || 12,
          weight: parseInt(se.weight) || 0,
          rest: 60,
        })),
      })),
    };
    onSave(newWorkout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novo Treino</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Card style={styles.formCard}>
          <Text style={styles.label}>NOME DO TREINO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Treino A - Peito e Triceps"
            placeholderTextColor={Colors.textMuted}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>DIA DA SEMANA</Text>
          <View style={styles.daysGrid}>
            {days.map((day) => (
              <TouchableOpacity
                key={day}
                style={[styles.dayChip, selectedDay === day && styles.dayChipActive]}
                onPress={() => setSelectedDay(day)}
              >
                <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>
                  {day.slice(0, 3)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </Card>

        {isAdmin && (
          <Card style={styles.formCard}>
            <Text style={styles.label}>ALUNO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.studentRow}>
              {students.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.studentChip, assignedTo === s.id && styles.studentChipActive]}
                  onPress={() => setAssignedTo(s.id)}
                >
                  <Text style={[styles.studentChipText, assignedTo === s.id && styles.studentChipTextActive]}>
                    {s.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Card>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Exercicios Adicionados ({selectedExercises.length})</Text>
          {selectedExercises.map((se, index) => (
            <Card key={index} style={styles.exerciseEditCard}>
              <View style={styles.exerciseEditHeader}>
                <Text style={styles.exerciseEditName}>{se.exercise.name}</Text>
                <TouchableOpacity onPress={() => removeExercise(index)}>
                  <Text style={styles.removeIcon}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.exerciseEditFields}>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Series</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={se.sets}
                    onChangeText={(v) => updateExercise(index, 'sets', v)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Reps</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={se.reps}
                    onChangeText={(v) => updateExercise(index, 'reps', v)}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.fieldContainer}>
                  <Text style={styles.fieldLabel}>Peso</Text>
                  <TextInput
                    style={styles.fieldInput}
                    value={se.weight}
                    onChangeText={(v) => updateExercise(index, 'weight', v)}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </Card>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Adicionar Exercicio</Text>
          {mockExercises.map((exercise) => {
            const isAdded = selectedExercises.find((se) => se.exercise.id === exercise.id);
            return (
              <TouchableOpacity
                key={exercise.id}
                style={[styles.exerciseItem, isAdded && styles.exerciseItemAdded]}
                onPress={() => addExercise(exercise)}
                activeOpacity={0.7}
                disabled={!!isAdded}
              >
                <View style={styles.exerciseItemInfo}>
                  <Text style={[styles.exerciseItemName, isAdded && styles.exerciseItemNameAdded]}>
                    {exercise.name}
                  </Text>
                  <Text style={styles.exerciseItemMeta}>{exercise.muscle} • {exercise.equipment}</Text>
                </View>
                {isAdded ? (
                  <Text style={styles.addedIcon}>✓</Text>
                ) : (
                  <Text style={styles.addIcon}>+</Text>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  headerTitle: {
    flex: 1,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  saveButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  saveText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  formCard: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 1,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  dayChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  dayTextActive: {
    color: Colors.white,
  },
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  exerciseEditCard: {
    marginBottom: Spacing.sm,
  },
  exerciseEditHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  exerciseEditName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  removeIcon: {
    fontSize: 16,
    color: Colors.danger,
  },
  exerciseEditFields: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  fieldContainer: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  fieldInput: {
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    fontSize: FontSize.sm,
    color: Colors.text,
    textAlign: 'center',
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.md,
  },
  exerciseItemAdded: {
    opacity: 0.5,
    borderColor: Colors.success,
  },
  exerciseItemInfo: {
    flex: 1,
  },
  exerciseItemName: {
    fontSize: FontSize.md,
    fontWeight: '500',
    color: Colors.text,
  },
  exerciseItemNameAdded: {
    color: Colors.textMuted,
  },
  exerciseItemMeta: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  addIcon: {
    fontSize: 20,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  addedIcon: {
    fontSize: 16,
    color: Colors.success,
    fontWeight: 'bold',
  },
  studentRow: { flexDirection: 'row', gap: Spacing.sm },
  studentChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border,
  },
  studentChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  studentChipText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  studentChipTextActive: { color: Colors.white },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
