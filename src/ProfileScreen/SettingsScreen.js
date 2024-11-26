// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isNotificationsEnabled, setNotificationsEnabled] = useState(false);
    const [isDarkTheme, setDarkTheme] = useState(false);

    const toggleNotifications = () => setNotificationsEnabled(!isNotificationsEnabled);
    const toggleTheme = () => setDarkTheme(!isDarkTheme);

    const handlePrivacyPolicy = () => {
        // Navigate to Privacy Policy screen or open a link
        navigation.navigate('PrivacyPolicy');
    };

    const handleLogout = () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Log Out",
                    onPress: () => {
                        // Clear user session or token if necessary
                        navigation.navigate('Login'); // Replace 'Login' with the actual login screen name
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Settings</Text>
            
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Enable Notifications</Text>
                <Switch
                    value={isNotificationsEnabled}
                    onValueChange={toggleNotifications}
                />
            </View>
            
            <View style={styles.optionContainer}>
                <Text style={styles.optionText}>Dark Theme</Text>
                <Switch
                    value={isDarkTheme}
                    onValueChange={toggleTheme}
                />
            </View>

            <TouchableOpacity style={styles.optionContainer} onPress={handlePrivacyPolicy}>
                <View style={styles.optionContent}>
                    <Icon name="info-circle" size={20} color="#333" style={styles.icon} />
                    <Text style={styles.optionText}>Privacy Policy</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
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
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
    },
    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D1D1',
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#333',
    },
    arrow: {
        fontSize: 22,
        color: '#666',
    },
    
});

export default SettingsScreen;
