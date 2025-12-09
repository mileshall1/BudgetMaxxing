import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function ScanStatementsScreen() {
  // State to hold the URI of the scanned document for preview
  const [scannedImageUri, setScannedImageUri] = useState(null);


  const handleImagePicked = (uri) => {
    if (uri) {
      // **SET THE SCANNED IMAGE URI TO STATE FOR PREVIEW**
      setScannedImageUri(uri);
      console.log("Document loaded:", uri);
      Alert.alert("Scan Complete", `Image saved temporarily at: ${uri}`);
    } else {
      console.log("Operation cancelled");
    }
  };


  const openCamera = async () => {
   
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    //ask for camera permissions
    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "We need camera permissions to let you scan documents."
      );
      return;
    }

    // Launch the camera
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,  //We can add cropping later
      quality: 1,
    });

    // 3. Handle the captured image
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      handleImagePicked(uri);
    } else {
      handleImagePicked(null); // Pass null if canceled
    }
  };

  // **NEW FUNCTION: OPEN PHOTO LIBRARY**
  const openImageLibrary = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //ask for media library permissions
    if (status !== 'granted') {
      Alert.alert(
        "Permission Required",
        "We need photo library permissions to let you select documents."
      );
      return;
    }

    // Launch the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false, 
      quality: 1,
    });

    // Handle the selected image
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      handleImagePicked(uri);
    } else {
      handleImagePicked(null);
    }
  };

  // Determine the image source: Scanned image if available, otherwise the placeholder
  const imageSource = scannedImageUri 
    ? { uri: scannedImageUri }
    : { uri: "https://i.ibb.co/zPD7dx6/bank-statement-scan.png" };
  
  // Determine the subtitle text based on whether an image has been scanned
  const subtitleText = scannedImageUri 
    ? "Preview of your scanned document." 
    : "Align the statement to scan";
    
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan Statements</Text>

      <Image
        source={imageSource}
        style={styles.statementImage}
        resizeMode="contain"
      />
     

      <Text style={styles.subtitle}>{subtitleText}</Text>
      <View style={styles.buttonContainer}>
        {/* NEW: Library Upload Button */}
        <TouchableOpacity style={styles.libraryButton} onPress={openImageLibrary}>
          <Ionicons name="images-outline" size={32} color="black" />
        </TouchableOpacity>

        {/* Camera Scan Button */}
        <TouchableOpacity style={styles.cameraButton} onPress={openCamera}>
          <Ionicons name="camera-outline" size={32} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    paddingTop: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: "#000",
  },
  statementImage: {
    width: 260,
    height: 260,
    marginBottom: 25,
    borderRadius: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 40,
  },
  // **NEW Style for button group**
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '60%', // Constrain width for centering
    justifyContent: 'space-around', // Space out the buttons
  },
  cameraButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#F8F8F8",
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    // Removed margin-top to align with new structure
  },
  // **NEW Style for library button**
  libraryButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEE", // Slightly darker background
    borderWidth: 1,
    borderColor: "#CCC",
    alignItems: "center",
    justifyContent: "center",
    // Pushes it away from the camera button in the buttonContainer
    marginLeft: 30, 
    marginRight: 30,
  },
});