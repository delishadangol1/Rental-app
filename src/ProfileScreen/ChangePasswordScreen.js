import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const ChangePasswordScreen = ({ navigation ,route}) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleChangePassword = async() => {
    
        console.log('here in handle change pw');
        try {
            const response = await axios.post('http://192.168.1.74:9000/changePassword', {
                currentPassword,
                newPassword,
            });

            if (response.status === 200) {
                Alert.alert('Password Changed', 'Your password has been updated successfully.');
                navigation.goBack(); // Navigate back to Profile screen
            } else {
                Alert.alert('Error', response.data.message || 'Failed to change password.');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            Alert.alert('Login Successful', `Welcome back, ${user._id}!`);
        } finally {
            setLoading(false);
        }
        navigation.goBack(); // Navigate back to Profile screen
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Current Password"
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
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
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#6A8DB5',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default ChangePasswordScreen;
