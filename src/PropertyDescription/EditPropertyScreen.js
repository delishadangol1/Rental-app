import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, SafeAreaView, ScrollView, Switch, Alert, Image, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function EditPropertyScreen({ route, navigation }) {
    const { property } = route.params;
    const { _id, title, description, price, googleMapLink, video } = property;


    const [propertyTitle, setPropertyTitle] = useState(title || '');
    const [descriptionText, setDescription] = useState(description || '');
    const [availability, setAvailability] = useState('');
    const [rentPrice, setRentPrice] = useState(price || '');
    const [googleMapLinkText, setgoogleMapLink] = useState(googleMapLink || '');
    const [videoText, setvideo] = useState(video || '');
    const [selectedImage, setSelectedImage] = useState(null);
    const [isConsentChecked, setConsentChecked] = useState(false);
    const [isTypeModalVisible, setTypeModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: 'Edit Property',
        });
    }, [navigation]);

    const pickImage = async () => {
        setLoading(true);
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert("Permission Denied", "Enable media library permissions in settings.");
            setLoading(false);
            return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
    
        if (!pickerResult.canceled && pickerResult.assets && pickerResult.assets.length > 0) {
            const selectedAsset = pickerResult.assets[0]; // Extract the first selected image
            setSelectedImage(selectedAsset); // Set the URI to the state
        } else {
            console.log("Image selection cancelled or no assets found");
        }
    
        setLoading(false);
    };
    
    
    const handleRentPriceChange = (text) => {
        if (/^\d*$/.test(text)) {
            setRentPrice(text);
        } else {
            Alert.alert("Invalid Input", "Rent price must only contain numbers.");
        }
    };

    const toggleTypeModal = () => {
        setTypeModalVisible(!isTypeModalVisible);
    };

    const saveChanges = async () => {
        if (!isConsentChecked) {
            Alert.alert("Consent Required", "You must consent to the terms before submitting.");
            return;
        }
        setLoading(true);
    
        const formData = new FormData();
        formData.append("propertyId", _id);
        formData.append('title', propertyTitle);
        formData.append('description', descriptionText);
        formData.append('price', rentPrice);
        formData.append('googleMapLink', googleMapLinkText);
        formData.append('video', videoText);
        formData.append('status', availability);
    
        console.log(typeof(_id));
    
        if (selectedImage) {
            console.log("image selected");
    
            // Append the file correctly to FormData
            formData.append('file', {
                uri: selectedImage.uri,
                name: selectedImage.uri.split('/').pop(), 
                filename: selectedImage.uri.split('/').pop(),
                type: selectedImage.mimeType,
            });
    
            console.log(formData);
        } else {
            Alert.alert("Error", "Please select an image before saving changes.");
            setLoading(false);
        }
    
        try {
            const response = await fetch('http://192.168.1.74:9000/property/edit', {
                method: 'POST',
                body: formData,  // Let FormData set the 'Content-Type' automatically
            });
    
            const data = await response.json();  // Parse JSON response
    
            if (data.filePath) {
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
    

    return (
        <SafeAreaView style={styles.safeArea}>
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
                    onChangeText={setDescription}
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

                <Text style={styles.label}>Google Map Link (URL)</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the Google Map URL"
                    value={googleMapLinkText}
                    onChangeText={setgoogleMapLink}
                    keyboardType="url"
                />

                <Text style={styles.label}>Video URL</Text>
                <TextInput
                    style={styles.input}
                    placeholder="For example: https://example.com"
                    value={videoText}
                    onChangeText={setvideo}
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

                <View style={styles.consentContainer}>
                    <Switch value={isConsentChecked} onValueChange={setConsentChecked} />
                    <Text style={styles.consentText}>
                        I consent to having this website store my submitted information.
                    </Text>
                </View>
            </ScrollView>

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
                        <TouchableOpacity style={styles.modalButton} onPress={toggleTypeModal}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <View style={styles.bottomButtonsContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.doneButton} onPress={saveChanges}>
                    <Text style={styles.buttonText}>Save Changes</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
    formContainer: { paddingTop: 20, paddingHorizontal: 16, paddingBottom: 20 },
    label: { fontSize: 16, marginBottom: 10 },
    input: { backgroundColor: '#FFFFFF', padding: 10, borderWidth: 1, borderColor: '#D3D3D3', borderRadius: 5, marginBottom: 20 },
    uploadButton: { padding: 10, backgroundColor: '#6A8DB5', borderRadius: 5, alignItems: 'center', marginBottom: 20 },
    uploadText: { color: '#FFFFFF', fontSize: 16 },
    uploadedImage: { width: 200, height: 200, borderRadius: 10, marginBottom: 20 },
    consentContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
    consentText: { marginLeft: 10, fontSize: 14, color: '#555', flex: 1 },
    bottomButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 10, backgroundColor: '#f5f5f5' },
    backButton: { backgroundColor: '#506A88', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5, width: '40%', alignItems: 'center' },
    doneButton: { backgroundColor: '#506A88', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 5, width: '40%', alignItems: 'center' },
    buttonText: { color: '#FFFFFF', fontSize: 16 },
    modalBackground: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10, alignItems: 'center' },
    modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
    modalOption: { fontSize: 16, padding: 10 },
    modalButton: { marginTop: 10, padding: 10, backgroundColor: '#506A88', borderRadius: 5, width: '100%', alignItems: 'center' }
});
