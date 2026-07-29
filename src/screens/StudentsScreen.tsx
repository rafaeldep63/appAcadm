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
import { useData } from '../context/DataContext';
import { Student } from '../data/types';
import { Card, Badge, EmptyState, SectionHeader } from '../components/UI';

export default function StudentsScreen({ navigation }: any) {
  const [search, setSearch] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formPlan, setFormPlan] = useState<'basico' | 'premium' | 'vip'>('basico');
  const { students, addStudent, updateStudent, studentMeasurements } = useData();

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase())
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

  const handleAddStudent = () => {
    if (!formName || !formEmail) {
      Alert.alert('Erro', 'Preencha nome e email.');
      return;
    }
    const newStudent: Student = {
      id: Date.now().toString(),
      name: formName,
      email: formEmail,
      phone: formPhone,
      plan: formPlan,
      planStartDate: new Date().toISOString().split('T')[0],
      planEndDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      status: 'ativo',
    };
    addStudent(newStudent);
    setShowAddForm(false);
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormPlan('basico');
    Alert.alert('Sucesso', 'Aluno cadastrado com sucesso!');
  };

  const toggleStatus = (student: Student) => {
    const newStatus = student.status === 'ativo' ? 'inativo' : 'ativo';
    updateStudent(student.id, { status: newStatus as 'ativo' | 'inativo' | 'pendente' });
  };

  if (showAddForm) {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setShowAddForm(false)}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Novo Aluno</Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.formLabel}>NOME</Text>
          <TextInput style={styles.formInput} value={formName} onChangeText={setFormName} placeholder="Nome completo" placeholderTextColor={Colors.textMuted} />
          <Text style={styles.formLabel}>EMAIL</Text>
          <TextInput style={styles.formInput} value={formEmail} onChangeText={setFormEmail} placeholder="email@provedor.com" placeholderTextColor={Colors.textMuted} keyboardType="email-address" autoCapitalize="none" />
          <Text style={styles.formLabel}>TELEFONE</Text>
          <TextInput style={styles.formInput} value={formPhone} onChangeText={setFormPhone} placeholder="(11) 99999-9999" placeholderTextColor={Colors.textMuted} keyboardType="phone-pad" />
          <Text style={styles.formLabel}>PLANO</Text>
          <View style={styles.planSelector}>
            {(['basico', 'premium', 'vip'] as const).map((plan) => (
              <TouchableOpacity
                key={plan}
                style={[styles.planOption, formPlan === plan && styles.planOptionActive]}
                onPress={() => setFormPlan(plan)}
              >
                <Text style={[styles.planOptionText, formPlan === plan && styles.planOptionTextActive]}>
                  {plan.charAt(0).toUpperCase() + plan.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={handleAddStudent}>
            <Text style={styles.saveButtonText}>Cadastrar Aluno</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

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
          <Text style={styles.infoSectionTitle}>Informacoes</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>✉</Text>
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{selectedStudent.email}</Text>
            </View>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>☏</Text>
            <View>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>{selectedStudent.phone || 'Nao informado'}</Text>
            </View>
          </View>
        </Card>
        <Card style={styles.infoCard}>
          <Text style={styles.infoSectionTitle}>Plano</Text>
          <View style={styles.planRow}>
            <View style={styles.planBox}>
              <Text style={styles.planLabel}>Tipo</Text>
              <Text style={[styles.planValue, { color: plan.color }]}>{plan.label}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planBox}>
              <Text style={styles.planLabel}>Inicio</Text>
              <Text style={styles.planValue}>{selectedStudent.planStartDate}</Text>
            </View>
            <View style={styles.planDivider} />
            <View style={styles.planBox}>
              <Text style={styles.planLabel}>Vencimento</Text>
              <Text style={styles.planValue}>{selectedStudent.planEndDate}</Text>
            </View>
</View>
        </Card>

        <SectionHeader title="Medidas" />
        {(() => {
          const meas = studentMeasurements[selectedStudent.id] || [];
          return meas.length === 0 ? (
            <Card style={styles.measCard}>
              <Text style={styles.measEmpty}>Nenhuma medida registrada</Text>
            </Card>
          ) : (
            meas.slice(0, 3).map((m) => (
              <Card key={m.id} style={styles.measCard}>
                <View style={styles.measRow}>
                  <Text style={styles.measDate}>{m.date}</Text>
                  <Text style={styles.measWeight}>{m.weight}kg</Text>
                </View>
                <View style={styles.measTags}>
                  {m.bodyFat && <Text style={styles.measTag}>Gordura: {m.bodyFat}%</Text>}
                  {m.chest && <Text style={styles.measTag}>Peito: {m.chest}cm</Text>}
                  {m.waist && <Text style={styles.measTag}>Cintura: {m.waist}cm</Text>}
                  {m.arms && <Text style={styles.measTag}>Braco: {m.arms}cm</Text>}
                  {m.thighs && <Text style={styles.measTag}>Coxa: {m.thighs}cm</Text>}
                </View>
              </Card>
            ))
          );
        })()}

        <View style={styles.actionsGrid}>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.primary + '15' }]} activeOpacity={0.7}>
            <Text style={[styles.actionIcon, { color: Colors.primary }]}>✎</Text>
            <Text style={[styles.actionLabel, { color: Colors.primary }]}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.success + '15' }]} activeOpacity={0.7} onPress={() => navigation?.navigate('Treinos')}>
            <Text style={[styles.actionIcon, { color: Colors.success }]}>◈</Text>
            <Text style={[styles.actionLabel, { color: Colors.success }]}>Treinos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionCard, { backgroundColor: Colors.info + '15' }]} activeOpacity={0.7}>
            <Text style={[styles.actionIcon, { color: Colors.info }]}>◆</Text>
            <Text style={[styles.actionLabel, { color: Colors.info }]}>Progresso</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionCard, { backgroundColor: selectedStudent.status === 'ativo' ? Colors.dangerBg : Colors.successBg }]}
            activeOpacity={0.7}
            onPress={() => {
              Alert.alert(
                selectedStudent.status === 'ativo' ? 'Desativar Aluno' : 'Ativar Aluno',
                `Tem certeza?`,
                [{ text: 'Cancelar', style: 'cancel' }, { text: 'Confirmar', onPress: () => toggleStatus(selectedStudent) }]
              );
            }}
          >
            <Text style={[styles.actionIcon, { color: selectedStudent.status === 'ativo' ? Colors.danger : Colors.success }]}>
              {selectedStudent.status === 'ativo' ? '✕' : '✓'}
            </Text>
            <Text style={[styles.actionLabel, { color: selectedStudent.status === 'ativo' ? Colors.danger : Colors.success }]}>
              {selectedStudent.status === 'ativo' ? 'Desativar' : 'Ativar'}
            </Text>
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
        <Text style={styles.subtitle}>{students.length} cadastrados</Text>
      </View>
      <View style={styles.searchRow}>
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
          <EmptyState icon="◉" title="Nenhum aluno encontrado" description="Tente outro termo ou cadastre um novo aluno" />
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
      <TouchableOpacity style={styles.fab} activeOpacity={0.8} onPress={() => setShowAddForm(true)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: Spacing.lg, paddingTop: Spacing.xxl, paddingBottom: Spacing.sm },
  title: { fontSize: FontSize.title, fontWeight: 'bold', color: Colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: FontSize.sm, color: Colors.textSecondary, marginTop: Spacing.xs },
  searchRow: { paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md },
  searchBox: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md,
  },
  searchIcon: { fontSize: 18, color: Colors.textMuted, marginRight: Spacing.sm },
  searchInput: { flex: 1, paddingVertical: Spacing.md, fontSize: FontSize.md, color: Colors.text },
  list: { flex: 1, paddingHorizontal: Spacing.lg },
  studentCard: { marginBottom: Spacing.sm },
  studentRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  studentAvatar: { width: 48, height: 48, borderRadius: 14, justifyContent: 'center', alignItems: 'center' },
  studentAvatarText: { fontSize: FontSize.xl, fontWeight: 'bold' },
  studentInfo: { flex: 1 },
  studentNameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  studentName: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text, flex: 1 },
  studentEmail: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  studentMeta: { flexDirection: 'row', alignItems: 'center', marginTop: Spacing.xs, gap: Spacing.sm },
  studentPhone: { fontSize: FontSize.xs, color: Colors.textSecondary },
  backButton: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  backIcon: { fontSize: 24, color: Colors.text },
  detailHeader: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl, paddingBottom: Spacing.md, gap: Spacing.md,
  },
  detailTitle: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text },
  profileSection: { alignItems: 'center', paddingVertical: Spacing.xl, gap: Spacing.sm },
  profileAvatar: {
    width: 80, height: 80, borderRadius: 24, backgroundColor: Colors.primary + '20',
    justifyContent: 'center', alignItems: 'center',
  },
  profileAvatarText: { fontSize: 32, fontWeight: 'bold', color: Colors.primary },
  profileName: { fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text },
  infoCard: { marginHorizontal: Spacing.lg, marginBottom: Spacing.md },
  infoSectionTitle: { fontSize: FontSize.sm, fontWeight: '600', color: Colors.textMuted, textTransform: 'uppercase', letterSpacing: 1, marginBottom: Spacing.md },
  infoRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: Spacing.sm, gap: Spacing.md },
  infoIcon: { fontSize: 16, color: Colors.textMuted, width: 24, textAlign: 'center' },
  infoLabel: { fontSize: FontSize.xs, color: Colors.textMuted },
  infoValue: { fontSize: FontSize.md, color: Colors.text, fontWeight: '500' },
  planRow: { flexDirection: 'row' },
  planBox: { flex: 1, alignItems: 'center' },
  planLabel: { fontSize: FontSize.xs, color: Colors.textMuted, marginBottom: 4 },
  planValue: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  planDivider: { width: 1, height: 30, backgroundColor: Colors.border },
  actionsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: Spacing.lg, gap: Spacing.sm },
  actionCard: {
    width: '48%', flexGrow: 1, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', gap: Spacing.sm,
  },
  actionIcon: { fontSize: 24 },
  actionLabel: { fontSize: FontSize.sm, fontWeight: '600' },
  measEmpty: { fontSize: FontSize.sm, color: Colors.textMuted, textAlign: 'center', paddingVertical: Spacing.md },
  measCard: { marginBottom: Spacing.sm, paddingHorizontal: Spacing.lg },
  measRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  measDate: { fontSize: FontSize.xs, color: Colors.textMuted },
  measWeight: { fontSize: FontSize.md, fontWeight: 'bold', color: Colors.primary },
  measTags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.xs, marginTop: Spacing.sm },
  measTag: { fontSize: FontSize.xs, color: Colors.textSecondary, backgroundColor: Colors.background, paddingHorizontal: Spacing.sm, paddingVertical: 2, borderRadius: 4, overflow: 'hidden' },
  fab: {
    position: 'absolute', bottom: Spacing.xl, right: Spacing.xl,
    width: 56, height: 56, borderRadius: 16, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 12, elevation: 8,
  },
  fabIcon: { color: Colors.white, fontSize: 28, fontWeight: '300' },
  formContainer: { padding: Spacing.lg, gap: Spacing.sm },
  formLabel: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.textMuted, letterSpacing: 1, textTransform: 'uppercase' },
  formInput: {
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md, fontSize: FontSize.md, color: Colors.text, marginBottom: Spacing.md,
  },
  planSelector: { flexDirection: 'row', gap: Spacing.sm, marginBottom: Spacing.lg },
  planOption: {
    flex: 1, paddingVertical: Spacing.md, borderRadius: BorderRadius.md, borderWidth: 1, borderColor: Colors.border,
    alignItems: 'center', backgroundColor: Colors.surface,
  },
  planOptionActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  planOptionText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  planOptionTextActive: { color: Colors.white },
  saveButton: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.md, paddingVertical: Spacing.md,
    alignItems: 'center', marginTop: Spacing.md,
  },
  saveButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
  bottomSpacer: { height: Spacing.xxl },
});
