import React from 'react';
import { View, Text, StyleSheet, ViewStyle, StyleProp, TouchableOpacity } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, Shadow } from '../theme';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  marginBottom?: number;
  highlight?: boolean;
}

export function Card({ children, style, padding = Spacing.md, marginBottom = Spacing.sm, highlight }: CardProps) {
  return (
    <View style={[
      styles.card,
      highlight && styles.cardHighlight,
      { padding, marginBottom },
      Shadow.sm,
      style,
    ]}>
      {children}
    </View>
  );
}

interface BadgeProps {
  text: string;
  color?: string;
  bgColor?: string;
  size?: 'sm' | 'md';
}

export function Badge({ text, color = Colors.white, bgColor = Colors.primary, size = 'sm' }: BadgeProps) {
  return (
    <View style={[styles.badge, { backgroundColor: bgColor }, size === 'md' && styles.badgeMd]}>
      <Text style={[styles.badgeText, { color }, size === 'md' && styles.badgeTextMd]}>{text}</Text>
    </View>
  );
}

interface StatCardProps {
  icon: string;
  value: string;
  label: string;
  color: string;
  trend?: string;
}

export function StatCard({ icon, value, label, color, trend }: StatCardProps) {
  return (
    <View style={[styles.statCard, { borderLeftColor: color }, Shadow.sm]}>
      <View style={[styles.statIconContainer, { backgroundColor: color + '20' }]}>
        <Text style={[styles.statIcon, { color }]}>{icon}</Text>
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      {trend && (
        <Text style={[styles.statTrend, { color: Colors.textMuted }]}>{trend}</Text>
      )}
    </View>
  );
}

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export function EmptyState({ icon, title, description }: EmptyStateProps) {
  return (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <Text style={styles.emptyIcon}>{icon}</Text>
      </View>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyDesc}>{description}</Text>
    </View>
  );
}

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.6}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

interface ProgressBarProps {
  progress: number;
  color?: string;
  height?: number;
}

export function ProgressBar({ progress, color = Colors.primary, height = 6 }: ProgressBarProps) {
  return (
    <View style={[styles.progressTrack, { height }]}>
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.min(progress, 100)}%`,
            backgroundColor: color,
            height,
          },
        ]}
      />
    </View>
  );
}

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  icon?: string;
}

export function GradientButton({ title, onPress, style, disabled, icon }: GradientButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.gradientButton, disabled && styles.gradientButtonDisabled, Shadow.lg, style]}
      onPress={onPress}
      activeOpacity={0.85}
      disabled={disabled}
    >
      {icon && <Text style={styles.gradientButtonIcon}>{icon}</Text>}
      <Text style={styles.gradientButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHighlight: {
    borderColor: Colors.primary + '40',
    backgroundColor: Colors.surfaceLight,
  },
  badge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: BorderRadius.full,
    alignSelf: 'flex-start',
  },
  badgeMd: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  badgeTextMd: {
    fontSize: FontSize.sm,
  },
  statCard: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  statIcon: {
    fontSize: 18,
  },
  statValue: {
    fontSize: FontSize.xxl,
    fontWeight: 'bold',
    color: Colors.text,
  },
  statLabel: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginTop: 2,
    letterSpacing: 0.3,
  },
  statTrend: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    marginTop: Spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Spacing.xxl,
  },
  emptyIconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surfaceLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emptyIcon: {
    fontSize: 32,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
  },
  emptyDesc: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: 'bold',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  sectionAction: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: '600',
  },
  progressTrack: {
    width: '100%',
    backgroundColor: Colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    borderRadius: 3,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.md,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  gradientButtonDisabled: {
    opacity: 0.5,
  },
  gradientButtonIcon: {
    fontSize: FontSize.lg,
    color: Colors.white,
  },
  gradientButtonText: {
    color: Colors.white,
    fontSize: FontSize.md,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});