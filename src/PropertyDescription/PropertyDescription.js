import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking, ScrollView } from 'react-native';

const PropertyDescription = ({ route, navigation }) => {
    const { property } = route.params || {};  // Fallback to empty object if undefined

    if (!property) {
        return <Text>No property data available</Text>;  // Handling case when property is not passed
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: `http://192.168.1.74:9000/../${property.propertyPictures}` }} style={styles.propertyImage} />

            </View>

            <View style={styles.detailsContainer}>
                <Text style={styles.propertyTitle}>{property.title} for Rent in {property.address}</Text>
                <Text style={styles.propertyPrice}>Rs. {property.price}</Text>
                
                <View style={styles.propertyInfo}>
                    <Text>3.5 km from Balkhu</Text>
                    <Text style={styles.status}>{property.status}</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(property.googleMapLink)}>
                        <Text style={styles.mapLink}>View on Google Maps</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>
                   {property.description}
                </Text>

                <Text style={styles.contact}>Contact: {property.contacts}
                </Text>

                <Text style={styles.sectionTitle}>Facilities</Text>
                <View style={styles.facilities}>
                        {property.facilities && property.facilities.length > 0 ? (
                            property.facilities.map((facility, index) => (
                        <Text key={index}>✓ {facility}</Text>))) : (
                        <Text>No facilities available</Text>)
                        }
                </View>


                <TouchableOpacity 
                    style={styles.editButton} 
                    onPress={() => navigation.navigate('EditProperty', { property })} // Passing property to EditProperty screen
                >
                    <Text style={styles.editButtonText}>Edit Property</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5' },
    imageContainer: { marginHorizontal: 16, marginTop: 16, marginBottom: 30, borderRadius: 10, overflow: 'hidden' },
    propertyImage: { width: '100%', height: 200 },
    detailsContainer: { 
        backgroundColor: 'white', 
        borderRadius: 10, 
        marginHorizontal: 16, 
        padding: 16, 
        marginTop: -16, 
        shadowColor: '#000', 
        shadowOpacity: 0.1, 
        shadowRadius: 5, 
        shadowOffset: { width: 0, height: 2 }, 
        elevation: 5 
    },
    propertyTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
    propertyPrice: { fontSize: 16, color: '#666', marginBottom: 16 },
    propertyInfo: { marginBottom: 16 },
    status: { color: 'green', fontWeight: 'bold', marginVertical: 4 },
    mapLink: { color: 'blue', textDecorationLine: 'underline' },
    sectionTitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 8 },
    description: { color: '#333', marginBottom: 8 },
    contact: { color: 'blue', fontWeight: 'bold', marginBottom: 16 },
    facilities: { marginBottom: 20 },
    editButton: { backgroundColor: '#7089cf', padding: 12, alignItems: 'center', borderRadius: 8 },
    editButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});

export default PropertyDescription;
