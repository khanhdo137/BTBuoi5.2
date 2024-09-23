import React, { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { AuthContext } from '../api/AuthContext';
import { signOut, sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const HomeScreen = ({ navigation }) => {
    const { user } = React.useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState('');

    const handleLogout = async () => {
        try {
            await signOut(auth);
            //Alert.alert('Đăng xuất thành công!');
        } catch (error) {
            Alert.alert('Đăng xuất thất bại', error.message);
        }
    };

    const handleChangePassword = async () => {
        if (!email) {
            Alert.alert('Thông báo', 'Vui lòng nhập email.');
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            Alert.alert('Thông báo', 'Đã gửi email đổi mật khẩu. Vui lòng kiểm tra hộp thư của bạn.');
            setModalVisible(false);
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể gửi email. Vui lòng kiểm tra lại.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Chào mừng, {user?.email}!</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.changePasswordButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.changePasswordText}>Đổi mật khẩu</Text>
            </TouchableOpacity>

            {/* Modal để đổi mật khẩu */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Đổi Mật Khẩu</Text>
                        <TextInput
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            style={styles.input}
                        />
                        <Button title="Gửi email đổi mật khẩu" onPress={handleChangePassword} color="#007BFF" />
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeModalText}>Đóng</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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
    },
    logoutButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        marginBottom: 20,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    changePasswordButton: {
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        width: '50%',
        borderWidth: 1,
        borderColor: '#007BFF',
    },
    changePasswordText: {
        color: '#007BFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        marginBottom: 12,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        width: '100%',
    },
    closeModalText: {
        color: '#007BFF',
        marginTop: 20,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
