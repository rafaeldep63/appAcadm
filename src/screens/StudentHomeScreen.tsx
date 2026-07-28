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
import { mockWorkouts, mockClasses } from '../data/mockData';
import { useAuth } from '../context/AuthContext';
import { Card, Badge, SectionHeader, ProgressBar, StatCard } from '../components/UI';

const { width } = Dimensions.get('window');

export default function StudentHomeScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  const nextClass = mockClasses[0];
  const todayWorkout = mockWorkouts[0];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ola,</Text>
          <Text style={styles.userName}>{user?.name}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>Peso Atual</Text>
          <Text style={styles.miniStatValue}>82kg</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.success }]}>-2kg</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>Treinos</Text>
          <Text style={styles.miniStatValue}>12</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.primary }]}>esse mes</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>Frequencia</Text>
          <Text style={styles.miniStatValue}>85%</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.success }]}>otimo!</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Treino de Hoje" action="Ver todos" />
        <Card style={styles.workoutCard}>
          <View style={styles.workoutHeader}>
            <View style={styles.workoutIconContainer}>
              <Text style={styles.workoutIcon}>◈</Text>
            </View>
            <View style={styles.workoutInfo}>
              <Text style={styles.workoutName}>{todayWorkout.name}</Text>
              <Text style={styles.workoutMeta}>
                {todayWorkout.exercises.length} exercicios • {todayWorkout.exercises.reduce((acc, we) => acc + we.sets.length, 0)} series
              </Text>
            </View>
          </View>

          {todayWorkout.exercises.slice(0, 3).map((we, index) => (
            <View key={index} style={styles.exerciseItem}>
              <View style={styles.exerciseNumber}>
                <Text style={styles.exerciseNumberText}>{index + 1}</Text>
              </View>
              <View style={styles.exerciseInfo}>
                <Text style={styles.exerciseName}>{we.exercise.name}</Text>
                <Text style={styles.exerciseDetail}>
                  {we.sets.length}x{we.sets[0].reps} • {we.sets[0].weight}kg
                </Text>
              </View>
            </View>
          ))}

          <TouchableOpacity style={styles.startButton} activeOpacity={0.8} onPress={() => navigation?.navigate('WorkoutExecution', { workout: todayWorkout })}>
            <Text style={styles.startButtonText}>Iniciar Treino</Text>
            <Text style={styles.startButtonArrow}>→</Text>
          </TouchableOpacity>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Proxima Aula" />
        <Card style={styles.nextClassCard}>
          <View style={styles.nextClassRow}>
            <View style={styles.nextClassTimeBlock}>
              <Text style={styles.nextClassDay}>{nextClass.day.slice(0, 3).toUpperCase()}</Text>
              <Text style={styles.nextClassTime}>{nextClass.time}</Text>
            </View>
            <View style={styles.nextClassDivider} />
            <View style={styles.nextClassInfo}>
              <Text style={styles.nextClassName}>{nextClass.name}</Text>
              <Text style={styles.nextClassInstructor}>{nextClass.instructor}</Text>
              <Text style={styles.nextClassDuration}>{nextClass.duration} minutos</Text>
            </View>
            <Badge
              text={nextClass.enrolled >= nextClass.capacity ? 'LOTADO' : 'ABERTO'}
              color={nextClass.enrolled >= nextClass.capacity ? Colors.danger : Colors.success}
              bgColor={nextClass.enrolled >= nextClass.capacity ? Colors.dangerBg : Colors.successBg}
            />
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Seu Progresso" action="Ver detalhes" />
        <Card>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Evolucao Mensal</Text>
            <Badge text="Ultimos 30 dias" color={Colors.primary} bgColor={Colors.primary + '20'} />
          </View>

          <View style={styles.progressMetrics}>
            <View style={styles.progressMetric}>
              <Text style={styles.progressMetricLabel}>Peso</Text>
              <Text style={[styles.progressMetricValue, { color: Colors.success }]}>82kg</Text>
              <Text style={[styles.progressMetricDiff, { color: Colors.success }]}>↓ 2kg</Text>
            </View>
            <View style={styles.progressMetricDivider} />
            <View style={styles.progressMetric}>
              <Text style={styles.progressMetricLabel}>Gordura</Text>
              <Text style={[styles.progressMetricValue, { color: Colors.success }]}>18%</Text>
              <Text style={[styles.progressMetricDiff, { color: Colors.success }]}>↓ 1.5%</Text>
            </View>
            <View style={styles.progressMetricDivider} />
            <View style={styles.progressMetric}>
              <Text style={styles.progressMetricLabel}>Bracos</Text>
              <Text style={[styles.progressMetricValue, { color: Colors.primary }]}>35cm</Text>
              <Text style={[styles.progressMetricDiff, { color: Colors.primary }]}>↑ 0.5cm</Text>
            </View>
          </View>

          <View style={styles.progressSummary}>
            <ProgressBar progress={75} color={Colors.primary} height={6} />
            <Text style={styles.progressSummaryText}>75% dos seus objetivos atingidos</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Plano Atual" />
        <Card style={styles.planCard}>
          <View style={styles.planHeader}>
            <View style={styles.planBadgeContainer}>
              <Text style={styles.planBadgeIcon}>★</Text>
            </View>
            <View>
              <Text style={styles.planName}>Plano Premium</Text>
              <Text style={styles.planPeriod}>Jan 2025 - Jan 2026</Text>
            </View>
          </View>
          <View style={styles.planFeatures}>
            {['Musculacao ilimitada', 'Aulas coletivas', 'Personal trainer'].map((feature, index) => (
              <View key={index} style={styles.planFeature}>
                <Text style={styles.planFeatureCheck}>✓</Text>
                <Text style={styles.planFeatureText}>{feature}</Text>
              </View>
            ))}
          </View>
        </Card>
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
  logoutButton: {
    backgroundColor: Colors.dangerBg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  logoutText: {
    color: Colors.danger,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  miniStat: {
    flex: 1,
  },
  miniStatLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  miniStatValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  miniStatDiff: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  workoutCard: {
    marginBottom: Spacing.sm,
  },
  workoutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
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
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  workoutMeta: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: Spacing.md,
  },
  exerciseNumber: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  exerciseNumberText: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  exerciseInfo: {
    flex: 1,
  },
  exerciseName: {
    fontSize: FontSize.sm,
    fontWeight: '500',
    color: Colors.text,
  },
  exerciseDetail: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  startButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.md,
    gap: Spacing.sm,
  },
  startButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  startButtonArrow: {
    color: Colors.white,
    fontSize: FontSize.lg,
  },
  nextClassCard: {
    marginBottom: Spacing.sm,
  },
  nextClassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  nextClassTimeBlock: {
    alignItems: 'center',
    minWidth: 50,
  },
  nextClassDay: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.primary,
    letterSpacing: 1,
  },
  nextClassTime: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  nextClassDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
  },
  nextClassInfo: {
    flex: 1,
  },
  nextClassName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  nextClassInstructor: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  nextClassDuration: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  progressTitle: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  progressMetrics: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
  },
  progressMetric: {
    flex: 1,
    alignItems: 'center',
  },
  progressMetricLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  progressMetricValue: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    marginTop: Spacing.xs,
  },
  progressMetricDiff: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  progressMetricDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xs,
  },
  progressSummary: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  progressSummaryText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  planCard: {
    marginBottom: Spacing.sm,
  },
  planHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    gap: Spacing.md,
  },
  planBadgeContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: Colors.warning + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planBadgeIcon: {
    fontSize: 22,
    color: Colors.warning,
  },
  planName: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  planPeriod: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  planFeatures: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    gap: Spacing.sm,
  },
  planFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  planFeatureCheck: {
    fontSize: FontSize.sm,
    color: Colors.success,
    fontWeight: 'bold',
  },
  planFeatureText: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
