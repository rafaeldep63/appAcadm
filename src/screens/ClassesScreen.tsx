import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { mockClasses } from '../data/mockData';
import { GymClass } from '../data/types';
import { Card, Badge, EmptyState, ProgressBar } from '../components/UI';

const days = [
  { key: 'Segunda', short: 'SEG' },
  { key: 'Terca', short: 'TER' },
  { key: 'Quarta', short: 'QUA' },
  { key: 'Quinta', short: 'QUI' },
  { key: 'Sexta', short: 'SEX' },
  { key: 'Sabado', short: 'SAB' },
  { key: 'Domingo', short: 'DOM' },
];

export default function ClassesScreen() {
  const [selectedDay, setSelectedDay] = useState('Segunda');
  const filteredClasses = mockClasses.filter((c) => c.day === selectedDay);

  const handleEnroll = (cls: GymClass) => {
    if (cls.enrolled >= cls.capacity) {
      Alert.alert('Turma Lotada', 'Nao ha vagas disponiveis para esta aula.');
      return;
    }
    Alert.alert(
      'Confirmar Inscrever',
      `Deseja se inscrever em ${cls.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => Alert.alert('Sucesso', 'Inscricao realizada com sucesso!') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aulas</Text>
        <Text style={styles.subtitle}>Agendamento semanal</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
        contentContainerStyle={styles.daysContent}
      >
        {days.map((day) => {
          const count = mockClasses.filter((c) => c.day === day.key).length;
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

      <ScrollView style={styles.classList} showsVerticalScrollIndicator={false}>
        {filteredClasses.length === 0 ? (
          <EmptyState
            icon="◎"
            title="Nenhuma aula"
            description={`Nenhuma aula agendada para ${selectedDay}`}
          />
        ) : (
          filteredClasses.map((cls) => (
            <Card key={cls.id} style={styles.classCard}>
              <View style={styles.classHeader}>
                <View style={styles.classTimeSection}>
                  <Text style={styles.classTime}>{cls.time}</Text>
                  <Text style={styles.classDuration}>{cls.duration} min</Text>
                </View>
                <View style={styles.classDivider} />
                <View style={styles.classInfoSection}>
                  <Text style={styles.className}>{cls.name}</Text>
                  <Text style={styles.classInstructor}>{cls.instructor}</Text>
                </View>
              </View>

              <Text style={styles.classDesc}>{cls.description}</Text>

              <View style={styles.capacitySection}>
                <View style={styles.capacityHeader}>
                  <Text style={styles.capacityLabel}>Vagas</Text>
                  <Text style={styles.capacityValue}>{cls.enrolled} / {cls.capacity}</Text>
                </View>
                <ProgressBar
                  progress={(cls.enrolled / cls.capacity) * 100}
                  color={cls.enrolled >= cls.capacity ? Colors.danger : Colors.success}
                  height={6}
                />
              </View>

              <TouchableOpacity
                style={[
                  styles.enrollButton,
                  cls.enrolled >= cls.capacity && styles.enrollButtonDisabled,
                ]}
                onPress={() => handleEnroll(cls)}
                activeOpacity={0.7}
                disabled={cls.enrolled >= cls.capacity}
              >
                <Text style={[
                  styles.enrollText,
                  cls.enrolled >= cls.capacity && styles.enrollTextDisabled,
                ]}>
                  {cls.enrolled >= cls.capacity ? 'Turma Lotada' : 'Inscrever-se'}
                </Text>
              </TouchableOpacity>
            </Card>
          ))
        )}

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
  daysContainer: {
    maxHeight: 70,
    marginBottom: Spacing.md,
  },
  daysContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  dayCard: {
    width: 56,
    height: 60,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayCardActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayShort: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  dayShortActive: {
    color: Colors.white,
  },
  dayBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.primary + '30',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayBadgeActive: {
    backgroundColor: Colors.white + '30',
  },
  dayBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  dayBadgeTextActive: {
    color: Colors.white,
  },
  classList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  classCard: {
    marginBottom: Spacing.md,
  },
  classHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  classTimeSection: {
    alignItems: 'center',
    minWidth: 60,
  },
  classTime: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  classDuration: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  classDivider: {
    width: 1,
    height: 40,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  classInfoSection: {
    flex: 1,
  },
  className: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  classInstructor: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  classDesc: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  capacitySection: {
    marginBottom: Spacing.md,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  capacityLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  capacityValue: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  enrollButtonDisabled: {
    backgroundColor: Colors.surfaceLight,
  },
  enrollText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '600',
  },
  enrollTextDisabled: {
    color: Colors.textMuted,
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
