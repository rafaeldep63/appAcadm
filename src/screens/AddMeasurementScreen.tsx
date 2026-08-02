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
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/UI';

interface Props {
  onBack: () => void;
}

export default function AddMeasurementScreen({ onBack }: Props) {
  const [weight, setWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [chest, setChest] = useState('');
  const [waist, setWaist] = useState('');
  const [arms, setArms] = useState('');
  const [thighs, setThighs] = useState('');
  const [notes, setNotes] = useState('');
  const { addMeasurement, students } = useData();
  const { currentUser: user, isAdmin } = useAuth();
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');

  const handleSave = () => {
    if (!weight) {
      Alert.alert('Erro', 'Preencha pelo menos o peso.');
      return;
    }
    addMeasurement(isAdmin ? selectedStudentId || 'anonymous' : user?.id || 'anonymous', {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      weight: parseFloat(weight),
      bodyFat: bodyFat ? parseFloat(bodyFat) : undefined,
      chest: chest ? parseFloat(chest) : undefined,
      waist: waist ? parseFloat(waist) : undefined,
      arms: arms ? parseFloat(arms) : undefined,
      thighs: thighs ? parseFloat(thighs) : undefined,
      notes: notes || undefined,
    });
    Alert.alert('Sucesso', 'Medidas registradas com sucesso!', [
      { text: 'OK', onPress: onBack },
    ]);
  };

  const fields = [
    { label: 'Peso', value: weight, setter: setWeight, unit: 'kg', icon: '⚖', required: true },
    { label: 'Gordura Corporal', value: bodyFat, setter: setBodyFat, unit: '%', icon: '◆' },
    { label: 'Peito', value: chest, setter: setChest, unit: 'cm', icon: '◈' },
    { label: 'Cintura', value: waist, setter: setWaist, unit: 'cm', icon: '◎' },
    { label: 'Bracos', value: arms, setter: setArms, unit: 'cm', icon: '♦' },
    { label: 'Coxas', value: thighs, setter: setThighs, unit: 'cm', icon: '●' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Novas Medidas</Text>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveText}>Salvar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.content}>
        <Card style={styles.userCard}>
          <View style={styles.userRow}>
            <View style={styles.userAvatar}>
              <Text style={styles.userAvatarText}>
                {isAdmin ? (students.find((s) => s.id === selectedStudentId)?.name?.charAt(0) || '?') : (user?.name?.charAt(0) || '?')}
              </Text>
            </View>
            <View>
              <Text style={styles.userName}>
                {isAdmin ? (students.find((s) => s.id === selectedStudentId)?.name || 'Selecione um aluno') : (user?.name || 'Usuario')}
              </Text>
              <Text style={styles.userDate}>{new Date().toLocaleDateString('pt-BR')}</Text>
            </View>
          </View>
        </Card>

        {isAdmin && (
          <Card style={styles.userCard}>
            <Text style={styles.notesLabel}>ALUNO</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.studentRow}>
              {students.map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[styles.studentChip, selectedStudentId === s.id && styles.studentChipActive]}
                  onPress={() => setSelectedStudentId(s.id)}
                >
                  <Text style={[styles.studentChipText, selectedStudentId === s.id && styles.studentChipTextActive]}>
                    {s.name.split(' ')[0]}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Card>
        )}
        <View style={styles.fieldsGrid}>
          {fields.map((field, index) => (
            <Card key={index} style={styles.fieldCard}>
              <View style={styles.fieldHeader}>
                <View style={styles.fieldIconContainer}>
                  <Text style={styles.fieldIcon}>{field.icon}</Text>
                </View>
                <View style={styles.fieldLabelContainer}>
                  <Text style={styles.fieldLabel}>{field.label}</Text>
                  {field.required && <Text style={styles.requiredDot}>*</Text>}
                </View>
              </View>
              <View style={styles.fieldInputContainer}>
                <TextInput
                  style={styles.fieldInput}
                  placeholder="0"
                  placeholderTextColor={Colors.textMuted}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType="numeric"
                />
                <Text style={styles.fieldUnit}>{field.unit}</Text>
              </View>
            </Card>
          ))}
        </View>

        <Card style={styles.notesCard}>
          <Text style={styles.notesLabel}>OBSERVACOES</Text>
          <TextInput
            style={styles.notesInput}
            placeholder="Ex: Treinei mais pesado hoje, me senti forte..."
            placeholderTextColor={Colors.textMuted}
            value={notes}
            onChangeText={setNotes}
            multiline
            numberOfLines={3}
          />
        </Card>

        <TouchableOpacity style={styles.saveButtonLarge} onPress={handleSave} activeOpacity={0.8}>
          <Text style={styles.saveButtonText}>Registrar Medidas</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xxl, paddingBottom: Spacing.md, gap: Spacing.md,
  },
  backButton: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: Colors.surface,
    justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: Colors.border,
  },
  backIcon: { fontSize: 24, color: Colors.text },
  headerTitle: { flex: 1, fontSize: FontSize.xl, fontWeight: 'bold', color: Colors.text },
  saveButton: {
    backgroundColor: Colors.primary, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm, borderRadius: BorderRadius.sm,
  },
  saveText: { color: Colors.white, fontSize: FontSize.sm, fontWeight: '600' },
  content: { flex: 1, paddingHorizontal: Spacing.lg },
  dateSection: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: Colors.surface, borderRadius: BorderRadius.md, padding: Spacing.md,
    marginBottom: Spacing.lg, borderWidth: 1, borderColor: Colors.border,
  },
  dateLabel: { fontSize: FontSize.xs, color: Colors.textMuted, letterSpacing: 1 },
  dateValue: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  fieldsGrid: { gap: Spacing.sm },
  fieldCard: { marginBottom: 0 },
  fieldHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, gap: Spacing.sm },
  fieldIconContainer: {
    width: 28, height: 28, borderRadius: 8, backgroundColor: Colors.background,
    justifyContent: 'center', alignItems: 'center',
  },
  fieldIcon: { fontSize: 12, color: Colors.textMuted },
  fieldLabelContainer: { flexDirection: 'row', alignItems: 'center' },
  fieldLabel: { fontSize: FontSize.sm, fontWeight: '500', color: Colors.textSecondary },
  requiredDot: { fontSize: FontSize.xs, color: Colors.danger, marginLeft: 4 },
  fieldInputContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background,
    borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.border, paddingHorizontal: Spacing.md,
  },
  fieldInput: { flex: 1, paddingVertical: Spacing.md, fontSize: FontSize.lg, fontWeight: '600', color: Colors.text },
  fieldUnit: { fontSize: FontSize.sm, color: Colors.textMuted },
  notesCard: { marginTop: Spacing.md },
  notesLabel: { fontSize: FontSize.xs, fontWeight: '600', color: Colors.textMuted, letterSpacing: 1, marginBottom: Spacing.sm },
  notesInput: {
    backgroundColor: Colors.background, borderRadius: BorderRadius.sm, borderWidth: 1, borderColor: Colors.border,
    padding: Spacing.md, fontSize: FontSize.sm, color: Colors.text, minHeight: 80, textAlignVertical: 'top',
  },
  userCard: { marginBottom: Spacing.md },
  studentRow: { flexDirection: 'row', gap: Spacing.sm },
  studentChip: {
    paddingHorizontal: Spacing.md, paddingVertical: Spacing.sm, borderRadius: BorderRadius.sm,
    backgroundColor: Colors.background, borderWidth: 1, borderColor: Colors.border,
  },
  studentChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  studentChipText: { fontSize: FontSize.sm, color: Colors.textSecondary, fontWeight: '500' },
  studentChipTextActive: { color: Colors.white },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  userAvatar: {
    width: 44, height: 44, borderRadius: 12, backgroundColor: Colors.primary,
    justifyContent: 'center', alignItems: 'center',
  },
  userAvatarText: { fontSize: FontSize.lg, fontWeight: 'bold', color: Colors.white },
  userName: { fontSize: FontSize.md, fontWeight: '600', color: Colors.text },
  userDate: { fontSize: FontSize.xs, color: Colors.textMuted, marginTop: 2 },
  saveButtonLarge: {
    backgroundColor: Colors.primary, borderRadius: BorderRadius.lg, paddingVertical: Spacing.md,
    alignItems: 'center', marginTop: Spacing.xl,
    shadowColor: Colors.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  saveButtonText: { color: Colors.white, fontSize: FontSize.md, fontWeight: '600' },
  bottomSpacer: { height: Spacing.xxl },
});
