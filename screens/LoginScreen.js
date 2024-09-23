import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { AuthContext } from '../api/AuthContext';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Thông báo', 'Vui lòng điền đầy đủ thông tin.');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Thông báo', 'Email không hợp lệ. Vui lòng nhập đúng định dạng.');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Thông báo', 'Mật khẩu phải có ít nhất 6 ký tự.');
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
                    Alert.alert('Thông báo', 'Thông tin đăng nhập không hợp lệ. Vui lòng kiểm tra lại.');
                    break;
                default:
                    Alert.alert('Thông báo', 'Có lỗi xảy ra: ' + error.message);
            }
        }
    };

    return (
        <ImageBackground 
            source={require('../assets/images/3.jpg')} 
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <Text style={styles.header}>Đăng Nhập</Text>
                <TextInput
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
                <TextInput
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.input}
                />
                <Button title="Đăng nhập" onPress={handleLogin} color="#007BFF" />
                <TouchableOpacity onPress={() => navigation.navigate('ChangePasswordScreen')}>
                    <Text style={styles.changePasswordText}>Quên mật khẩu? Đổi mật khẩu tại đây</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={styles.signupText}>Chưa có tài khoản? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                        <Text style={[styles.signupText, styles.signupLink]}>Đăng ký ngay!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: '90%', 
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
        borderRadius: 10,
        elevation: 5,
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        fontSize: 16,
    },
    signupText: {
        color: '#000',
        fontSize: 16,
    },
    signupLink: {
        color: '#007BFF',
        fontWeight: 'bold', 
    },
    changePasswordText: {
        color: '#007BFF',
        textAlign: 'center',
        marginTop: 15,
    },
});

export default LoginScreen;
