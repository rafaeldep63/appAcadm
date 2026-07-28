import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, FontSize, BorderRadius } from '../theme';

import StudentHomeScreen from '../screens/StudentHomeScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import ClassesScreen from '../screens/ClassesScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', label: 'Inicio', icon: '⬡', iconActive: '⬢' },
  { name: 'Treinos', label: 'Treinos', icon: '◈', iconActive: '◈' },
  { name: 'Aulas', label: 'Aulas', icon: '◎', iconActive: '◎' },
  { name: 'Progresso', label: 'Progresso', icon: '◆', iconActive: '◆' },
];

const screens: Record<string, any> = {
  Home: StudentHomeScreen,
  Treinos: WorkoutsScreen,
  Aulas: ClassesScreen,
  Progresso: ProgressScreen,
};

export default function StudentNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: styles.tabLabel,
        tabBarIcon: ({ focused }) => {
          const tab = tabs.find((t) => t.name === route.name);
          const icon = focused ? tab?.iconActive : tab?.icon;
          return (
            <View style={[styles.tabIconContainer, focused && styles.tabIconActive]}>
              <Text style={[styles.tabIcon, focused && styles.tabIconActiveText]}>
                {icon}
              </Text>
            </View>
          );
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={screens[tab.name]}
          options={{ tabBarLabel: tab.label }}
        />
      ))}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.surface,
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    height: 75,
    paddingBottom: 12,
    paddingTop: 8,
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  tabLabel: {
    fontSize: FontSize.xs,
    fontWeight: '500',
    marginTop: 2,
  },
  tabIconContainer: {
    width: 36,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconActive: {
    backgroundColor: Colors.primary + '20',
  },
  tabIcon: {
    fontSize: 18,
    opacity: 0.5,
  },
  tabIconActiveText: {
    fontSize: 18,
    opacity: 1,
  },
});
