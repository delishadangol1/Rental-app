// PrivacyPolicyScreen.js
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const PrivacyPolicyScreen = () => {
    return (
       
            <View style={styles.contentContainer}>
            
                <Text style={styles.sectionTitle}>1. Information Collection and Use</Text>
                <Text style={styles.content}>
                    We collect data to provide better services to our users. The information we collect helps improve the functionality and experience of our application.
                </Text>

                <Text style={styles.sectionTitle}>2. Data Security</Text>
                <Text style={styles.content}>
                    We take appropriate measures to safeguard your data. Your privacy is our priority, and we ensure your personal information is protected from unauthorized access.
                </Text>

                <Text style={styles.sectionTitle}>3. Your Rights</Text>
                <Text style={styles.content}>
                    You have the right to access, modify, or delete your personal information. You can contact us to exercise your rights and for any inquiries regarding your data.
                </Text>

                {/* Add more sections as needed */}
            </View>
      
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7', // Soft gray background for better contrast
    },
    contentContainer: {
        padding: 20,
        backgroundColor: '#ffffff', // White background for the content area
        borderRadius: 10,
        margin: 10,
        shadowColor: '#000', // Subtle shadow for a card-like appearance
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#6495ED', // Accent color for section headers
        marginTop: 15,
        marginBottom: 5,
    },
    content: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        marginBottom: 15,
        textAlign: 'justify', // Justified text for better readability
    },
});

export default PrivacyPolicyScreen;
