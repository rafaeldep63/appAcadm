import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize } from '../theme';
import { mockStudents } from '../data/mockData';
import { Student } from '../data/types';
import { Card, Badge, EmptyState } from '../components/UI';

export default function StudentsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase())
  );

  const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
    ativo: { color: Colors.success, bg: Colors.successBg, label: 'ATIVO' },
    inativo: { color: Colors.danger, bg: Colors.dangerBg, label: 'INATIVO' },
    pendente: { color: Colors.warning, bg: Colors.warningBg, label: 'PENDENTE' },
  };

  const planConfig: Record<string, { label: string; color: string }> = {
    basico: { label: 'Basico', color: Colors.textSecondary },
    premium: { label: 'Premium', color: Colors.primary },
    vip: { label: 'VIP', color: Colors.warning },
  };

  if (selectedStudent) {
    const status = statusConfig[selectedStudent.status];
    const plan = planConfig[selectedStudent.plan];

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.detailHeader}>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedStudent(null)}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.detailTitle}>Perfil do Aluno</Text>
        </View>

        <View style={styles.profileSection}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarText}>{selectedStudent.name.charAt(0)}</Text>
          </View>
          <Text style={styles.profileName}>{selectedStudent.name}</Text>
          <Badge text={status.label} color={status.color} bgColor={status.bg} size="md" />
        </View>

        <Card style={styles.infoCard}>
          <Text style={styles.infoSectionTitle}>Informacoes Pessoais</Text>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>✉</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{selectedStudent.email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.infoIconContainer}>
              <Text style={styles.infoIcon}>☏</Text>
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{selectedStudent.phone}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.infoCard}>
          <Text style={styles.infoSectionTitle}>Plano</Text>
          <View style={styles.planRow}>
            <View style={styles.planItem}>
              <Text style={styles.planLabel}>Tipo</Text>
              <Text style={[styles.planValue, { color: Colors.primary }]}>{plan.label}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planItem}>
              <Text style={styles.planLabel}>Inicio</Text>
              <Text style={styles.planValue}>{selectedStudent.planStartDate}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planItem}>
              <Text style={styles.planLabel}>Vencimento</Text>
              <Text style={styles.planValue}>{selectedStudent.planEndDate}</Text>
            </View>
          </View>
        </Card>

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.primary + '15' }]} activeOpacity={0.7}>
            <Text style={[styles.actionIcon, { color: Colors.primary }]}>✎</Text>
            <Text style={[styles.actionLabel, { color: Colors.primary }]}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.success + '15' }]} activeOpacity={0.7} onPress={() => navigation?.navigate('Treinos')}>
            <Text style={[styles.actionIcon, { color: Colors.success }]}>◈</Text>
            <Text style={[styles.actionLabel, { color: Colors.success }]}>Treino</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.info + '15' }]} activeOpacity={0.7}>
            <Text style={[styles.actionIcon, { color: Colors.info }]}>◆</Text>
            <Text style={[styles.actionLabel, { color: Colors.info }]}>Progresso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: Colors.dangerBg }]}
            activeOpacity={0.7}
            onPress={() => Alert.alert('Confirmar', 'Desativar aluno?', [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Desativar', style: 'destructive' },
            ])}
          >
            <Text style={[styles.actionIcon, { color: Colors.danger }]}>✕</Text>
            <Text style={[styles.actionLabel, { color: Colors.danger }]}>Desativar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Alunos</Text>
        <Text style={styles.subtitle}>{mockStudents.length} cadastrados</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>⌕</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por nome ou email..."
            placeholderTextColor={Colors.textMuted}
            value={search}
            onChangeText={setSearch}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.list}>
        {filteredStudents.length === 0 ? (
          <EmptyState icon="◉" title="Nenhum aluno encontrado" description="Tente outro termo de busca" />
        ) : (
          filteredStudents.map((student) => {
            const status = statusConfig[student.status];
            const plan = planConfig[student.plan];
            return (
              <TouchableOpacity key={student.id} activeOpacity={0.7} onPress={() => setSelectedStudent(student)}>
                <Card style={styles.studentCard}>
                  <View style={styles.studentRow}>
                    <View style={[styles.studentAvatar, { backgroundColor: status.color + '20' }]}>
                      <Text style={[styles.studentAvatarText, { color: status.color }]}>{student.name.charAt(0)}</Text>
                    </View>
                    <View style={styles.studentInfo}>
                      <View style={styles.studentNameRow}>
                        <Text style={styles.studentName}>{student.name}</Text>
                        <Badge text={status.label} color={status.color} bgColor={status.bg} />
                      </View>
                      <Text style={styles.studentEmail}>{student.email}</Text>
                      <View style={styles.studentMeta}>
                        <Badge text={plan.label} color={plan.color} bgColor={plan.color + '15'} />
                        <Text style={styles.studentPhone}>{student.phone}</Text>
                      </View>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.8}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
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
  searchContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  searchIcon: {
    fontSize: 18,
    color: Colors.textMuted,
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  list: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  studentCard: {
    marginBottom: Spacing.sm,
  },
  studentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  studentAvatar: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  studentAvatarText: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
  },
  studentInfo: {
    flex: 1,
  },
  studentNameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  studentName: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
    flex: 1,
  },
  studentEmail: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  studentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
    gap: Spacing.sm,
  },
  studentPhone: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl,
    paddingBottom: Spacing.md,
    gap: Spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  backIcon: {
    fontSize: 24,
    color: Colors.text,
  },
  detailTitle: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  profileAvatar: {
    width: 80,
    height: 80,
    borderRadius: 24,
    backgroundColor: Colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileAvatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  profileName: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  infoCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  infoSectionTitle: {
    fontSize: FontSize.sm,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  infoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoIcon: {
    fontSize: 14,
    color: Colors.textMuted,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
  infoValue: {
    fontSize: FontSize.md,
    color: Colors.text,
    fontWeight: '500',
  },
  planRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  planItem: {
    flex: 1,
    alignItems: 'center',
  },
  planLabel: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
    marginBottom: 4,
  },
  planValue: {
    fontSize: FontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  planDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.border,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  actionCard: {
    width: '48%',
    flexGrow: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    gap: Spacing.sm,
  },
  actionIcon: {
    fontSize: 24,
  },
  actionLabel: {
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.xl,
    right: Spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabIcon: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '300',
  },
  bottomSpacer: {
    height: Spacing.xxl,
  },
});
