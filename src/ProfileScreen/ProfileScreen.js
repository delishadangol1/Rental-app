import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [profileData, setProfileData] = useState({
        _id: null,
        name: 'Your Name',
        age: 'Age',
        gender: 'Gender',
        profilePicture: 'https://example.com/default-avatar.png',
    });

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://192.168.1.74:9000/profile');
            const userData = response.data.userinfo || {};
            setProfileData({
                _id: userData._id || null,
                name: userData.name || 'Unknown',
                age: userData.age || 'N/A',
                gender: userData.sex === 'f' ? 'Female' : userData.sex === 'm' ? 'Male' : 'Other',
                profilePicture: userData.profilePicture
                    ? `http://192.168.1.74:9000${userData.profilePicture}`
                    : 'https://example.com/default-avatar.png', // Default picture
            });
            console.log('Response data:', response.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
                Alert.alert("Error", "Unable to fetch profile data. Please try again later.");
            }
        };

        fetchProfileData();
    }, []);

    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permissionResult.granted) {
            Alert.alert("Permission is required to access the media library.");
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileData((prevData) => ({ ...prevData, profilePicture: result.uri }));
        }
    };

    const handleEditProfile = () => {
        navigation.navigate('EditProfile',{ user: profileData });
    };

    const handleChangePassword = () => {
        navigation.navigate('ChangePassword',{ user: profileData });
    };

    const handleSettings = () => {
        navigation.navigate('Settings');
    };

    const handleAboutUs = () => {
        navigation.navigate('AboutUs');
    };

    const handleLogout = async () => {
        Alert.alert(
            "Log Out",
            "Are you sure you want to log out?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Log Out",
                    onPress: async () => {
                        try {
                            const response = await fetch('http://192.168.1.74:9000/logout', {
                                method: 'GET',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                credentials: 'include', // Include cookies if needed for sessions
                            });
    
                            if (response.ok) {
                                const data = await response.json();
                                console.log(data.message);
    
                                // Clear local session if any
                                await clearUserSession();
    
                                Alert.alert('Successfully logout');
                                // Navigate to login screen
                                navigation.navigate('Login');
                            } else {
                                console.error('Logout failed:', response.status);
                                Alert.alert('Logout Failed', 'Please try again.');
                            }
                        } catch (error) {
                            console.error('Error during logout:', error);
                            Alert.alert('Error', 'An error occurred during logout. Please try again.');
                        }
                    },
                    style: "destructive",
                },
            ]
        );
    };
    
    // Example function to clear session
    const clearUserSession = async () => {
        try {
            await AsyncStorage.clear();
            console.log("User session cleared.");
        } catch (error) {
            console.error("Error clearing session:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.profileSection}>
                <Image
                    source={{ uri: profileData.profilePicture }}
                    style={styles.avatar}
                />
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadText}>Edit Picture</Text>
                </TouchableOpacity>
                <Text style={styles.username}>{profileData.name}</Text>
                <Text style={styles.details}>
                    {profileData.age} | {profileData.gender}
                </Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>ACCOUNT</Text>
                <TouchableOpacity style={styles.option} onPress={handleEditProfile}>
                    <View style={styles.optionContent}>
                        <Icon name="pencil" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.optionText}>Edit Profile</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
                    <View style={styles.optionContent}>
                        <Icon name="lock" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.optionText}>Change Password</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.option} onPress={handleSettings}>
                    <View style={styles.optionContent}>
                        <Icon name="cog" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.optionText}>Settings</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.option, { borderBottomWidth: 0 }]} onPress={handleAboutUs}>
                    <View style={styles.optionContent}>
                        <Icon name="info-circle" size={20} color="#333" style={styles.icon} />
                        <Text style={styles.optionText}>About Us</Text>
                    </View>
                    <Text style={styles.arrow}>›</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    // Your existing styles remain unchanged
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 16,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
    },
    
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#E0E0E0',
    },
    uploadButton: {
        marginTop: 10,
        backgroundColor: '#6A8DB5',
        padding: 6,
        borderRadius: 8,
    },
    uploadText: {
        color: '#FFFFFF',
        fontSize: 14,
    },
    username: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: 'bold',
    },
    details: {
        marginTop: 4,
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#E7EFFB',
        borderRadius: 10,
        padding: 10,
    },
    sectionTitle: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#666666',
        marginBottom: 10,
        marginLeft: 10,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderBottomColor: '#D1D1D1',
        borderBottomWidth: 1,
    },
    optionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        marginRight: 8,
    },
    optionText: {
        fontSize: 16,
        color: '#333333',
    },
    arrow: {
        fontSize: 22,
        color: '#666666',
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        borderColor: '#007AFF',
        borderWidth: 1,
        alignItems: 'center',
    },
    logoutText: {
        color: '#007AFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
