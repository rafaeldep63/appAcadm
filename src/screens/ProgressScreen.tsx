import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { mockStudents } from '../data/mockData';

const mockProgressData = [
  { id: '1', studentId: '1', date: '2024-12-01', weight: 82, bodyFat: 18, chest: 100, waist: 85, arms: 35, notes: 'Otima evolucao' },
  { id: '2', studentId: '1', date: '2024-12-15', weight: 81, bodyFat: 17.5, chest: 101, waist: 84, arms: 35.5, notes: '' },
  { id: '3', studentId: '1', date: '2025-01-01', weight: 80, bodyFat: 17, chest: 102, waist: 83, arms: 36, notes: 'Perdeu 2kg de gordura' },
  { id: '4', studentId: '1', date: '2025-01-15', weight: 79, bodyFat: 16.5, chest: 102, waist: 82, arms: 36.5, notes: '' },
];

const weeklyWorkouts = [
  { day: 'Seg', completed: true, duration: 60 },
  { day: 'Ter', completed: true, duration: 55 },
  { day: 'Qua', completed: false, duration: 0 },
  { day: 'Qui', completed: true, duration: 65 },
  { day: 'Sex', completed: false, duration: 0 },
  { day: 'Sab', completed: false, duration: 0 },
  { day: 'Dom', completed: false, duration: 0 },
];

export default function ProgressScreen() {
  const [selectedStudent] = useState(mockStudents[0]);

  const latestData = mockProgressData[mockProgressData.length - 1];
  const previousData = mockProgressData[mockProgressData.length - 2];

  const weightDiff = latestData.weight - previousData.weight;
  const fatDiff = latestData.bodyFat - previousData.bodyFat;

  const completedDays = weeklyWorkouts.filter((d) => d.completed).length;
  const totalMinutes = weeklyWorkouts.reduce((acc, d) => acc + d.duration, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Progresso</Text>
        <Text style={styles.subtitle}>{selectedStudent.name}</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statCard, { backgroundColor: weightDiff <= 0 ? Colors.success + '20' : Colors.danger + '20' }]}>
          <Text style={styles.statValue}>{latestData.weight}kg</Text>
          <Text style={[styles.statDiff, { color: weightDiff <= 0 ? Colors.success : Colors.danger }]}>
            {weightDiff > 0 ? '+' : ''}{weightDiff}kg
          </Text>
          <Text style={styles.statLabel}>Peso</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: fatDiff <= 0 ? Colors.success + '20' : Colors.danger + '20' }]}>
          <Text style={styles.statValue}>{latestData.bodyFat}%</Text>
          <Text style={[styles.statDiff, { color: fatDiff <= 0 ? Colors.success : Colors.danger }]}>
            {fatDiff > 0 ? '+' : ''}{fatDiff}%
          </Text>
          <Text style={styles.statLabel}>Gordura</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: Colors.info + '20' }]}>
          <Text style={styles.statValue}>{completedDays}/7</Text>
          <Text style={[styles.statDiff, { color: Colors.info }]}>dias</Text>
          <Text style={styles.statLabel}>Treinos</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Treinos da Semana</Text>
        <View style={styles.weekGrid}>
          {weeklyWorkouts.map((day, index) => (
            <View key={index} style={styles.dayColumn}>
              <View
                style={[
                  styles.dayCircle,
                  day.completed ? styles.dayCircleCompleted : styles.dayCirclePending,
                ]}
              >
                <Text style={styles.dayCircleIcon}>{day.completed ? '✓' : '○'}</Text>
              </View>
              <Text style={styles.dayLabel}>{day.day}</Text>
              {day.completed && (
                <Text style={styles.dayDuration}>{day.duration}min</Text>
              )}
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medidas Corporais</Text>
        <View style={styles.measurementsCard}>
          {[
            { label: 'Peso', value: `${latestData.weight}kg`, prev: `${previousData.weight}kg` },
            { label: 'Gordura Corporal', value: `${latestData.bodyFat}%`, prev: `${previousData.bodyFat}%` },
            { label: 'Peito', value: `${latestData.chest}cm`, prev: `${previousData.chest}cm` },
            { label: 'Cintura', value: `${latestData.waist}cm`, prev: `${previousData.waist}cm` },
            { label: 'Bracos', value: `${latestData.arms}cm`, prev: `${previousData.arms}cm` },
          ].map((item, index) => (
            <View key={index} style={styles.measurementRow}>
              <Text style={styles.measurementLabel}>{item.label}</Text>
              <Text style={styles.measurementValue}>{item.value}</Text>
              <Text style={styles.measurementPrev}>anterior: {item.prev}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historico</Text>
        {mockProgressData.map((entry) => (
          <View key={entry.id} style={styles.historyCard}>
            <View style={styles.historyDate}>
              <Text style={styles.historyDay}>{entry.date.split('-')[2]}</Text>
              <Text style={styles.historyMonth}>
                {entry.date.split('-')[1]}/{entry.date.split('-')[0].slice(2)}
              </Text>
            </View>
            <View style={styles.historyInfo}>
              <Text style={styles.historyWeight}>{entry.weight}kg</Text>
              <Text style={styles.historyFat}>{entry.bodyFat}% gordura</Text>
              {entry.notes && <Text style={styles.historyNotes}>{entry.notes}</Text>}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {}}
      >
        <Text style={styles.addButtonText}>+ Registrar Medidas</Text>
      </TouchableOpacity>
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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statDiff: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    marginTop: 2,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  section: {
    marginTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.md,
  },
  weekGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  dayColumn: {
    alignItems: 'center',
  },
  dayCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: Colors.success,
  },
  dayCirclePending: {
    backgroundColor: Colors.surfaceLight,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayCircleIcon: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: 'bold',
  },
  dayLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  dayDuration: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  measurementsCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  measurementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  measurementLabel: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  measurementValue: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    textAlign: 'center',
  },
  measurementPrev: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    flex: 1,
    textAlign: 'right',
  },
  historyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  historyDate: {
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  historyDay: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  historyMonth: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  historyInfo: {
    flex: 1,
    padding: Spacing.md,
  },
  historyWeight: {
    fontSize: FontSize.md,
    fontWeight: 'bold',
    color: Colors.text,
  },
  historyFat: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  historyNotes: {
    fontSize: FontSize.xs,
    color: Colors.info,
    marginTop: Spacing.xs,
    fontStyle: 'italic',
  },
  addButton: {
    backgroundColor: Colors.primary,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.xl,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  addButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: 'bold',
  },
});
