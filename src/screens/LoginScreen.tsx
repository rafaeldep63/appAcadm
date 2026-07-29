import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import { Colors, Spacing, BorderRadius, FontSize, Shadow } from '../theme';
import { GradientButton } from '../components/UI';

const { width, height } = Dimensions.get('window');

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Atencao', 'Preencha todos os campos para continuar.');
      return;
    }
    const success = login(email, password);
    if (!success) {
      Alert.alert('Erro', 'Email ou senha incorretos.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.background}>
        <View style={styles.circle1} />
        <View style={styles.circle2} />
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoIcon}>◈</Text>
          </View>
          <Text style={styles.appName}>AcadApp</Text>
          <Text style={styles.tagline}>Gestao Inteligente de Academia</Text>
        </View>

        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Bem-vindo de volta</Text>
          <Text style={styles.formSubtitle}>Entre com suas credenciais para acessar</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>✉</Text>
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                placeholderTextColor={Colors.textMuted}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>SENHA</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.inputIcon}>●</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor={Colors.textMuted}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Text style={styles.eyeIcon}>{showPassword ? '◉' : '◎'}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPassword} onPress={() => Alert.alert('Recuperar Senha', 'Entre em contato com o administrador da academia para redefinir sua senha.')}>
            <Text style={styles.forgotText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          <GradientButton title="Entrar" onPress={handleLogin} icon="→" style={{ marginTop: Spacing.md }} />

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity style={styles.registerButton} onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>Criar nova conta</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.demoHint}>
            <Text style={styles.demoHintTitle}>Contas de demonstracao:</Text>
            <View style={styles.demoHintRow}>
              <View style={styles.demoHintAccount}>
                <Text style={styles.demoHintRole}>Admin</Text>
                <Text style={styles.demoHintText}>admin@academia.com</Text>
                <Text style={styles.demoHintText}>Senha: 123456</Text>
              </View>
              <View style={styles.demoHintDivider} />
              <View style={styles.demoHintAccount}>
                <Text style={styles.demoHintRole}>Aluno</Text>
                <Text style={styles.demoHintText}>joao@email.com</Text>
                <Text style={styles.demoHintText}>Senha: 123456</Text>
              </View>
            </View>
          </View>
          <Text style={styles.footerText}>AcadApp v1.0</Text>
          <Text style={styles.footerText}>Powered by Rafael</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  circle1: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: Colors.primary + '10',
    top: -100,
    right: -80,
  },
  circle2: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: Colors.primary + '08',
    bottom: 100,
    left: -60,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xxl,
  },
  logoContainer: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  logoIcon: {
    fontSize: 32,
    color: Colors.white,
  },
  appName: {
    fontSize: FontSize.hero,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    letterSpacing: 0.5,
  },
  formCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.xxl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formTitle: {
    fontSize: FontSize.xl,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  formSubtitle: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.xl,
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
  },
  inputIcon: {
    fontSize: 16,
    color: Colors.textMuted,
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSize.md,
    color: Colors.text,
  },
  eyeButton: {
    padding: Spacing.sm,
  },
  eyeIcon: {
    fontSize: 16,
    color: Colors.textMuted,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginBottom: Spacing.lg,
    marginTop: Spacing.xs,
  },
  forgotText: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: FontSize.lg,
    fontWeight: 'bold',
  },
  loginButtonArrow: {
    color: Colors.white,
    fontSize: FontSize.lg,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    fontSize: FontSize.sm,
    color: Colors.textMuted,
  },
  registerButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    alignItems: 'center',
  },
  registerText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
    marginTop: Spacing.xxl,
    gap: Spacing.xs,
  },
  demoHint: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.md,
    alignItems: 'center',
    width: '100%',
  },
  demoHintTitle: {
    fontSize: FontSize.xs,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  demoHintRow: {
    flexDirection: 'row',
    width: '100%',
  },
  demoHintAccount: {
    flex: 1,
    alignItems: 'center',
  },
  demoHintDivider: {
    width: 1,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.md,
  },
  demoHintRole: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: Spacing.xs,
  },
  demoHintText: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  footerText: {
    fontSize: FontSize.xs,
    color: Colors.textMuted,
  },
});
