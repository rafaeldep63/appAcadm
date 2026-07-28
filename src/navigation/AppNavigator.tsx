import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { Colors, FontSize } from '../theme';

import HomeScreen from '../screens/HomeScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import ClassesScreen from '../screens/ClassesScreen';
import StudentsScreen from '../screens/StudentsScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', label: 'Inicio', icon: '🏠' },
  { name: 'Treinos', label: 'Treinos', icon: '💪' },
  { name: 'Aulas', label: 'Aulas', icon: '📅' },
  { name: 'Alunos', label: 'Alunos', icon: '👥' },
  { name: 'Progresso', label: 'Progresso', icon: '📊' },
];

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 70,
          paddingBottom: 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: FontSize.xs,
          fontWeight: '500',
        },
        tabBarIcon: ({ focused }) => {
          const tab = tabs.find((t) => t.name === route.name);
          return (
            <Text style={{ fontSize: 22, opacity: focused ? 1 : 0.5 }}>
              {tab?.icon}
            </Text>
          );
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={
            tab.name === 'Home'
              ? HomeScreen
              : tab.name === 'Treinos'
              ? WorkoutsScreen
              : tab.name === 'Aulas'
              ? ClassesScreen
              : tab.name === 'Alunos'
              ? StudentsScreen
              : ProgressScreen
          }
          options={{ tabBarLabel: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
}
