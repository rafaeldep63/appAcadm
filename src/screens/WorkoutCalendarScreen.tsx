import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { useData } from '../context/DataContext';
import { Card, Badge, EmptyState } from '../components/UI';

const days = [
  { key: 'Segunda', short: 'SEG' },
  { key: 'Terca', short: 'TER' },
  { key: 'Quarta', short: 'QUA' },
  { key: 'Quinta', short: 'QUI' },
  { key: 'Sexta', short: 'SEX' },
  { key: 'Sabado', short: 'SAB' },
  { key: 'Domingo', short: 'DOM' },
];

export default function WorkoutCalendarScreen() {
  const [selectedDay, setSelectedDay] = useState('Segunda');
  const { workouts, isWorkoutComplete, toggleWorkoutComplete } = useData();

  const dayWorkouts = workouts.filter((w) => w.day === selectedDay);
  const completedCount = dayWorkouts.filter((w) => isWorkoutComplete(w.id, w.day)).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendario de Treinos</Text>
        <Text style={styles.subtitle}>Acompanhe seus treinos por dia</Text>
      </View>

      <ScrollView
        horizontal showsHorizontalScrollIndicator={false}
        style={styles.daysContainer} contentContainerStyle={styles.daysContent}
      >
        {days.map((day) => {
          const count = workouts.filter((w) => w.day === day.key).length;
          return (
            <TouchableOpacity
              key={day.key}
              style={[styles.dayCard, selectedDay === day.key && styles.dayCardActive]}
              onPress={() => setSelectedDay(day.key)}
              activeOpacity={0.7}
            >
              <Text style={[styles.dayShort, selectedDay === day.key && styles.dayShortActive]}>
                {day.short}
              </Text>
              {count > 0 && (
                <View style={[styles.dayBadge, selectedDay === day.key && styles.dayBadgeActive]}>
                  <Text style={[styles.dayBadgeText, selectedDay === day.key && styles.dayBadgeTextActive]}>
                    {count}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.summaryBar}>
        <Badge
          text={`${completedCount}/${dayWorkouts.length} concluidos`}
          color={completedCount === dayWorkouts.length && dayWorkouts.length > 0 ? Colors.success : Colors.primary}
          bgColor={completedCount === dayWorkouts.length && dayWorkouts.length > 0 ? Colors.successBg : Colors.primary + '20'}
          size="md"
        />
      </View>

      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {dayWorkouts.length === 0 ? (
          <EmptyState icon="◈" title="Nenhum treino" description={`Nenhum treino para ${selectedDay}`} />
        ) : (
          dayWorkouts.map((workout) => {
            const done = isWorkoutComplete(workout.id, workout.day);
            return (
              <Card key={workout.id} style={[styles.workoutCard, done && styles.workoutCardDone]}>
                <TouchableOpacity
                  style={styles.workoutRow}
                  onPress={() => toggleWorkoutComplete(workout.id, workout.day)}
                  activeOpacity={0.7}
                >
                  <View style={[styles.checkCircle, done && styles.checkCircleDone]}>
                    {done && <Text style={styles.checkIcon}>✓</Text>}
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={[styles.workoutName, done && styles.workoutNameDone]}>
                      {workout.name}
                    </Text>
                    <Text style={styles.workoutMeta}>
                      {workout.exercises.length} exercicios • {workout.exercises.reduce((a, e) => a + e.sets.length, 0)} series
                    </Text>
                  </View>
                  <Badge
                    text={done ? 'FEITO' : 'PENDENTE'}
                    color={done ? Colors.success : Colors.textMuted}
                    bgColor={done ? Colors.successBg : Colors.border}
                  />
                </TouchableOpacity>
              </Card>
            );
          })
        )}
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxl, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.title, fontWeight: 'bold', color: Colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  daysContainer: { maxHeight: 70, marginBottom: Spacing.sm },
  daysContent: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  dayCard: {
    width: 56, height: 60, borderRadius: BorderRadius.lg, backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  dayCardActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  dayShort: { fontSize: FontSize.xs, fontWeight: '700', color: Colors.textSecondary, letterSpacing: 1 },
  dayShortActive: { color: Colors.white },
  dayBadge: {
    position: 'absolute', top: -4, right: -4, width: 18, height: 18, borderRadius: 9,
    backgroundColor: Colors.primary + '30', justifyContent: 'center', alignItems: 'center',
  },
  dayBadgeActive: { backgroundColor: Colors.white + '30' },
  dayBadgeText: { fontSize: 10, fontWeight: 'bold', color: Colors.primary },
  dayBadgeTextActive: { color: Colors.white },
  summaryBar: { paddingHorizontal: Spacing.lg, marginBottom: Spacing.md },
  list: { flex: 1, paddingHorizontal: Spacing.lg },
  workoutCard: { marginBottom: Spacing.sm },
  workoutCardDone: { opacity: 0.75 },
  workoutRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  checkCircle: {
    width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: Colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  checkCircleDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  checkIcon: { color: Colors.white, fontSize: 14, fontWeight: 'bold' },
  workoutInfo: { flex: 1 },
  workoutName: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  workoutNameDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  workoutMeta: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  bottomSpacer: { height: Spacing.xxl },
});
