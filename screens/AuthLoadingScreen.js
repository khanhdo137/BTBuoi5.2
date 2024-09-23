import React, { useContext, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../api/AuthContext';

const AuthLoadingScreen = ({ navigation }) => {
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!loading) {
      navigation.replace(user ? 'HomeScreen' : 'Login');
    }
  }, [loading, user, navigation]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default AuthLoadingScreen;
