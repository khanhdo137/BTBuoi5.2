import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Alert, StyleSheet, Text } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ChangePasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        navigation.setOptions({ title: 'Quên mật khẩu' });
    }, [navigation]);

    const handleChangePassword = async () => {
        const auth = getAuth();
        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Thông báo', 'Đã gửi email đổi mật khẩu. Vui lòng kiểm tra hộp thư của bạn.');
            navigation.goBack();
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể gửi email. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Quên mật khẩu</Text>
            <TextInput
                placeholder="Nhập email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                style={styles.input}
                placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Lấy lại mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        backgroundColor: '#f5f5f5',
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 20,
        fontSize: 16,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#007BFF',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ChangePasswordScreen;
