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
import { mockWorkouts, mockClasses, mockStudents } from '../data/mockData';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }: any) {
  const stats = [
    { label: 'Alunos Ativos', value: mockStudents.filter(s => s.status === 'ativo').length.toString(), icon: '👥', color: Colors.success },
    { label: 'Treinos Hoje', value: mockWorkouts.length.toString(), icon: '💪', color: Colors.primary },
    { label: 'Aulas Semana', value: mockClasses.length.toString(), icon: '📅', color: Colors.info },
    { label: 'Receita Mensal', value: 'R$ 12.5k', icon: '💰', color: Colors.warning },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Ola, Admin!</Text>
          <Text style={styles.subtitle}>Painel da Academia</Text>
        </View>
        <TouchableOpacity style={styles.avatar}>
          <Text style={styles.avatarText}>A</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <View key={index} style={[styles.statCard, { borderLeftColor: stat.color }]}>
            <Text style={styles.statIcon}>{stat.icon}</Text>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Proximas Aulas</Text>
        {mockClasses.slice(0, 3).map((cls) => (
          <TouchableOpacity key={cls.id} style={styles.classCard}>
            <View style={styles.classInfo}>
              <Text style={styles.className}>{cls.name}</Text>
              <Text style={styles.classDetail}>{cls.instructor} • {cls.day} {cls.time}</Text>
            </View>
            <View style={styles.capacityContainer}>
              <Text style={styles.capacityText}>
                {cls.enrolled}/{cls.capacity}
              </Text>
              <View style={styles.capacityBar}>
                <View
                  style={[
                    styles.capacityFill,
                    { width: `${(cls.enrolled / cls.capacity) * 100}%` },
                  ]}
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Atalhos</Text>
        <View style={styles.shortcutsGrid}>
          {[
            { label: 'Treinos', icon: '🏋️', screen: 'Treinos' },
            { label: 'Aulas', icon: '📅', screen: 'Aulas' },
            { label: 'Alunos', icon: '👥', screen: 'Alunos' },
            { label: 'Progresso', icon: '📊', screen: 'Progresso' },
          ].map((shortcut, index) => (
            <TouchableOpacity
              key={index}
              style={styles.shortcutCard}
              onPress={() => navigation.navigate(shortcut.screen)}
            >
              <Text style={styles.shortcutIcon}>{shortcut.icon}</Text>
              <Text style={styles.shortcutLabel}>{shortcut.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
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
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
  },
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: Colors.white,
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  statCard: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderLeftWidth: 3,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: Spacing.xs,
  },
  statValue: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
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
  classCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  classInfo: {
    flex: 1,
  },
  className: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  classDetail: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
  },
  capacityContainer: {
    alignItems: 'flex-end',
    width: 80,
  },
  capacityText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  capacityBar: {
    width: 80,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  capacityFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 2,
  },
  shortcutsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  shortcutCard: {
    width: (width - Spacing.lg * 2 - Spacing.sm * 3) / 4,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  shortcutIcon: {
    fontSize: 28,
    marginBottom: Spacing.xs,
  },
  shortcutLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
});
