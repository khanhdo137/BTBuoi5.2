import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../api/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ 
            headerShown: false, // Ẩn header
            tabBarStyle: { display: 'none' }
        });
        
        return () => {
            navigation.setOptions({ tabBarStyle: { display: 'flex' } }); // Hiện lại tab bar khi rời khỏi màn hình đăng nhập
        };
    }, [navigation]);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Thông báo', 'Vui lòng điền email và password.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Thông báo', 'Email không hợp lệ. Vui lòng nhập đúng định dạng.');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        }

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            navigation.replace('HomeScreen'); 
        } catch (error) {
            switch (error.code) {
                case 'auth/wrong-password':
                    Alert.alert('Thông báo', 'Sai mật khẩu. Vui lòng thử lại.');
                    break;
                case 'auth/user-not-found':
                    Alert.alert('Thông báo', 'Tài khoản không tồn tại.');
                    break;
                case 'auth/invalid-email':
                    Alert.alert('Thông báo', 'Email không hợp lệ.');
                    break;
                case 'auth/invalid-credential':
                    Alert.alert('Thông báo', 'Tài khoản hoặc mật khẩu không chính xác');
                    break;
                default:
                    Alert.alert('Thông báo', 'Có lỗi xảy ra: ' + error.message);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Đăng Nhập</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TextInput
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
                <Text style={styles.changePasswordText}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                <Text style={styles.signupText}>Chưa có tài khoản? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                    <Text style={[styles.signupText, styles.signupLink]}>Đăng ký ngay!</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', 
        padding: 30,
        backgroundColor: 'rgba(255, 255, 255, 0.85)', 
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF8C00', // Màu cam
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        marginBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#FF8C00', // Màu cam cho viền
        padding: 12,
        fontSize: 18,
        color: '#333',
        width: '100%',
    },
    loginButton: {
        backgroundColor: '#FF8C00', // Màu cam
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        width: '100%',
        marginTop: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    signupText: {
        color: '#000',
        fontSize: 16,
    },
    signupLink: {
        color: '#FF8C00', // Màu cam
        fontWeight: 'bold', 
    },
    changePasswordText: {
        color: '#FF8C00', // Màu cam
        alignSelf: 'center',
        marginTop: 20,
        fontSize: 16,
    },
});

export default LoginScreen;
