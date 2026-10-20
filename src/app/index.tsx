import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Alert,
  Button,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function FormProject() {
  // --- Existing State ---
  const [name, setName] = useState<string>('');
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [isImageModalVisible, setImageModalVisible] = useState<boolean>(false);

  // --- NEW STATE ---
  const [age, setAge] = useState<string>('');
  const [dob, setDob] = useState<string>('');
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<string>(''); // For Radio buttons

  // Function to handle picking/taking a photo
  const pickImage = async (useCamera: boolean) => {
    if (useCamera) {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) return Alert.alert('Permission needed', 'Camera access is required.');
    } else {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!granted) return Alert.alert('Permission needed', 'Gallery access is required.');
    }

    const result = await (useCamera 
      ? ImagePicker.launchCameraAsync({ quality: 0.5 }) 
      : ImagePicker.launchImageLibraryAsync({ quality: 0.5 })
    );

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageModalVisible(true);
    }
  };

  const handleSubmit = () => {
    // Basic Validation
    if (!name || !age || !selectedRole) {
      return Alert.alert('Error', 'Please fill out Name, Age, and select a Role.');
    }
    if (!agreedToTerms) {
      return Alert.alert('Error', 'You must agree to the terms and conditions.');
    }

    // Gather all data
    const formData = {
      name: name,
      age: parseInt(age, 10), // Convert string to number for JSON
      dateOfBirth: dob,
      role: selectedRole,
      agreedToTerms: agreedToTerms,
      isFeatureEnabled: isSwitchOn,
      imageUri: imageUri || 'No image selected',
      timestamp: new Date().toISOString(),
    };

    console.log('--- FORM SUBMITTED ---');
    console.log(JSON.stringify(formData, null, 2));
    console.log('----------------------');
    
    Alert.alert('Submitted!', 'Check your console for the JSON output.');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          
          <Text style={styles.header}>Full Form Project</Text>

          {/* Section 1: Basic Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Info</Text>
            
            <Text style={styles.label}>Full Name</Text>
            <TextInput
              style={styles.input}
              placeholder="John Doe"
              placeholderTextColor="#888"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Age (Number Input)</Text>
            <TextInput
              style={styles.input}
              placeholder="25"
              placeholderTextColor="#888"
              keyboardType="number-pad" // Shows number pad on mobile
              value={age}
              onChangeText={(text) => setAge(text.replace(/[^0-9]/g, ''))} // Only allows numbers
            />

            <Text style={styles.label}>Date of Birth</Text>
            <TextInput
              style={styles.input}
              placeholder="DD/MM/YYYY"
              placeholderTextColor="#888"
              value={dob}
              onChangeText={setDob}
            />
          </View>

          {/* Section 2: Radio Buttons (Role Selection) */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select a Role</Text>
            
            {['Developer', 'Designer', 'Manager'].map((role) => (
              <Pressable 
                key={role} 
                style={styles.radioRow} 
                onPress={() => setSelectedRole(role)}
              >
                <View style={[styles.radioOuter, selectedRole === role && styles.radioOuterSelected]}>
                  {selectedRole === role && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.bodyText}>{role}</Text>
              </Pressable>
            ))}
          </View>

          {/* Section 3: Checkbox & Toggles */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            {/* Custom Checkbox */}
            <Pressable 
              style={styles.checkboxRow} 
              onPress={() => setAgreedToTerms(!agreedToTerms)}
            >
              <View style={[styles.checkbox, agreedToTerms && styles.checkboxChecked]}>
                {agreedToTerms && <Text style={{color: 'white', fontSize: 12, fontWeight: 'bold'}}>✓</Text>}
              </View>
              <Text style={styles.bodyText}>I agree to the Terms and Conditions</Text>
            </Pressable>

            {/* Standard Switch */}
            <View style={[styles.row, { marginTop: 20 }]}>
              <Text style={styles.bodyText}>Enable Dark Mode:</Text>
              <Switch
                value={isSwitchOn}
                onValueChange={setIsSwitchOn}
                trackColor={{ false: '#3e3e3e', true: '#007AFF' }}
              />
            </View>
          </View>

          {/* Section 4: Image Upload */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Attach a Photo</Text>
            <View style={styles.rowButtons}>
              <Button title="📸 Take Photo" onPress={() => pickImage(true)} color="#007AFF" />
              <Button title="🖼️ Upload" onPress={() => pickImage(false)} color="#5856D6" />
            </View>
            
            {imageUri && (
              <Text style={{ color: '#28a745', marginTop: 15, textAlign: 'center', fontWeight: 'bold' }}>
                ✅ Image attached!
              </Text>
            )}
          </View>

          {/* Submit Button */}
          <Pressable style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>📤 Submit & Log JSON</Text>
          </Pressable>

        </ScrollView>

        {/* --- IMAGE PREVIEW MODAL --- */}
        <Modal visible={isImageModalVisible} transparent={true} animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Image Preview</Text>
              {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.previewImage} resizeMode="cover" />
              )}
              <Button title="Looks Good" onPress={() => setImageModalVisible(false)} color="#28a745" />
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#121212' },
  container: { padding: 20, paddingTop: 40 },
  header: { fontSize: 26, fontWeight: 'bold', marginBottom: 30, textAlign: 'center', color: '#ffffff' },

  section: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#ffffff' },
  label: { color: '#aaa', fontSize: 14, marginBottom: 5, marginLeft: 2 },
  bodyText: { color: '#e0e0e0', fontSize: 16 },
  
  input: {
    height: 45,
    borderColor: '#444',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#ffffff',
    backgroundColor: '#2a2a2a',
    fontSize: 16,
  },
  
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  rowButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 },

  // Radio Button Styles
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioOuterSelected: { borderColor: '#007AFF' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#007AFF' },

  // Checkbox Styles
  checkboxRow: { flexDirection: 'row', alignItems: 'center' },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: { backgroundColor: '#007AFF', borderColor: '#007AFF' },

  submitButton: {
    backgroundColor: '#28a745',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 18 },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  modalContent: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    width: '90%',
    borderWidth: 1,
    borderColor: '#444',
  },
  modalText: { color: '#ffffff', fontSize: 20, fontWeight: 'bold', marginBottom: 15 },
  previewImage: {
    width: '100%',
    height: 350,
    borderRadius: 10,
    marginBottom: 20,
  },
});