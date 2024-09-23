import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../api/AuthContext';
import { View, ActivityIndicator } from 'react-native';

const ProtectedRoute = ({ children, navigation }) => {
    const { user, loading } = useContext(AuthContext);

    useEffect(() => {
        if (!loading && !user) {
            navigation.replace('Login');
        }
    }, [loading, user, navigation]);

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    return children;
};

export default ProtectedRoute;
