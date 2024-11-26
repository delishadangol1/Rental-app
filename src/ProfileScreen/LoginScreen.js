import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!name || !password) {
            Alert.alert('Validation Error', 'Please enter both name and password.');
            return;
        }

        setIsLoading(true);
        try {
            // Replace the URL with your backend API endpoint
            const response = await axios.post('http://192.168.1.74:9000/login', {
                name,
                password,
            });

            navigation.navigate('Profile');

            if (response.data.message==='succesfull') {

                console.log("LoginData" , response.data.message)
                Alert.alert('Login Successful', `Welcome back, ${name}!`);
                navigation.navigate('Profile');
            } else {
                Alert.alert('Login Failed', response.data.message || 'Invalid credentials.');
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to login. Please try again later.');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToRegister = () => {
        navigation.navigate('Register'); // Navigate to a registration screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={name}
                onChangeText={setName}
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
                <Text style={styles.buttonText}>{isLoading ? 'Logging in...' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateToRegister}>
                <Text style={styles.linkText}>Don't have an account? Register here.</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#6A8DB5',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    linkText: {
        marginTop: 15,
        color: '#6A8DB5',
        textAlign: 'center',
        fontSize: 14,
    },
});

export default LoginScreen;
