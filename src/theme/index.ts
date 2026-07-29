export const Colors = {
  primary: '#6C63FF',
  primaryDark: '#5A52D5',
  primaryLight: '#9D99FF',
  primaryGlow: 'rgba(108, 99, 255, 0.25)',
  secondary: '#1E1E2E',
  background: '#0F0F1A',
  surface: '#1A1A2E',
  surfaceLight: '#222244',
  card: '#1E1E35',
  text: '#FFFFFF',
  textSecondary: '#A0A0C0',
  textMuted: '#6A6A8A',
  border: '#2A2A50',
  borderLight: '#3A3A60',
  success: '#00D9A6',
  successBg: 'rgba(0, 217, 166, 0.12)',
  successGlow: 'rgba(0, 217, 166, 0.2)',
  warning: '#FFB800',
  warningBg: 'rgba(255, 184, 0, 0.12)',
  warningGlow: 'rgba(255, 184, 0, 0.2)',
  danger: '#FF4D6A',
  dangerBg: 'rgba(255, 77, 106, 0.12)',
  info: '#4DA6FF',
  infoBg: 'rgba(77, 166, 255, 0.12)',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0, 0, 0, 0.6)',
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',
};

export const Spacing = {
  xxs: 4,
  xs: 6,
  sm: 10,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 24,
  title: 32,
  hero: 40,
};

export const Shadow = {
  sm: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  md: {
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },
  lg: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  glow: {
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
};