import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '../../api/AuthContext'; 
import SignupScreen from '../../screens/SignupScreen';
import LoginScreen from '../../screens/LoginScreen';
import HomeScreen from '../../screens/HomeScreen';
import AuthLoadingScreen from '../../screens/AuthLoadingScreen';
import ProtectedRoute from '../../screens/ProtectedRoute';
import ChangPasswordScreen from '../../screens/ChangePasswordScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="AuthLoading">
          <Stack.Screen 
            name="AuthLoading" 
            component={AuthLoadingScreen} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
          />
          <Stack.Screen 
            name="SignupScreen" 
            component={SignupScreen} 
          />
          <Stack.Screen 
            name="ChangePasswordScreen" 
            component={ChangPasswordScreen} 
          />
          <Stack.Screen 
            name="HomeScreen" 
            options={{ headerShown: true }}
          >
            {({ navigation }) => (
              <ProtectedRoute navigation={navigation}>
                <HomeScreen navigation={navigation} />
              </ProtectedRoute>
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
