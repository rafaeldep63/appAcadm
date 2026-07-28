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
import { mockWorkouts } from '../data/mockData';
import { Workout } from '../data/types';
import { Card, Badge, SectionHeader, EmptyState } from '../components/UI';

export default function WorkoutsScreen() {
  const [search, setSearch] = useState('');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);

  const filteredWorkouts = mockWorkouts.filter((w) =>
    w.name.toLowerCase().includes(search.toLowerCase())
  );

  if (selectedWorkout) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.detailHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedWorkout(null)}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <View style={styles.detailHeaderInfo}>
            <Text style={styles.detailTitle}>{selectedWorkout.name}</Text>
            <Badge text={selectedWorkout.day} color={Colors.primary} bgColor={Colors.primary + '20'} size="md" />
          </View>
        </View>

        <View style={styles.detailStats}>
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>{selectedWorkout.exercises.length}</Text>
            <Text style={styles.detailStatLabel}>Exercicios</Text>
          </View>
          <View style={styles.detailStatDivider} />
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>
              {selectedWorkout.exercises.reduce((acc, we) => acc + we.sets.length, 0)}
            </Text>
            <Text style={styles.detailStatLabel}>Series Total</Text>
          </View>
          <View style={styles.detailStatDivider} />
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>
              {selectedWorkout.exercises.reduce((acc, we) => acc + we.sets.reduce((a, s) => a + s.reps, 0), 0)}
            </Text>
            <Text style={styles.detailStatLabel}>Reps Total</Text>
          </View>
        </View>

        {selectedWorkout.exercises.map((we, index) => (
          <View key={index} style={styles.exerciseSection}>
            <View style={styles.exerciseNumber}>
              <Text style={styles.exerciseNumberText}>{index + 1}</Text>
            </View>
            <Card style={styles.exerciseCard}>
              <View style={styles.exerciseHeader}>
                <Text style={styles.exerciseName}>{we.exercise.name}</Text>
                <Badge text={we.exercise.muscle} color={Colors.primary} bgColor={Colors.primary + '20'} />
              </View>
              <Text style={styles.exerciseEquipment}>{we.exercise.equipment}</Text>
              <Text style={styles.exerciseDesc}>{we.exercise.description}</Text>

              <View style={styles.setsTable}>
                <View style={styles.setsHeaderRow}>
                  <Text style={[styles.setsHeaderText, { flex: 0.5 }]}>#</Text>
                  <Text style={[styles.setsHeaderText, { flex: 1 }]}>Reps</Text>
                  <Text style={[styles.setsHeaderText, { flex: 1 }]}>Peso</Text>
                  <Text style={[styles.setsHeaderText, { flex: 1 }]}>Descanso</Text>
                </View>
                {we.sets.map((set, setIndex) => (
                  <View key={setIndex} style={[styles.setsRow, setIndex % 2 === 0 && styles.setsRowAlt]}>
                    <Text style={[styles.setsCell, { flex: 0.5, color: Colors.primary, fontWeight: '600' }]}>{setIndex + 1}</Text>
                    <Text style={[styles.setsCell, { flex: 1 }]}>{set.reps}</Text>
                    <Text style={[styles.setsCell, { flex: 1 }]}>{set.weight}kg</Text>
                    <Text style={[styles.setsCell, { flex: 1 }]}>{set.rest}s</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        ))}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Treinos</Text>
        <Text style={styles.subtitle}>Gerencie os treinos da academia</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar treino..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {filteredWorkouts.length === 0 ? (
          <EmptyState icon="◈" title="Nenhum treino encontrado" description="Tente outro termo de busca" />
        ) : (
          filteredWorkouts.map((workout) => (
            <TouchableOpacity key={workout.id} activeOpacity={0.7} onPress={() => setSelectedWorkout(workout)}>
              <Card style={styles.workoutCard}>
                <View style={styles.workoutRow}>
                  <View style={styles.workoutIconContainer}>
                    <Text style={styles.workoutIcon}>◈</Text>
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={styles.workoutName}>{workout.name}</Text>
                    <Text style={styles.workoutMeta}>
                      {workout.day} • {workout.exercises.length} exercicio(s) • {workout.exercises.reduce((acc, we) => acc + we.sets.length, 0)} series
                    </Text>
                  </View>
                  <Text style={styles.forwardIcon}>›</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    fontSize: 18,
    color: Colors.textMuted,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  list: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  workoutCard: {
    marginBottom: Spacing.sm,
  },
  workoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  workoutIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  workoutIcon: {
    fontSize: 20,
    color: Colors.primary,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  workoutMeta: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  forwardIcon: {
    fontSize: 24,
    color: Colors.textMuted,
  },
  detailHeader: {
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
  detailHeaderInfo: {
    flex: 1,
  },
  detailTitle: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  detailStats: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  detailStat: {
    flex: 1,
    alignItems: 'center',
  },
  detailStatValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  detailStatLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  detailStatDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  exerciseSection: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    alignItems: 'flex-start',
  },
  exerciseNumber: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
    marginTop: Spacing.md,
  },
  exerciseNumberText: {
    fontSize: FontSize.xs,
    fontWeight: 'bold',
    color: Colors.white,
  },
  exerciseCard: {
    flex: 1,
  },
  exerciseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  exerciseName: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
  },
  exerciseEquipment: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
  },
  exerciseDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  setsTable: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.sm,
  },
  setsHeaderRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.xs,
  },
  setsHeaderText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  setsRow: {
    flexDirection: 'row',
    paddingVertical: Spacing.sm,
  },
  setsRowAlt: {
    backgroundColor: Colors.background + '40',
    marginHorizontal: -Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: 4,
  },
  setsCell: {
    fontSize: FontSize.sm,
    color: Colors.text,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '300',
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
