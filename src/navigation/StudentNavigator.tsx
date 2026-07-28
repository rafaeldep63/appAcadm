import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet } from 'react-native';
import { Colors, FontSize, BorderRadius } from '../theme';
import { useWorkouts } from '../context/WorkoutContext';
import { Workout } from '../data/types';

import StudentHomeScreen from '../screens/StudentHomeScreen';
import WorkoutsScreen from '../screens/WorkoutsScreen';
import WorkoutCalendarScreen from '../screens/WorkoutCalendarScreen';
import ProgressScreen from '../screens/ProgressScreen';
import WorkoutExecutionScreen from '../screens/WorkoutExecutionScreen';
import AddMeasurementScreen from '../screens/AddMeasurementScreen';

const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', label: 'Inicio', icon: '⬡', iconActive: '⬢' },
  { name: 'Treinos', label: 'Treinos', icon: '◈', iconActive: '◈' },
  { name: 'Calendario', label: 'Calendario', icon: '◎', iconActive: '◎' },
  { name: 'Progresso', label: 'Progresso', icon: '◆', iconActive: '◆' },
];

function TabNavigator({ customNavigation }: any) {
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
              <Text style={[styles.tabIcon, focused && styles.tabIconActiveText]}>{icon}</Text>
            </View>
          );
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} options={{ tabBarLabel: tab.label }}>
          {(props) => {
            if (tab.name === 'Home') return <StudentHomeScreen {...props} customNavigation={customNavigation} />;
            if (tab.name === 'Treinos') return <WorkoutsScreen {...props} customNavigation={customNavigation} />;
            if (tab.name === 'Calendario') return <WorkoutCalendarScreen {...props} />;
            if (tab.name === 'Progresso') return <ProgressScreen {...props} customNavigation={customNavigation} />;
            return null;
          }}
        </Tab.Screen>
      ))}
    </Tab.Navigator>
  );
}

export default function StudentNavigator() {
  const [screen, setScreen] = useState<string>('tabs');
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const { workouts } = useWorkouts();

  const goBack = () => setScreen('tabs');

  if (screen === 'workoutExecution' && selectedWorkout) {
    return (
      <WorkoutExecutionScreen
        workout={selectedWorkout}
        onFinish={() => {
          setSelectedWorkout(null);
          goBack();
        }}
      />
    );
  }

  if (screen === 'addMeasurement') {
    return <AddMeasurementScreen onBack={goBack} />;
  }

  return (
    <TabNavigator
      customNavigation={{
        navigate: (name: string, params?: any) => {
          if (name === 'WorkoutExecution') {
            setSelectedWorkout(params?.workout || workouts[0]);
            setScreen('workoutExecution');
          } else if (name === 'AddMeasurement') {
            setScreen('addMeasurement');
          }
        },
      }}
    />
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
