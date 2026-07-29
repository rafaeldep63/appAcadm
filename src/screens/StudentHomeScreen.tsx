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
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Card, Badge, SectionHeader, ProgressBar } from '../components/UI';

const { width } = Dimensions.get('window');

export default function StudentHomeScreen({ navigation, customNavigation }: any) {
  const { user, logout } = useAuth();
  const { workouts, isWorkoutComplete, workoutHistory } = useData();

  const today: string = 'Segunda';
  const todayWorkouts = workouts.filter((w) => w.day === today);
  const todayWorkout = todayWorkouts[0];
  const completedCount = workoutHistory.filter((h) => {
    const d = new Date(h.date.split('/').reverse().join('-'));
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;
  const weekWorkouts = workoutHistory.filter((h) => {
    const d = new Date(h.date.split('/').reverse().join('-'));
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    return d >= weekAgo;
  });
  const weekFrequency = weekWorkouts.length;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ola,</Text>
          <Text style={styles.userName}>{user?.name?.split(' ')[0] || 'Aluno'}</Text>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsRow}>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>Treinos no Mes</Text>
          <Text style={styles.miniStatValue}>{completedCount}</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.primary }]}>continuar assim!</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>Frequencia</Text>
          <Text style={styles.miniStatValue}>{weekFrequency}</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.success }]}>essa semana</Text>
        </Card>
        <Card style={styles.miniStat}>
          <Text style={styles.miniStatLabel}>Treinos</Text>
          <Text style={styles.miniStatValue}>{workouts.length}</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.info }]}>disponiveis</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Treino de Hoje" action="Ver todos" onAction={() => navigation?.navigate('Treinos')} />
        {todayWorkout ? (
          <Card style={styles.workoutCard}>
            <View style={styles.workoutHeader}>
              <View style={styles.workoutIconContainer}>
                <Text style={styles.workoutIcon}>◈</Text>
              </View>
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{todayWorkout.name}</Text>
                <Text style={styles.workoutMeta}>
                  {todayWorkout.exercises.length} exercicios • {todayWorkout.exercises.reduce((a, e) => a + e.sets.length, 0)} series
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
                  <Text style={styles.exerciseDetail}>{we.sets.length}x{we.sets[0].reps} • {we.sets[0].weight}kg</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity
              style={styles.startButton}
              activeOpacity={0.8}
              onPress={() => customNavigation?.navigate('WorkoutExecution', { workout: todayWorkout })}
            >
              <Text style={styles.startButtonText}>Iniciar Treino</Text>
              <Text style={styles.startButtonArrow}>→</Text>
            </TouchableOpacity>
          </Card>
        ) : (
          <Card>
            <Text style={styles.noWorkoutText}>Nenhum treino agendado para hoje</Text>
          </Card>
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Ultimos Treinos" />
        {workoutHistory.length === 0 ? (
          <Card>
            <Text style={styles.noWorkoutText}>Nenhum treino realizado ainda</Text>
          </Card>
        ) : (
          workoutHistory.slice(0, 5).map((entry) => (
            <Card key={entry.id} style={styles.historyCard}>
              <View style={styles.historyRow}>
                <View style={styles.historyIconCircle}>
                  <Text style={styles.historyIcon}>✓</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName}>{entry.workoutName}</Text>
                  <Text style={styles.historyDate}>{entry.date} • {Math.floor(entry.duration / 60)}min {entry.duration % 60}s</Text>
                </View>
                <Badge text="FEITO" color={Colors.success} bgColor={Colors.successBg} />
              </View>
            </Card>
          ))
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Seu Progresso" action="Ver detalhes" onAction={() => navigation?.navigate('Progresso')} />
        <Card>
          <View style={styles.progressHeader}>
            <Text style={styles.progressTitle}>Evolucao</Text>
            <Badge text="Este mes" color={Colors.primary} bgColor={Colors.primary + '20'} />
          </View>
          <View style={styles.progressMetrics}>
            <View style={styles.progressMetric}>
              <Text style={styles.progressMetricLabel}>Treinos</Text>
              <Text style={[styles.progressMetricValue, { color: Colors.primary }]}>{completedCount}</Text>
            </View>
            <View style={styles.progressMetricDivider} />
            <View style={styles.progressMetric}>
              <Text style={styles.progressMetricLabel}>Frequencia</Text>
              <Text style={[styles.progressMetricValue, { color: Colors.success }]}>{weekFrequency}/7</Text>
            </View>
            <View style={styles.progressMetricDivider} />
            <View style={styles.progressMetric}>
              <Text style={styles.progressMetricLabel}>Meta</Text>
              <Text style={[styles.progressMetricValue, { color: Colors.warning }]}>75%</Text>
            </View>
          </View>
          <View style={styles.progressSummary}>
            <ProgressBar progress={Math.min((completedCount / 20) * 100, 100)} color={Colors.primary} height={6} />
            <Text style={styles.progressSummaryText}>{completedCount} de 20 treinos este mes</Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Proximos Passos" />
        <Card style={styles.tipCard}>
          <View style={styles.tipRow}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>
              {weekFrequency < 3
                ? 'Tente treinar pelo menos 3x por semana para melhores resultados!'
                : 'Otimo trabalho! Continue mantendo a frequencia!'}
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxl, paddingBottom: Spacing.md,
  },
  greeting: { fontSize: FontSize.md, color: Colors.textSecondary },
  userName: { fontSize: FontSize.title, fontWeight: 'bold', color: Colors.text, letterSpacing: -0.5 },
  logoutButton: { backgroundColor: Colors.dangerBg, paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.sm },
  logoutText: { color: Colors.danger, fontSize: FontSize.sm, fontWeight: '600' },
  statsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  miniStat: { flex: 1 },
  miniStatLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  miniStatValue: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text, marginTop: Spacing.xs },
  miniStatDiff: { fontSize: FontSize.xs, fontWeight: '600', marginTop: 2 },
  section: { marginTop: Spacing.lg, paddingHorizontal: Spacing.lg },
  workoutCard: { marginBottom: Spacing.sm },
  workoutHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.md, gap: Spacing.md },
  workoutIconContainer: {
    width: 48, height: 48, borderRadius: 14, backgroundColor: Colors.primary + '15',
    justifyContent: 'center', alignItems: 'center',
  },
  workoutIcon: { fontSize: 20, color: Colors.primary },
  workoutInfo: { flex: 1 },
  workoutName: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.text },
  workoutMeta: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  exerciseItem: {
    flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm,
    borderTopWidth: 1, borderTopColor: Colors.border, gap: Spacing.md,
  },
  exerciseNumber: {
    width: 24, height: 24, borderRadius: 6, backgroundColor: Colors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  exerciseNumberText: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.textMuted },
  exerciseName: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.text },
  exerciseDetail: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  startButton: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.md,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: Spacing.md, gap: Spacing.sm,
  },
  startButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
  startButtonArrow: { color: Colors.white, fontSize: FontSize.lg },
  noWorkoutText: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', paddingVertical: Spacing.lg },
  historyCard: { marginBottom: Spacing.sm },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  historyIconCircle: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.successBg,
    justifyContent: 'center', alignItems: 'center',
  },
  historyIcon: { fontSize: 16, color: Colors.success, fontWeight: 'bold' },
  historyInfo: { flex: 1 },
  historyName: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  historyDate: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  progressHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md,
  },
  progressTitle: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  progressMetrics: { flexDirection: 'row', marginBottom: Spacing.md },
  progressMetric: { flex: 1, alignItems: 'center' },
  progressMetricLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  progressMetricValue: { fontSize: FontSize.lg, fontWeight: 'bold', marginTop: Spacing.xs },
  progressMetricDivider: { width: 1, height: 40, backgroundColor: Colors.border, marginVertical: Spacing.xs },
  progressSummary: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.md },
  progressSummaryText: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.sm },
  tipCard: { marginBottom: Spacing.sm },
  tipRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  tipIcon: { fontSize: 24 },
  tipText: { flex: 1, fontSize: FontSize.sm, color: Colors.textSecondary, lineHeight: 20 },
  bottomSpacer: { height: Spacing.xxl },
});
