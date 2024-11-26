import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; // Use the basic createStackNavigator instead of native stack
import BottomTabNavigator from './src/BottomTabNavigator/BottomTabNavigator';
import ProfileScreen from './src/ProfileScreen/ProfileScreen';
import EditProfileScreen from './src/ProfileScreen/EditProfileScreen';
import ChangePasswordScreen from './src/ProfileScreen/ChangePasswordScreen';
import SettingsScreen from './src/ProfileScreen/SettingsScreen';
import AboutUsScreen from './src/ProfileScreen/AboutUsScreen';
import PrivacyPolicyScreen from './src/ProfileScreen/PrivacyPolicyScreen';
import LoginScreen from './src/ProfileScreen/LoginScreen';
import PropertyDescription from './src/PropertyDescription/PropertyDescription'; // Import the PropertyDescription screen
import EditPropertyScreen from './src/PropertyDescription/EditPropertyScreen'; // Import the EditPropertyScreen
import axios from 'axios';

const Stack = createStackNavigator(); // Use the regular stack navigator

const App = () => {
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch properties from the backend
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://192.168.1.74:9000/'); // Replace with your backend URL
                setUser(response?.data?.status);
                console.log('Response data:', response.data.status);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [user]);


    return (
        <NavigationContainer>
            <Stack.Navigator 
                // initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: '#f3f3f3' },
                    headerTintColor: '#333',
                    headerTitleStyle: { fontWeight: 'bold' },
                }}
            >
                <>
                 {user ? (
                    <>
                    <Stack.Screen 
                    name="Home" 
                    component={BottomTabNavigator} 
                    options={{ headerShown: false }}
                />
                <Stack.Screen 
                    name="Profile" 
                    component={ProfileScreen} 
                    options={{ title: 'Profile' }}
                />
                <Stack.Screen 
                    name="EditProfile" 
                    component={EditProfileScreen} 
                    options={{ title: 'Edit Profile' }}
                />
                <Stack.Screen 
                    name="ChangePassword" 
                    component={ChangePasswordScreen} 
                    options={{ title: 'Change Password' }}
                />
                <Stack.Screen 
                    name="Settings" 
                    component={SettingsScreen} 
                    options={{ title: 'Settings' }}
                />
                <Stack.Screen 
                    name="AboutUs" 
                    component={AboutUsScreen} 
                    options={{ title: 'About Us' }}
                />
                <Stack.Screen 
                    name="PrivacyPolicy" 
                    component={PrivacyPolicyScreen} 
                    options={{ title: 'Privacy Policy' }}
                />
                <Stack.Screen 
                    name="PropertyDescription" 
                    component={PropertyDescription} 
                    options={{ title: 'Property Details' }}
                />
                <Stack.Screen 
                    name="EditProperty" 
                    component={EditPropertyScreen}  // Add EditPropertyScreen to the stack
                    options={{ title: 'Edit Property' }}
                />

                    </>
                 ): (
                    <>
                <Stack.Screen 
                    name="Login" 
                    component={LoginScreen}
                    options={{ title: 'Login Screen' }}
                />
              </>

                 )}
                </>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
