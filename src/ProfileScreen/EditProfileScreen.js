import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // Import axios for API requests

const EditProfileScreen = ({ navigation, route }) => {
    const { user } = route.params; // Retrieve the user object from route params
    const [username, setUsername] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-fill the username field with the current username on screen load
    useEffect(() => {
        if (user && user.name) {
            setUsername(user.name);
        }
    }, [user]);

    const handleSaveChanges = async () => {
        // Basic validation for empty username
        if (!username.trim()) {
            Alert.alert('Error', 'Please enter a valid username.');
            return;
        }

        

        try {
            // Send the updated username to the backend
            const response = await axios.post('http://192.168.1.74:9000/profile/edit', {
                 // Use user._id to identify the user
                name: username, // Send the updated username
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Your profile has been updated.');
                navigation.goBack(); // Navigate back to Profile screen after saving
            } else {
                Alert.alert('Error', response.data.message || 'Failed to update profile.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            Alert.alert('Error', 'An error occurred while updating your profile. Please try again.');
        } finally {
             // Reset submitting state
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Username</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter new username"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
            />

            <TouchableOpacity
                style={[styles.button, isSubmitting && styles.disabledButton]}
                onPress={handleSaveChanges}
                disabled={isSubmitting}
            >
                <Text style={styles.buttonText}>
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                </Text>
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
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#6A8DB5',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    disabledButton: {
        backgroundColor: '#B0C4DE', // Lighter blue for disabled button
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default EditProfileScreen;
