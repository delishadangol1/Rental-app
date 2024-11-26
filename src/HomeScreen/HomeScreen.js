import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch properties from the backend
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://192.168.1.74:9000/'); // Replace with your backend URL
                setProperties(response.data.properties);
                console.log('Response data:', response.data.properties);
            } catch (error) {
                console.error('Error fetching properties:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    const handlePropertyPress = (item) => {
        // Navigate to PropertyDescription screen and pass property data
        navigation.navigate('PropertyDescription', { property: item });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handlePropertyPress(item)}>
            <View style={styles.propertyContainer}>
                <Image source={{ uri: `http://192.168.1.74:9000/../${item.propertyPictures}` }} style={styles.propertyImage} />
                <View style={styles.propertyDetails}>
                    <Text style={styles.propertyType}>{item.title}</Text>
                    <Text style={styles.propertyLocation}>
                        <Ionicons name="location-sharp" size={16} color="green" /> {item.location}
                    </Text>
                    <Text style={styles.propertyPrice}>Price = {item.price}</Text>
                    <Text style={[styles.propertyStatus, { color: item.status === 'Available' ? 'green' : 'red' }]}>
                        {item.status}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Loading properties...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <Text style={styles.headerText}>Current Location</Text>
                    <View style={styles.locationRow}>
                        <Ionicons name="location-sharp" size={16} color="green" />
                        <Text style={styles.locationText}>Dhobidhara, Kathmandu</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={properties}
                ListHeaderComponent={
                    <Text style={styles.propertiesHeader}>Properties you have added</Text>
                }
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 70,
        paddingBottom: 18,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#b5c7eb',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    locationContainer: {
        marginLeft: 5,
    },
    headerText: {
        fontSize: 16,
        marginBottom: 6,
        color: 'green',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 2,
    },
    locationText: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'normal',
        marginLeft: 4,
    },
    listContainer: {
        paddingTop: 95,
        paddingHorizontal: 16,
    },
    propertiesHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#333',
    },
    propertyContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 16,
        padding: 10,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 5,
    },
    propertyImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight: 16,
    },
    propertyDetails: {
        flex: 1,
    },
    propertyType: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    propertyLocation: {
        fontSize: 14,
        color: 'grey',
        marginVertical: 4,
    },
    propertyPrice: {
        fontSize: 14,
        color: '#333',
    },
    propertyStatus: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default HomeScreen;
