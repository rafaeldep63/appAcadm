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

const days = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'];

export default function ClassesScreen() {
  const [selectedDay, setSelectedDay] = useState<string>('Segunda');

  const filteredClasses = mockClasses.filter((c) => c.day === selectedDay);

  const handleEnroll = (cls: GymClass) => {
    if (cls.enrolled >= cls.capacity) {
      Alert.alert('Turma Cheia', 'Nao ha vagas disponiveis.');
      return;
    }
    Alert.alert(
      'Confirmar',
      `Deseja se inscrever em ${cls.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Confirmar', onPress: () => Alert.alert('Sucesso', 'Inscricao realizada!') },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Aulas</Text>
        <Text style={styles.subtitle}>Agendamento de Aulas</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.daysContainer}
        contentContainerStyle={styles.daysContent}
      >
        {days.map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayChip, selectedDay === day && styles.dayChipActive]}
            onPress={() => setSelectedDay(day)}
          >
            <Text style={[styles.dayText, selectedDay === day && styles.dayTextActive]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.classesList} showsVerticalScrollIndicator={false}>
        {filteredClasses.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📅</Text>
            <Text style={styles.emptyText}>Nenhuma aula neste dia</Text>
          </View>
        ) : (
          filteredClasses.map((cls) => (
            <View key={cls.id} style={styles.classCard}>
              <View style={styles.classTimeContainer}>
                <Text style={styles.classTime}>{cls.time}</Text>
                <Text style={styles.classDuration}>{cls.duration}min</Text>
              </View>

              <View style={styles.classInfo}>
                <Text style={styles.className}>{cls.name}</Text>
                <Text style={styles.classInstructor}>{cls.instructor}</Text>
                <Text style={styles.classDesc}>{cls.description}</Text>

                <View style={styles.capacityInfo}>
                  <View style={styles.capacityBar}>
                    <View
                      style={[
                        styles.capacityFill,
                        {
                          width: `${(cls.enrolled / cls.capacity) * 100}%`,
                          backgroundColor:
                            cls.enrolled >= cls.capacity ? Colors.danger : Colors.success,
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.capacityText}>
                    {cls.enrolled}/{cls.capacity} vagas
                  </Text>
                </View>

                <TouchableOpacity
                  style={[
                    styles.enrollButton,
                    cls.enrolled >= cls.capacity && styles.enrollButtonDisabled,
                  ]}
                  onPress={() => handleEnroll(cls)}
                  disabled={cls.enrolled >= cls.capacity}
                >
                  <Text style={styles.enrollButtonText}>
                    {cls.enrolled >= cls.capacity ? 'Lotado' : 'Inscrever-se'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  daysContainer: {
    maxHeight: 50,
    marginBottom: Spacing.md,
  },
  daysContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  dayChip: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  dayChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayText: {
    color: Colors.textSecondary,
    fontSize: FontSize.sm,
    fontWeight: '500',
  },
  dayTextActive: {
    color: Colors.white,
  },
  classesList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: Spacing.xxl * 2,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: Spacing.md,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textMuted,
  },
  classCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.md,
    overflow: 'hidden',
  },
  classTimeContainer: {
    backgroundColor: Colors.secondary,
    padding: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
  },
  classTime: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  classDuration: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  classInfo: {
    flex: 1,
    padding: Spacing.md,
  },
  className: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
  classInstructor: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    marginTop: 2,
  },
  classDesc: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  capacityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.sm,
    gap: Spacing.sm,
  },
  capacityBar: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    borderRadius: 2,
  },
  capacityText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    minWidth: 60,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.sm,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
    alignSelf: 'flex-start',
  },
  enrollButtonDisabled: {
    backgroundColor: Colors.border,
  },
  enrollButtonText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
});
