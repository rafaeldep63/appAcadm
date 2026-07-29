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
import { Workout } from '../data/types';
import { Card, Badge, EmptyState } from '../components/UI';

export default function WorkoutsScreen({ customNavigation }: any) {
  const [search, setSearch] = useState('');
  const [dayFilter, setDayFilter] = useState<string | null>(null);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const { workouts, deleteWorkout } = useData();
  const { user } = useAuth();
  const myWorkouts = user?.role === 'admin' ? workouts : workouts.filter((w) => w.assignedTo === user?.id);

  const days = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

  const filteredWorkouts = myWorkouts.filter((w) => {
    const matchSearch = w.name.toLowerCase().includes(search.toLowerCase());
    const matchDay = !dayFilter || w.day === dayFilter;
    return matchSearch && matchDay;
  });

  if (selectedWorkout) {
    const totalSets = selectedWorkout.exercises.reduce((acc, we) => acc + we.sets.length, 0);
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
            <Text style={styles.detailStatValue}>{totalSets}</Text>
            <Text style={styles.detailStatLabel}>Series</Text>
          </View>
          <View style={styles.detailStatDivider} />
          <View style={styles.detailStat}>
            <Text style={styles.detailStatValue}>
              {selectedWorkout.exercises.reduce((acc, we) => acc + we.sets.reduce((a, s) => a + s.reps, 0), 0)}
            </Text>
            <Text style={styles.detailStatLabel}>Reps</Text>
          </View>
        </View>

        {selectedWorkout.exercises.map((we, index) => (
          <View key={index} style={styles.exerciseSection}>
            <View style={styles.exerciseNumCircle}>
              <Text style={styles.exerciseNumText}>{index + 1}</Text>
            </View>
            <Card style={styles.exerciseCard}>
              <View style={styles.exerciseCardHeader}>
                <Text style={styles.exerciseCardName}>{we.exercise.name}</Text>
                <Badge text={we.exercise.muscle} color={Colors.primary} bgColor={Colors.primary + '20'} />
              </View>
              <Text style={styles.exerciseCardEquip}>{we.exercise.equipment}</Text>
              <Text style={styles.exerciseCardDesc}>{we.exercise.description}</Text>
              <View style={styles.setsTable}>
                <View style={styles.setsHeader}>
                  <Text style={[styles.setsHeaderText, { flex: 0.5 }]}>#</Text>
                  <Text style={[styles.setsHeaderText, { flex: 1 }]}>Reps</Text>
                  <Text style={[styles.setsHeaderText, { flex: 1 }]}>Peso</Text>
                  <Text style={[styles.setsHeaderText, { flex: 1 }]}>Desc.</Text>
                </View>
                {we.sets.map((s, si) => (
                  <View key={si} style={[styles.setsRow, si % 2 === 0 && styles.setsRowAlt]}>
                    <Text style={[styles.setsCell, { flex: 0.5, color: Colors.primary, fontWeight: '600' }]}>{si + 1}</Text>
                    <Text style={[styles.setsCell, { flex: 1 }]}>{s.reps}</Text>
                    <Text style={[styles.setsCell, { flex: 1 }]}>{s.weight}kg</Text>
                    <Text style={[styles.setsCell, { flex: 1 }]}>{s.rest}s</Text>
                  </View>
                ))}
              </View>
            </Card>
          </View>
        ))}

        <View style={styles.detailActions}>
          <TouchableOpacity
            style={styles.startWorkoutButton}
            onPress={() => {
              setSelectedWorkout(null);
              customNavigation?.navigate('WorkoutExecution', { workout: selectedWorkout });
            }}
          >
            <Text style={styles.startWorkoutText}>Iniciar Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteWorkoutButton}
            onPress={() => {
              Alert.alert('Excluir Treino', `Tem certeza que deseja excluir "${selectedWorkout.name}"?`, [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Excluir', style: 'destructive', onPress: () => { deleteWorkout(selectedWorkout.id); setSelectedWorkout(null); } },
              ]);
            }}
          >
            <Text style={styles.deleteWorkoutText}>Excluir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Treinos</Text>
        <Text style={styles.subtitle}>{myWorkouts.length} treinos cadastrados</Text>
      </View>

      <View style={styles.searchRow}>
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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterRow} contentContainerStyle={styles.filterContent}>
        <TouchableOpacity style={[styles.filterChip, !dayFilter && styles.filterChipActive]} onPress={() => setDayFilter(null)}>
          <Text style={[styles.filterText, !dayFilter && styles.filterTextActive]}>Todos</Text>
        </TouchableOpacity>
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.filterChip, dayFilter === day && styles.filterChipActive]}
            onPress={() => setDayFilter(day === dayFilter ? null : day)}
          >
            <Text style={[styles.filterText, dayFilter === day && styles.filterTextActive]}>{day.slice(0, 3)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {filteredWorkouts.length === 0 ? (
          <EmptyState icon="◈" title="Nenhum treino encontrado" description="Tente outro termo ou crie um novo treino" />
        ) : (
          filteredWorkouts.map((workout) => (
            <TouchableOpacity key={workout.id} activeOpacity={0.7} onPress={() => setSelectedWorkout(workout)}>
              <Card style={styles.workoutCard}>
                <View style={styles.workoutRow}>
                  <View style={styles.workoutIcon}>
                    <Text style={styles.workoutIconText}>◈</Text>
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={styles.workoutCardName}>{workout.name}</Text>
                    <Text style={styles.workoutCardMeta}>
                      {workout.day} • {workout.exercises.length} ex • {workout.exercises.reduce((a, e) => a + e.sets.length, 0)} series
                    </Text>
                  </View>
                  <Text style={styles.forwardIcon}>›</Text>
                </View>
              </Card>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => customNavigation?.navigate('AddWorkout')}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxl, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.title, fontWeight: 'bold', color: Colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  searchRow: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md,
  },
  searchIcon: { fontSize: 18, color: Colors.textMuted, marginRight: Spacing.sm },
  searchInput: { flex: 1, paddingVertical: Spacing.md, fontSize: FontSize.md, color: Colors.text },
  filterRow: { maxHeight: 44, marginBottom: Spacing.md },
  filterContent: { paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  filterChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface, borderWidth: 1, borderColor: Colors.border,
  },
  filterChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  filterTextActive: { color: Colors.white },
  list: { flex: 1, paddingHorizontal: Spacing.lg },
  workoutCard: { marginBottom: Spacing.sm },
  workoutRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  workoutIcon: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary + '15',
    justifyContent: 'center', alignItems: 'center',
  },
  workoutIconText: { fontSize: 20, color: Colors.primary },
  workoutInfo: { flex: 1 },
  workoutCardName: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  workoutCardMeta: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 3 },
  forwardIcon: { fontSize: 24, color: Colors.textMuted },
  detailHeader: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl, paddingBottom: Spacing.md, gap: Spacing.md,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  backIcon: { fontSize: 24, color: Colors.text },
  detailHeaderInfo: { flex: 1 },
  detailTitle: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text, marginBottom: Spacing.xs },
  detailStats: {
    flexDirection: 'row', backgroundColor: Colors.surface, marginHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg, padding: Spacing.md, marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.border,
  },
  detailStat: { flex: 1, alignItems: 'center' },
  detailStatValue: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.primary },
  detailStatLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  detailStatDivider: {
    width: 1, backgroundColor: Colors.border, marginVertical: Spacing.xs,
  },
  exerciseSection: { flexDirection: 'row', paddingHorizontal: Spacing.lg, marginBottom: Spacing.md, alignItems: 'flex-start' },
  exerciseNumCircle: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center', marginRight: Spacing.sm, marginTop: Spacing.md,
  },
  exerciseNumText: { fontSize: FontSize.xs, fontWeight: 'bold', color: Colors.white },
  exerciseCard: { flex: 1 },
  exerciseCardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.xs },
  exerciseCardName: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.text, flex: 1 },
  exerciseCardEquip: { fontSize: FontSize.xs, color: Colors.textMuted, marginBottom: Spacing.sm },
  exerciseCardDesc: { fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20, marginBottom: Spacing.md },
  setsTable: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm },
  setsHeader: { flexDirection: 'row', paddingVertical: Spacing.xs },
  setsHeaderText: { fontSize: FontSize.xs, color: Colors.textMuted, fontWeight: '600', letterSpacing: 0.5, textTransform: 'uppercase', textAlign: 'center' },
  setsRow: { flexDirection: 'row', paddingVertical: Spacing.sm },
  setsRowAlt: { backgroundColor: Colors.background + '40', marginHorizontal: -Spacing.sm, paddingHorizontal: Spacing.sm, borderRadius: 4 },
  setsCell: { fontSize: FontSize.sm, color: Colors.text, textAlign: 'center' },
  detailActions: { paddingHorizontal: Spacing.lg, gap: Spacing.sm, marginTop: Spacing.md },
  startWorkoutButton: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.md,
    alignItems: 'center', shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  startWorkoutText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
  deleteWorkoutButton: {
    borderWidth: 1, borderColor: Colors.danger, borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md, alignItems: 'center',
  },
  deleteWorkoutText: { color: Colors.danger, fontSize: FontSize.md, fontWeight: '500' },
  fab: {
    position: 'absolute', bottom: Spacing.xl, right: Spacing.xl,
    width: 56, height: 56, borderRadius: 16, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  fabIcon: { color: Colors.white, fontSize: 28, fontWeight: '300' },
  bottomSpacer: { height: Spacing.xxl },
});
