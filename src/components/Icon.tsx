import React from 'react';
import { Text, TextStyle } from 'react-native';

interface IconProps {
  name: string;
  size?: number;
  color?: string;
  style?: TextStyle;
}

const icons: Record<string, string> = {
  home: '⬡',
  homeFilled: '⬢',
  workout: '◈',
  calendar: '◎',
  people: '◉',
  chart: '◆',
  search: '⌕',
  back: '‹',
  forward: '›',
  plus: '+',
  check: '✓',
  close: '✕',
  star: '★',
  heart: '♥',
  bell: '♪',
  settings: '⚙',
  user: '●',
  clock: '◷',
  trophy: '♛',
  flame: '♦',
  muscle: '💪',
  dumbbell: '🏋',
  timer: '◷',
  weight: '⚖',
  arrow_up: '↑',
  arrow_down: '↓',
  menu: '≡',
  edit: '✎',
  trash: '✕',
  filter: '⊕',
  pin: '⊙',
  location: '◎',
  phone: '☏',
  email: '✉',
  lock: '●',
  eye: '◉',
  logout: '→',
  fire: '♦',
  bolt: '⚡',
  target: '◎',
  trophy_gold: '♛',
  calendar_check: '✓',
  user_plus: '+',
  trending: '↗',
  bar_chart: '▥',
  pie_chart: '◕',
  dash: '—',
  dot: '•',
};

export default function Icon({ name, size = 16, color = '#FFFFFF', style }: IconProps) {
  const iconChar = icons[name] || '●';
  return (
    <Text
      style={[
        {
          fontSize: size,
          color,
          lineHeight: size + 4,
        },
        style,
      ]}
    >
      {iconChar}
    </Text>
  );
}
