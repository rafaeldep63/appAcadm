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
import { Card, SectionHeader, Badge, ProgressBar } from '../components/UI';

const { width } = Dimensions.get('window');

export default function ProgressScreen({ customNavigation }: any) {
  const { students, workoutHistory, studentMeasurements, getHistoryFor } = useData();
  const { currentUser: user } = useAuth();
  const activeStudents = students.filter((s) => s.status === 'ativo').length;
  const myMeasurements = studentMeasurements[user?.id || ''] || [];
  const scopeHistory = user?.role === 'admin' ? workoutHistory : getHistoryFor(user?.id || '');

  const totalWorkouts = scopeHistory.length;
  const monthWorkouts = scopeHistory.filter((h) => {
    const d = new Date(h.date.split('/').reverse().join('-'));
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  });
  const totalMinutes = monthWorkouts.reduce((acc, h) => acc + h.duration, 0);
  const avgMinutes = monthWorkouts.length > 0 ? Math.round(totalMinutes / monthWorkouts.length) : 0;

  const weekDays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];
  const weekCounts = weekDays.map((_, i) => {
    const dayName = ['Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado', 'Domingo'][i];
    return scopeHistory.filter((h) => {
      const d = new Date(h.date.split('/').reverse().join('-'));
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return d >= weekAgo && new Date(h.date.split('/').reverse().join('-')).getDay() === (i + 1) % 7;
    }).length;
  });
  const weekTotal = weekCounts.reduce((a, b) => a + b, 0);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>{user?.role === 'admin' ? 'Progresso Geral' : 'Meu Progresso'}</Text>
        <Text style={styles.subtitle}>{user?.role === 'admin' ? 'Visao geral da academia' : 'Acompanhe sua evolucao'}</Text>
      </View>

      <View style={styles.statsRow}>
        <Card style={[styles.miniStat, { borderLeftColor: Colors.primary }]}>
          <Text style={styles.miniStatLabel}>{user?.role === 'admin' ? 'Alunos Ativos' : 'Treinos Totais'}</Text>
          <Text style={styles.miniStatValue}>{user?.role === 'admin' ? activeStudents : totalWorkouts}</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.primary }]}>{user?.role === 'admin' ? `${students.length} total` : 'realizados'}</Text>
        </Card>
        <Card style={[styles.miniStat, { borderLeftColor: Colors.info }]}>
          <Text style={styles.miniStatLabel}>Treinos Mes</Text>
          <Text style={styles.miniStatValue}>{monthWorkouts.length}</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.info }]}>{totalMinutes}min totais</Text>
        </Card>
        <Card style={[styles.miniStat, { borderLeftColor: Colors.success }]}>
          <Text style={styles.miniStatLabel}>Media</Text>
          <Text style={styles.miniStatValue}>{avgMinutes}min</Text>
          <Text style={[styles.miniStatDiff, { color: Colors.success }]}>por treino</Text>
        </Card>
      </View>

      <View style={styles.section}>
        <SectionHeader title="Frequencia Semanal" />
        <Card>
          <View style={styles.weekGrid}>
            {weekDays.map((day, index) => (
              <View key={index} style={styles.dayColumn}>
                <View style={[styles.dayCircle, weekCounts[index] > 0 && styles.dayCircleDone]}>
                  {weekCounts[index] > 0 && <Text style={styles.dayCheck}>✓</Text>}
                </View>
                <Text style={styles.dayLabel}>{day}</Text>
                <Text style={styles.dayCount}>{weekCounts[index] > 0 ? `${weekCounts[index]}x` : '—'}</Text>
              </View>
            ))}
          </View>
          <View style={styles.weekSummary}>
            <ProgressBar progress={(weekTotal / 7) * 100} color={Colors.primary} height={6} />
            <Text style={styles.weekSummaryText}>
              {weekTotal} treinos essa semana • {weekTotal >= 3 ? 'Meta atingida! 🎯' : 'Faltam ' + (3 - weekTotal) + ' para a meta'}
            </Text>
          </View>
        </Card>
      </View>

      {user?.role === 'admin' && (
        <View style={styles.section}>
          <SectionHeader title="Ranking de Alunos" />
          {students
            .filter((s) => s.status === 'ativo')
            .sort((a, b) => {
              const aCount = workoutHistory.filter((h) => h.studentId === a.id).length;
              const bCount = workoutHistory.filter((h) => h.studentId === b.id).length;
              return bCount - aCount;
            })
            .slice(0, 5)
            .map((student, index) => {
              const count = workoutHistory.filter((h) => h.studentId === student.id).length;
              return (
                <Card key={student.id} style={styles.rankCard}>
                  <View style={styles.rankRow}>
                    <View style={[styles.rankBadge, index === 0 && styles.rankGold, index === 1 && styles.rankSilver, index === 2 && styles.rankBronze]}>
                      <Text style={styles.rankNumber}>{index + 1}</Text>
                    </View>
                    <View style={styles.rankInfo}>
                      <Text style={styles.rankName}>{student.name}</Text>
                      <Text style={styles.rankPlan}>{student.plan}</Text>
                    </View>
                    <Text style={styles.rankCount}>{count} treinos</Text>
                  </View>
                </Card>
              );
            })}
        </View>
      )}

      <View style={styles.section}>
        <SectionHeader title="Ultimos Treinos Realizados" />
        {scopeHistory.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Nenhum treino realizado ainda</Text>
          </Card>
        ) : (
          scopeHistory.slice(0, 5).map((entry) => (
            <Card key={entry.id} style={styles.historyCard}>
              <View style={styles.historyRow}>
                <View style={styles.historyDateBlock}>
                  <Text style={styles.historyDay}>{entry.date.split('/')[0]}</Text>
                  <Text style={styles.historyMonth}>{entry.date.split('/')[1]}</Text>
                </View>
                <View style={styles.historyDivider} />
                <View style={styles.historyInfo}>
                  <Text style={styles.historyName}>{entry.workoutName}</Text>
                  <Text style={styles.historyDuration}>{Math.floor(entry.duration / 60)}min {entry.duration % 60}s</Text>
                </View>
              </View>
            </Card>
          ))
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader title="Minhas Medidas" />
        {myMeasurements.length === 0 ? (
          <Card>
            <Text style={styles.emptyText}>Nenhuma medida registrada ainda</Text>
          </Card>
        ) : (
          myMeasurements.slice(0, 5).map((m) => (
            <Card key={m.id} style={styles.measCard}>
              <View style={styles.measHeader}>
                <View style={styles.measDateBlock}>
                  <Text style={styles.measDay}>{m.date.split('/')[0]}</Text>
                  <Text style={styles.measMonth}>{m.date.split('/')[1]}</Text>
                </View>
                <View style={styles.measValues}>
                  <Text style={styles.measWeight}>{m.weight}kg</Text>
                  {m.bodyFat && <Text style={styles.measFat}>{m.bodyFat}% gordura</Text>}
                </View>
              </View>
              <View style={styles.measRow}>
                {m.chest && <Text style={styles.measDetail}>Peito: {m.chest}cm</Text>}
                {m.waist && <Text style={styles.measDetail}>Cintura: {m.waist}cm</Text>}
                {m.arms && <Text style={styles.measDetail}>Braco: {m.arms}cm</Text>}
                {m.thighs && <Text style={styles.measDetail}>Coxa: {m.thighs}cm</Text>}
              </View>
            </Card>
          ))
        )}
      </View>

      <TouchableOpacity style={styles.addButton} activeOpacity={0.8} onPress={() => customNavigation?.navigate('AddMeasurement')}>
        <Text style={styles.addButtonText}>+ Registrar Medidas</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxl, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.title, fontWeight: 'bold', color: Colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  statsRow: { flexDirection: 'row', paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  miniStat: { flex: 1, borderLeftWidth: 3 },
  miniStatLabel: { fontSize: FontSize.xs, color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 0.5 },
  miniStatValue: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text, marginTop: Spacing.xs },
  miniStatDiff: { fontSize: FontSize.xs, fontWeight: '600', marginTop: 2 },
  section: { marginTop: Spacing.lg, paddingHorizontal: Spacing.lg },
  weekGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.md },
  dayColumn: { alignItems: 'center' },
  dayCircle: {
    width: 36, height: 36, borderRadius: 12, backgroundColor: Colors.background,
    borderWidth: 1.5, borderColor: Colors.border, justifyContent: 'center', alignItems: 'center',
  },
  dayCircleDone: { backgroundColor: Colors.success, borderColor: Colors.success },
  dayCheck: { color: Colors.white, fontSize: 14, fontWeight: 'bold' },
  dayLabel: { fontSize: 10, fontWeight: '600', color: Colors.textSecondary, marginTop: Spacing.xs, letterSpacing: 0.5 },
  dayCount: { fontSize: 10, color: Colors.textMuted, marginTop: 2 },
  weekSummary: { borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.md },
  weekSummaryText: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: Spacing.sm },
  rankCard: { marginBottom: Spacing.sm },
  rankRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  rankBadge: {
    width: 32, height: 32, borderRadius: 10, backgroundColor: Colors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  rankGold: { backgroundColor: Colors.warning },
  rankSilver: { backgroundColor: '#8E8E9A' },
  rankBronze: { backgroundColor: '#CD7F32' },
  rankNumber: { fontSize: FontSize.sm, fontWeight: 'bold', color: Colors.white },
  rankInfo: { flex: 1 },
  rankName: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  rankPlan: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  rankCount: { fontSize: FontSize.sm, fontWeight: 'bold', color: Colors.primary },
  historyCard: { marginBottom: Spacing.sm },
  historyRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  historyDateBlock: { alignItems: 'center', minWidth: 40 },
  historyDay: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.primary },
  historyMonth: { fontSize: FontSize.xs, color: Colors.textMuted, textTransform: 'uppercase' },
  historyDivider: { width: 1, height: 40, backgroundColor: Colors.border },
  historyInfo: { flex: 1 },
  historyName: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.text },
  historyDuration: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  emptyText: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', paddingVertical: Spacing.lg },
  measCard: { marginBottom: Spacing.sm },
  measHeader: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md, marginBottom: Spacing.sm },
  measDateBlock: { alignItems: 'center', minWidth: 40 },
  measDay: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.primary },
  measMonth: { fontSize: FontSize.xs, color: Colors.textMuted, textTransform: 'uppercase' },
  measValues: { flex: 1 },
  measWeight: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.text },
  measFat: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  measRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, borderTopWidth: 1, borderTopColor: Colors.border, paddingTop: Spacing.sm },
  measDetail: { fontSize: FontSize.xs, color: Colors.textSecondary, backgroundColor: Colors.background, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  addButton: {
    backgroundColor: Colors.primary, marginHorizontal: Spacing.lg, marginTop: Spacing.lg,
    borderRadius: BorderRadius.lg, paddingVertical: Spacing.md, alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  addButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
  bottomSpacer: { height: Spacing.xxl },
});
