import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ChangePasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');

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
        <ImageBackground 
            source={require('../assets/images/2.jpg')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <TextInput
                    placeholder="Nhập email để đổi mật khẩu"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    style={styles.input}
                />
                <Button title="Gửi email đổi mật khẩu" onPress={handleChangePassword} color="#007BFF" />
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
    input: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        fontSize: 16,
    },
});

export default ChangePasswordScreen;
