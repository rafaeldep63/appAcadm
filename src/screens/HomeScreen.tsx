import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, Shadow } from '../theme';
import { useData } from '../context/DataContext';
import { Card, Badge, SectionHeader } from '../components/UI';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const { workouts, students, isWorkoutComplete, workoutHistory } = useData();
  const activeStudents = students.filter((s) => s.status === 'ativo').length;

  const daysOrder = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];
  const today: string = daysOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1];
  const todayWorkouts = workouts.filter((w) => w.day === today);
  const todayDone = todayWorkouts.filter((w) => isWorkoutComplete(w.id, w.day)).length;
  const totalExercises = workouts.reduce((acc, w) => acc + w.exercises.length, 0);
  const totalSets = workouts.reduce((acc, w) => acc + w.exercises.reduce((a, e) => a + e.sets.length, 0), 0);
  const monthlyWorkouts = workoutHistory.filter((h) => {
    const d = new Date(h.date);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  const stats = [
    { icon: '●', value: String(activeStudents), label: 'Alunos Ativos', color: Colors.success, trend: `${students.length} cadastrados` },
    { icon: '◈', value: String(workouts.length), label: 'Treinos', color: Colors.primary, trend: `${totalExercises} exercicios` },
    { icon: '◆', value: String(monthlyWorkouts), label: 'Treinos no Mes', color: Colors.info, trend: 'ultimos 30 dias' },
    { icon: '◎', value: `${todayDone}/${todayWorkouts.length}`, label: 'Concluidos Hoje', color: Colors.warning, trend: today },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bom dia,</Text>
          <Text style={styles.userName}>Administrador</Text>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.headerStat}>
            <Text style={styles.headerStatValue}>{activeStudents}</Text>
            <Text style={styles.headerStatLabel}>Alunos</Text>
          </View>
          <TouchableOpacity style={styles.avatar}>
            <Text style={styles.avatarText}>A</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }, Shadow.sm]}>
            <View style={[styles.statIconContainer, { backgroundColor: stat.color + '20' }]}>
              <Text style={[styles.statIcon, { color: stat.color }]}>{stat.icon}</Text>
            </View>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Treinos de Hoje" action="Ver todos" onAction={() => navigation.navigate('Calendario')} />
        {todayWorkouts.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Nenhum treino agendado para hoje</Text>
            <Text style={styles.emptyHint}>Va em Treinos para criar um novo treino</Text>
          </Card>
        ) : (
          todayWorkouts.map((workout) => {
            const done = isWorkoutComplete(workout.id, workout.day);
            return (
              <Card key={workout.id} style={[styles.workoutCard, done && styles.workoutCardDone]}>
                <View style={styles.workoutRow}>
                  <View style={[styles.workoutIcon, { backgroundColor: done ? Colors.successBg : Colors.primary + '20' }]}>
                    <Text style={[styles.workoutIconText, { color: done ? Colors.success : Colors.primary }]}>◈</Text>
                  </View>
                  <View style={styles.workoutInfo}>
                    <Text style={[styles.workoutName, done && styles.textDone]}>{workout.name}</Text>
                    <Text style={styles.workoutMeta}>
                      {workout.exercises.length} exercicios • {workout.exercises.reduce((a, e) => a + e.sets.length, 0)} series
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
            { label: 'Treinos', icon: '◈', screen: 'Treinos', color: Colors.primary, count: workouts.length },
            { label: 'Calendario', icon: '◎', screen: 'Calendario', color: Colors.info, count: `${todayDone}/${todayWorkouts.length}` },
            { label: 'Alunos', icon: '●', screen: 'Alunos', color: Colors.success, count: activeStudents },
            { label: 'Progresso', icon: '◆', screen: 'Progresso', color: Colors.warning, count: `${monthlyWorkouts} mes` },
          ].map((shortcut, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.shortcutCard, Shadow.sm]}
              onPress={() => navigation.navigate(shortcut.screen)}
              activeOpacity={0.7}
            >
              <View style={[styles.shortcutIconContainer, { backgroundColor: shortcut.color + '20' }]}>
                <Text style={[styles.shortcutIcon, { color: shortcut.color }]}>{shortcut.icon}</Text>
              </View>
              <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
              <Text style={[styles.shortcutCount, { color: shortcut.color }]}>{shortcut.count}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Ultimos Treinos" />
        {workoutHistory.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Nenhum treino realizado ainda</Text>
            <Text style={styles.emptyHint}>Complete um treino para ve-lo aqui</Text>
          </Card>
        ) : (
          workoutHistory.slice(0, 3).map((entry) => (
            <Card key={entry.id} style={styles.historyCard}>
              <View style={styles.historyRow}>
                <View style={styles.historyIconContainer}>
                  <Text style={styles.historyIcon}>✓</Text>
                </View>
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName}>{entry.workoutName}</Text>
                  <Text style={styles.historyDate}>{entry.date} • {entry.duration}min</Text>
                </View>
                <Badge text="FEITO" color={Colors.success} bgColor={Colors.successBg} />
              </View>
            </Card>
          ))
        )}
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
  headerRight: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  headerStat: { alignItems: 'center' },
  headerStatValue: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.primary },
  headerStatLabel: { fontSize: 10, color: Colors.textMuted, textTransform: 'uppercase' },
  avatar: {
    width: 44, height: 44, borderRadius: 14, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarText: { color: Colors.white, fontSize: FontSize.xl, fontWeight: 'bold' },
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.lg, gap: Spacing.sm,
  },
  statCard: {
    width: '48%', flexGrow: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg,
    padding: Spacing.md, borderLeftWidth: 3, borderWidth: 1, borderColor: Colors.border,
  },
  statIconContainer: {
    width: 36, height: 36, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.sm,
  },
  statIcon: { fontSize: 18 },
  statValue: { fontSize: FontSize.xxl, fontWeight: 'bold', color: Colors.text },
  statLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  statTrend: { fontSize: FontSize.xs, fontWeight: '600', marginTop: Spacing.xs },
  section: { marginTop: Spacing.lg, paddingHorizontal: Spacing.lg },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.text, marginBottom: 4 },
  sectionHeader: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Spacing.md,
  },
  sectionSubtitle: { fontSize: FontSize.sm, color: Colors.textSecondary },
  seeAll: { fontSize: FontSize.sm, color: Colors.primary, fontWeight: '500' },
  emptyText: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', paddingTop: Spacing.lg },
  emptyHint: { fontSize: FontSize.xs, color: Colors.textMuted, textAlign: 'center', paddingBottom: Spacing.md, opacity: 0.7 },
  workoutCard: { marginBottom: Spacing.sm },
  workoutCardDone: { opacity: 0.7 },
  workoutRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  workoutIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  workoutIconText: { fontSize: 20 },
  workoutInfo: { flex: 1 },
  workoutName: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  textDone: { textDecorationLine: 'line-through', color: Colors.textMuted },
  workoutMeta: { fontSize: FontSize.xs, color: Colors.textSecondary, marginTop: 2 },
  shortcutsGrid: {
    flexDirection: 'row', gap: Spacing.sm,
  },
  shortcutCard: {
    flex: 1, backgroundColor: Colors.surface, borderRadius: BorderRadius.lg, padding: Spacing.md,
    alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  shortcutIconContainer: {
    width: 42, height: 42, borderRadius: 12, justifyContent: 'center', alignItems: 'center', marginBottom: Spacing.sm,
  },
  shortcutIcon: { fontSize: 20 },
  shortcutLabel: { fontSize: FontSize.xs, color: Colors.textSecondary, fontWeight: '500' },
  shortcutCount: { fontSize: FontSize.sm, fontWeight: 'bold', marginTop: 4 },
  historyCard: { marginBottom: Spacing.sm },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  historyIconContainer: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: Colors.successBg,
    justifyContent: 'center', alignItems: 'center',
  },
  historyIcon: { fontSize: 16, color: Colors.success, fontWeight: 'bold' },
  historyInfo: { flex: 1 },
  historyName: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  historyDate: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  bottomSpacer: { height: Spacing.xxl },
});
