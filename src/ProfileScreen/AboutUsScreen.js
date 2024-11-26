import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const AboutUsScreen = () => {
    return (
        <View style={styles.container}>
            {/* App Logo */}
            <Image 
                source={require('../../assets/logo.png')}  // Replace with your logo path
                style={styles.logo}
            />

            {/* Welcome Message */}
            <Text style={styles.title}>Welcome to Find My App</Text>

            {/* Info Box */}
            <View style={styles.infoBox}>
                {/* Mission Section */}
                <Text style={styles.sectionTitle}>Our Mission</Text>
                <Text style={styles.description}>
                    Find My App is dedicated to helping users effortlessly find properties they need. We streamline the property search process with reliable and up-to-date information.
                </Text>

                {/* About Team */}
                <Text style={styles.sectionTitle}>Meet Our Team</Text>
                <Text style={styles.description}>
                    Our team is made up of passionate individuals committed to simplifying property discovery, focusing on integrity, accuracy, and user experience.
                </Text>

                {/* Contact Information */}
                <Text style={styles.sectionTitle}>Contact Us</Text>
                <Text style={styles.description}>
                    Reach out with questions or feedback at:
                </Text>
                <Text style={styles.contactInfo}>Email: support@findmyapp.com</Text>
                <Text style={styles.contactInfo}>Phone: +977- 9768421869</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#f4f7fb',
    },
    logo: {
        width: 400,
        height: 150,
        borderRadius: 40,
        marginTop: 18,
        marginBottom: 38,
        backgroundColor: '#e1e8ee',
        borderWidth: 1,
        borderColor: '#d1d9e6',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#002D62',
        marginBottom: 38,
    },
    infoBox: {
        width: '100%',
        backgroundColor: '#E7EFFB',
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#002D62',
        marginTop: 15,
        marginBottom: 5,
    },
    description: {
        fontSize: 15,
        color: '#7f8c8d',
        lineHeight: 22,
        marginBottom: 15,
    },
    contactInfo: {
        fontSize: 15,
        color: '#34495e',
        marginTop: 5,
    },
});

export default AboutUsScreen;
