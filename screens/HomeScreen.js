import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { AuthContext } from '../api/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const HomeScreen = ({ navigation }) => {
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    navigation.setOptions({ title: 'Màn Hình Chính' });
  }, [navigation]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Điều hướng về màn hình đăng nhập hoặc xử lý logic sau khi đăng xuất
    } catch (error) {
      Alert.alert('Đăng xuất thất bại', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Chào mừng, {user?.email}!</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#FF8C00', // Màu cam
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '60%',
    shadowColor: '#FF8C00', // Màu cam
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
