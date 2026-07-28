import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { WorkoutProvider } from './src/context/WorkoutContext';
import AppNavigator from './src/navigation/AppNavigator';
import StudentNavigator from './src/navigation/StudentNavigator';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createNativeStackNavigator();

function RootNavigator() {
  const { user, isAdmin, isAluno } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : isAdmin ? (
        <Stack.Screen name="Admin" component={AppNavigator} />
      ) : (
        <Stack.Screen name="Student" component={StudentNavigator} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WorkoutProvider>
        <NavigationContainer>
          <StatusBar style="light" />
          <RootNavigator />
        </NavigationContainer>
      </WorkoutProvider>
    </AuthProvider>
  );
}
