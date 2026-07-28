import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { useWorkouts } from '../context/WorkoutContext';
import { mockStudents } from '../data/mockData';
import { StatCard, SectionHeader, Card, Badge } from '../components/UI';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { workouts, isWorkoutComplete } = useWorkouts();
  const activeStudents = mockStudents.filter((s) => s.status === 'ativo').length;
  const totalExercises = workouts.reduce((acc, w) => acc + w.exercises.length, 0);

  const today: string = 'Segunda';
  const todayWorkouts = workouts.filter((w) => w.day === today);
  const todayDone = todayWorkouts.filter((w) => isWorkoutComplete(w.id, w.day)).length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bom dia,</Text>
          <Text style={styles.userName}>Admin</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
          <View style={styles.avatarBadge} />
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          icon="●"
          value={activeStudents.toString()}
          label="Alunos Ativos"
          color={Colors.success}
          trend="+2 esse mes"
        />
        <StatCard
          icon="◈"
          value={workouts.length.toString()}
          label="Treinos Ativos"
          color={Colors.primary}
        />
        <StatCard
          icon="◎"
          value={totalExercises.toString()}
          label="Total Exercicios"
          color={Colors.info}
        />
        <StatCard
          icon="♦"
          value={`${todayDone}/${todayWorkouts.length}`}
          label="Treinos Hoje"
          color={Colors.warning}
          trend={today === 'Domingo' ? 'descanso' : `${today}`}
        />
      </View>

      <View style={styles.section}>
        <SectionHeader title="Treinos de Hoje" action="Ver todos" onAction={() => navigation.navigate('Calendario')} />
        {todayWorkouts.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Nenhum treino para hoje</Text>
          </Card>
        ) : (
          todayWorkouts.map((workout) => {
            const done = isWorkoutComplete(workout.id, workout.day);
            return (
              <Card key={workout.id} style={styles.classCard}>
                <View style={styles.classRow}>
                  <View style={styles.classTimeBlock}>
                    <Text style={styles.classDay}>{workout.day.slice(0, 3).toUpperCase()}</Text>
                    <Text style={styles.classTime}>{workout.exercises.length}ex</Text>
                  </View>
                  <View style={styles.classInfo}>
                    <Text style={styles.className}>{workout.name}</Text>
                    <Text style={styles.classInstructor}>
                      {workout.exercises.reduce((acc, we) => acc + we.sets.length, 0)} series
                    </Text>
                  </View>
                  <Badge
                    text={done ? 'FEITO' : 'PENDENTE'}
                    color={done ? Colors.success : Colors.textMuted}
                    bgColor={done ? Colors.successBg : Colors.border}
                  />
                </View>
              </Card>
            );
          })
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Atalhos Rapidos" />
        <View style={styles.shortcutsGrid}>
          {[
            { label: 'Treinos', icon: '◈', screen: 'Treinos', color: Colors.primary },
            { label: 'Calendario', icon: '◎', screen: 'Calendario', color: Colors.info },
            { label: 'Alunos', icon: '◉', screen: 'Alunos', color: Colors.success },
            { label: 'Progresso', icon: '◆', screen: 'Progresso', color: Colors.warning },
          ].map((shortcut, index) => (
            <TouchableOpacity
              key={index}
              style={styles.shortcutCard}
              onPress={() => navigation.navigate(shortcut.screen)}
            >
              <View style={[styles.shortcutIcon, { backgroundColor: shortcut.color + '20' }]}>
                <Text style={[styles.shortcutIconText, { color: shortcut.color }]}>{shortcut.icon}</Text>
              </View>
              <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  userName: {
    fontSize: FontSize.title,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  avatarText: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
  avatarBadge: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.success,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  classCard: {
    marginBottom: Spacing.sm,
  },
  classRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  classTimeBlock: {
    alignItems: 'center',
    minWidth: 50,
  },
  classDay: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  classTime: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  classInstructor: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  capacityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  capacityText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  shortcutCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  shortcutIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  shortcutIconText: {
    fontSize: 20,
  },
  shortcutLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingVertical: Spacing.md,
  },
});
