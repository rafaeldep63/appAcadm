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
import { Card, SectionHeader, Badge, ProgressBar } from '../components/UI';

const { width } = Dimensions.get('window');

const mockProgressData = [
  { id: '1', date: '2025-01-01', weight: 82, bodyFat: 18, chest: 100, waist: 85, arms: 35, notes: 'Otima evolucao' },
  { id: '2', date: '2025-01-15', weight: 81, bodyFat: 17.5, chest: 101, waist: 84, arms: 35.5 },
  { id: '3', date: '2025-02-01', weight: 80, bodyFat: 17, chest: 102, waist: 83, arms: 36, notes: 'Perdeu 2kg de gordura' },
  { id: '4', date: '2025-02-15', weight: 79, bodyFat: 16.5, chest: 102, waist: 82, arms: 36.5 },
];

const weeklyWorkouts = [
  { day: 'SEG', completed: true, duration: 60 },
  { day: 'TER', completed: true, duration: 55 },
  { day: 'QUA', completed: false, duration: 0 },
  { day: 'QUI', completed: true, duration: 65 },
  { day: 'SEX', completed: false, duration: 0 },
  { day: 'SAB', completed: false, duration: 0 },
  { day: 'DOM', completed: false, duration: 0 },
];

export default function ProgressScreen({ navigation }: any) {
  const latest = mockProgressData[mockProgressData.length - 1];
  const previous = mockProgressData[mockProgressData.length - 2];
  const weightDiff = latest.weight - previous.weight;
  const fatDiff = latest.bodyFat - previous.bodyFat;
  const completedDays = weeklyWorkouts.filter((d) => d.completed).length;
  const totalMinutes = weeklyWorkouts.reduce((acc, d) => acc + d.duration, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.subtitle}>Evolucao de Joao Silva</Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={[styles.miniStat, { borderLeftColor: weightDiff <= 0 ? Colors.success : Colors.danger }]}>
          <Text style={styles.miniStatLabel}>Peso</Text>
          <Text style={styles.miniStatValue}>{latest.weight}kg</Text>
          <Text style={[styles.miniStatDiff, { color: weightDiff <= 0 ? Colors.success : Colors.danger }]}>
            {weightDiff > 0 ? '+' : ''}{weightDiff}kg
          </Text>
        </Card>
        <Card style={[styles.miniStat, { borderLeftColor: fatDiff <= 0 ? Colors.success : Colors.danger }]}>
          <Text style={styles.miniStatLabel}>Gordura</Text>
          <Text style={styles.miniStatValue}>{latest.bodyFat}%</Text>
          <Text style={[styles.miniStatDiff, { color: fatDiff <= 0 ? Colors.success : Colors.danger }]}>
            {fatDiff > 0 ? '+' : ''}{fatDiff}%
          </Text>
        </Card>
        <Card style={[styles.miniStat, { borderLeftColor: Colors.info }]}>
          <Text style={styles.miniStatLabel}>Treinos</Text>
          <Text style={styles.miniStatValue}>{completedDays}/7</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.info }]}>{totalMinutes} min</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Semana Atual" />
        <Card>
          <View style={styles.weekGrid}>
            {weeklyWorkouts.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[
                  styles.dayCircle,
                  day.completed ? styles.dayCircleCompleted : styles.dayCirclePending,
                ]}>
                  {day.completed && <Text style={styles.dayCheck}>✓</Text>}
                </View>
                <Text style={styles.dayLabel}>{day.day}</Text>
                {day.completed ? (
                  <Text style={styles.dayDuration}>{day.duration}m</Text>
                ) : (
                  <Text style={styles.dayDash}>—</Text>
                )}
              </View>
            ))}
          </View>
          <View style={styles.weekSummary}>
            <ProgressBar progress={(completedDays / 7) * 100} color={Colors.primary} height={6} />
            <Text style={styles.weekSummaryText}>
              {completedDays} de 7 dias • {totalMinutes} minutos totais
            </Text>
          </View>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Medidas Corporais" />
        <Card>
          {[
            { label: 'Peso', value: `${latest.weight}kg`, prev: `${previous.weight}kg`, icon: '⚖' },
            { label: 'Gordura Corporal', value: `${latest.bodyFat}%`, prev: `${previous.bodyFat}%`, icon: '◆' },
            { label: 'Peito', value: `${latest.chest}cm`, prev: `${previous.chest}cm`, icon: '◈' },
            { label: 'Cintura', value: `${latest.waist}cm`, prev: `${previous.waist}cm`, icon: '◎' },
            { label: 'Bracos', value: `${latest.arms}cm`, prev: `${previous.arms}cm`, icon: '♦' },
          ].map((item, index) => (
            <View key={index}>
              <View style={styles.measureRow}>
                <View style={styles.measureIconContainer}>
                  <Text style={styles.measureIcon}>{item.icon}</Text>
                </View>
                <View style={styles.measureInfo}>
                  <Text style={styles.measureLabel}>{item.label}</Text>
                  <Text style={styles.measurePrev}>anterior: {item.prev}</Text>
                </View>
                <Text style={styles.measureValue}>{item.value}</Text>
              </View>
              {index < 4 && <View style={styles.measureDivider} />}
            </View>
          ))}
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Historico de Medidas" />
        {mockProgressData.map((entry, index) => (
          <Card key={entry.id} style={styles.historyCard}>
            <View style={styles.historyRow}>
              <View style={styles.historyDateBlock}>
                <Text style={styles.historyDay}>{entry.date.split('-')[2]}</Text>
                <Text style={styles.historyMonth}>
                  {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'][parseInt(entry.date.split('-')[1]) - 1]}
                </Text>
              </View>
              <View style={styles.historyDivider} />
              <View style={styles.historyInfo}>
                <View style={styles.historyMetrics}>
                  <View style={styles.historyMetric}>
                    <Text style={styles.historyMetricLabel}>Peso</Text>
                    <Text style={styles.historyMetricValue}>{entry.weight}kg</Text>
                  </View>
                  <View style={styles.historyMetric}>
                    <Text style={styles.historyMetricLabel}>Gordura</Text>
                    <Text style={styles.historyMetricValue}>{entry.bodyFat}%</Text>
                  </View>
                  <View style={styles.historyMetric}>
                    <Text style={styles.historyMetricLabel}>Bracos</Text>
                    <Text style={styles.historyMetricValue}>{entry.arms}cm</Text>
                  </View>
                </View>
                {entry.notes && (
                  <View style={styles.historyNote}>
                    <Text style={styles.historyNoteText}>{entry.notes}</Text>
                  </View>
                )}
              </View>
            </View>
          </Card>
        ))}
      </View>

      <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => navigation?.navigate('AddMeasurement')}>
        <Text style={styles.addButtonText}>+ Registrar Novas Medidas</Text>
      </TouchableOpacity>

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
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  miniStat: {
    flex: 1,
    borderLeftWidth: 3,
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
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: Colors.success,
  },
  dayCirclePending: {
    backgroundColor: Colors.background,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  dayCheck: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    letterSpacing: 0.5,
  },
  dayDuration: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  dayDash: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  weekSummary: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
  },
  weekSummaryText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
  measureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  measureIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  measureIcon: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  measureInfo: {
    flex: 1,
  },
  measureLabel: {
    fontSize: FontSize.sm,
    color: Colors.text,
    fontWeight: '500',
  },
  measurePrev: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  measureValue: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  measureDivider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 48,
  },
  historyCard: {
    marginBottom: Spacing.sm,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  historyDateBlock: {
    alignItems: 'center',
    minWidth: 50,
  },
  historyDay: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  historyMonth: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  historyDivider: {
    width: 1,
    height: 50,
    backgroundColor: Colors.border,
  },
  historyInfo: {
    flex: 1,
  },
  historyMetrics: {
    flexDirection: 'row',
    gap: Spacing.lg,
  },
  historyMetric: {},
  historyMetricLabel: {
    fontSize: 10,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  historyMetricValue: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 2,
  },
  historyNote: {
    marginTop: Spacing.sm,
    paddingLeft: Spacing.sm,
    borderLeftWidth: 2,
    borderLeftColor: Colors.primary + '40',
  },
  historyNoteText: {
    fontSize: FontSize.xs,
    color: Colors.primary,
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
