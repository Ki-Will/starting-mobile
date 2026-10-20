import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Switch,
  Pressable,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';

export default function FormScreen() {
  // Text input states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [bio, setBio] = useState('');

  // Other form element states
  const [subscribe, setSubscribe] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = () => {
    // Construct JSON object
    const formData = {
      name,
      email,
      phone,
      password,
      bio,
      subscribe,
      agreeTerms,
    };

    // Print to console as JSON (formatted output)
    console.log('--- Form Submitted ---');
    console.log(JSON.stringify(formData, null, 2));
    console.log('----------------------');

    // Also show a prompt on the UI
    Alert.alert('Form Data', JSON.stringify(formData, null, 2));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registration Form</Text>

      {/* 1. Standard text input */}
      <Text style={styles.label}>Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* 2. Email keyboard type */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="example@mail.com"
        keyboardType="email-address" // Email keyboard
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* 3. Phone keyboard type */}
      <Text style={styles.label}>Phone</Text>
      <TextInput
        style={styles.input}
        placeholder="1234567890"
        keyboardType="phone-pad" // Numeric keyboard
        value={phone}
        onChangeText={setPhone}
      />

      {/* 4. Password input (obscured text) */}
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter password"
        secureTextEntry // Password hidden
        value={password}
        onChangeText={setPassword}
      />

      {/* 5. Multiline text input */}
      <Text style={styles.label}>Bio</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Tell us about yourself..."
        multiline // Multiline
        numberOfLines={4}
        value={bio}
        onChangeText={setBio}
        textAlignVertical="top"
      />

      {/* 6. Switch control */}
      <View style={styles.row}>
        <Text style={styles.label}>Subscribe to newsletter</Text>
        <Switch value={subscribe} onValueChange={setSubscribe} />
      </View>

      {/* 7. Custom checkbox (implemented with Pressable) */}
      <Pressable
        style={styles.checkboxRow}
        onPress={() => setAgreeTerms(!agreeTerms)}
      >
        <View style={[styles.checkbox, agreeTerms && styles.checkboxChecked]}>
          {agreeTerms && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.label}>I agree to the terms</Text>
      </Pressable>

      {/* Submit button */}
      <View style={styles.buttonContainer}>
        <Button title="Submit Form" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 10,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 4,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  checkmark: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
});