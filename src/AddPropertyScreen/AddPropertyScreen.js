import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity, Modal, SafeAreaView, ScrollView, Switch, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddPropertyScreen({ navigation }) {
    const [propertyTitle, setPropertyTitle] = useState('');
    const [descriptionText, setDescriptionText] = useState('');
    const [availability, setAvailability] = useState('');
    const [rentPrice, setRentPrice] = useState('');
    const [location, setLocation] = useState('');
    const [videoURL, setVideoURL] = useState('');
    const [googleMapLinkText, setGoogleMapLinkText] = useState('');
    const [propertyId, setPropertyId] = useState(''); // Added propertyId state
    const [isTypeModalVisible, setTypeModalVisible] = useState(false);
    const [isConsentChecked, setConsentChecked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(false); // Added loading state

    // Handle media upload
    const pickImage = async () => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            Alert.alert(
                "Permission Denied",
                "You need to enable permissions for the media library in your device settings.",
                [{ text: "OK" }]
            );
            return;
        }
        
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!pickerResult.cancelled) {
            setSelectedImage(pickerResult.uri);
        }
    };
    
    const saveChanges = async () => {
        if (!isConsentChecked) {
            Alert.alert("Consent Required", "You must consent to the terms before submitting.");
            return;
        }

       
        setLoading(true);
    
        const formData = new FormData();
        formData.append('title', propertyTitle);
        formData.append('description', descriptionText);
        formData.append('price', rentPrice);
        formData.append('googleMapLink', googleMapLinkText);
        formData.append('video', videoURL);
        formData.append('status', availability);
    
        if (selectedImage) {
            // Append the file correctly to FormData
            formData.append('file', {
                uri: selectedImage,
                name: selectedImage.split('/').pop(),
                filename: selectedImage.split('/').pop(),
                type: 'image/jpeg', // Assuming jpeg image type, adjust if necessary
            });
        } 
    
        try {
            const response = await fetch('http://192.168.1.74:9000/addProperty', {
                method: 'POST',
                body: formData,  // Let FormData set the 'Content-Type' automatically
            });
    
            const data = await response.json();  // Parse JSON response
            console.log(data.message);
            if (data.message=='succesfull') {
                Alert.alert("Success", "Property details updated successfully!");
                navigation.goBack();
            } else {
                Alert.alert("Error", "Failed to update property details.");
            }
        } catch (error) {
            console.error("Error", error);
            Alert.alert("Error", "An error occurred while updating the property.");
        } finally {
            setLoading(false);
        }
    };

    const handleRentPriceChange = (text) => {
        if (/^\d*$/.test(text)) {
            setRentPrice(text);
        } else {
            Alert.alert("Rent price must only contain numbers.");
        }
    };

    const toggleTypeModal = () => {
        setTypeModalVisible(!isTypeModalVisible);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Add Property</Text>
            </View>

            {/* Scrollable Form Fields */}
            <ScrollView contentContainerStyle={styles.formContainer}>
                <Text style={styles.label}>Property Title*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your property title"
                    value={propertyTitle}
                    onChangeText={setPropertyTitle}
                />

                <Text style={styles.label}>Description</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={descriptionText}
                    onChangeText={setDescriptionText}
                />

                <Text style={styles.label}>Availability</Text>
                <TouchableOpacity style={styles.input} onPress={toggleTypeModal}>
                    <Text>{availability || 'Select'}</Text>
                </TouchableOpacity>

                <Text style={styles.label}>Rent Price*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the price"
                    value={rentPrice}
                    onChangeText={handleRentPriceChange}
                    keyboardType="numeric"
                />

                <Text style={styles.label}>Location (URL)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the location URL"
                    value={googleMapLinkText}
                    onChangeText={setGoogleMapLinkText}
                    keyboardType="url"
                />

                <Text style={styles.label}>Video URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="For example: https://photos.app.goo.gl/use7vMBDkpsMG6t67"
                    value={videoURL}
                    onChangeText={setVideoURL}
                    keyboardType="url"
                />

                <Text style={styles.label}>Select and Upload Media</Text>
                <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
                    <Text style={styles.uploadText}>Upload Media</Text>
                </TouchableOpacity>
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.uploadedImage} />
                ) : null}

                {/* Consent */}
                <View style={styles.consentContainer}>
                    <Switch
                        value={isConsentChecked}
                        onValueChange={setConsentChecked}
                    />
                    <Text style={styles.consentText}>
                        I consent to having this website store my submitted information, read more information.
                        <Text style={styles.linkText}> GDPR Agreement</Text>
                    </Text>
                </View>
            </ScrollView>

            {/* Modal for Selecting Type */}
            <Modal visible={isTypeModalVisible} transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalHeader}>Select Availability</Text>
                        <TouchableOpacity onPress={() => { setAvailability('Available'); toggleTypeModal(); }}>
                            <Text style={styles.modalOption}>Available</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setAvailability('Booked'); toggleTypeModal(); }}>
                            <Text style={styles.modalOption}>Booked</Text>
                        </TouchableOpacity>
                        <Button title="Cancel" onPress={toggleTypeModal} />
                    </View>
                </View>
            </Modal>

            {/* Bottom Navigation Buttons */}
            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneButton} onPress={saveChanges}>
                    <Text style={styles.buttonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        paddingTop: 70,
        paddingBottom: 18,
        paddingHorizontal: 16,
        alignItems: 'center',
        backgroundColor: '#b5c7eb',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'normal',
        color: 'black',
    },
    formContainer: {
        paddingTop: 100,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        backgroundColor: '#FFFFFF',
        padding: 10,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        borderRadius: 5,
        marginBottom: 20,
    },
    uploadButton: {
        padding: 10,
        backgroundColor: '#6A8DB5',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20,
    },
    uploadText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
    uploadedImage: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 20,
    },
    consentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    consentText: {
        marginLeft: 10,
        fontSize: 14,
        color: '#555',
        flex: 1,
    },
    linkText: {
        color: 'blue',
        textDecorationLine: 'underline',
    },
    bottomButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#f5f5f5',
    },
    backButton: {
        backgroundColor: '#506A88',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    doneButton: {
        backgroundColor: '#6A8DB5',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        width: '40%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: 'bold',
    },
});
