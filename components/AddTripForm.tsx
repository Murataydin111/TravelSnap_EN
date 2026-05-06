import { useState } from 'react';

import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';

import { Ionicons } from '@expo/vector-icons';

import { Colors } from '../constants/Colors';

interface AddTripFormProps {
  onAdd: (
    title: string,
    destination: string,
    date: string,
    rating: number,
    imageUri?: string
  ) => void;
}

export default function AddTripForm({
  onAdd,
}: AddTripFormProps) {
  const [title, setTitle] = useState('');
  const [destination, setDestination] =
    useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState('');

  const [imageUri, setImageUri] =
    useState<string>();

  const pickImage = async () => {
    const result =
      await ImagePicker.launchImageLibraryAsync(
        {
          mediaTypes:
            ImagePicker.MediaTypeOptions.Images,

          allowsEditing: true,

          aspect: [16, 9],

          quality: 0.8,
        }
      );

    if (!result.canceled) {
      setImageUri(
        result.assets[0].uri
      );
    }
  };

  const takePhoto = async () => {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (
      permission.status !==
      'granted'
    ) {
      Alert.alert(
        'Permission required'
      );

      return;
    }

    const result =
      await ImagePicker.launchCameraAsync(
        {
          allowsEditing: true,

          aspect: [16, 9],

          quality: 0.8,
        }
      );

    if (!result.canceled) {
      setImageUri(
        result.assets[0].uri
      );
    }
  };

  const handleAddPhoto = () => {
    Alert.alert(
      'Add Photo',
      'Choose an option',
      [
        {
          text: 'Gallery',
          onPress: pickImage,
        },
        {
          text: 'Camera',
          onPress: takePhoto,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const handleSubmit = () => {
    if (
      !title ||
      !destination ||
      !date ||
      !rating
    ) {
      Alert.alert(
        'Error',
        'Please fill all fields'
      );

      return;
    }

    const numericRating =
      Number(rating);

    if (
      numericRating < 1 ||
      numericRating > 5
    ) {
      Alert.alert(
        'Error',
        'Rating must be between 1 and 5'
      );

      return;
    }

    const dateRegex =
      /^\d{4}-\d{2}$/;

    if (!dateRegex.test(date)) {
      Alert.alert(
        'Error',
        'Date must be YYYY-MM'
      );

      return;
    }

    onAdd(
      title,
      destination,
      date,
      numericRating,
      imageUri
    );

    setTitle('');
    setDestination('');
    setDate('');
    setRating('');
    setImageUri(undefined);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Add New Trip
      </Text>

      <TextInput
        placeholder="Trip title"
        placeholderTextColor={
          Colors.textSecondary
        }
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        placeholder="Destination"
        placeholderTextColor={
          Colors.textSecondary
        }
        style={styles.input}
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        placeholder="Date YYYY-MM"
        placeholderTextColor={
          Colors.textSecondary
        }
        style={styles.input}
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        placeholder="Rating 1-5"
        placeholderTextColor={
          Colors.textSecondary
        }
        style={styles.input}
        keyboardType="numeric"
        value={rating}
        onChangeText={setRating}
      />

      {imageUri ? (
        <>
          <Image
            source={{ uri: imageUri }}
            style={styles.preview}
          />

          <Pressable
            style={styles.photoButton}
            onPress={handleAddPhoto}
          >
            <Text
              style={
                styles.photoButtonText
              }
            >
              Change photo
            </Text>
          </Pressable>
        </>
      ) : (
        <Pressable
          style={styles.photoPicker}
          onPress={handleAddPhoto}
        >
          <Ionicons
            name="camera-outline"
            size={32}
            color={Colors.primary}
          />

          <Text
            style={
              styles.photoPickerText
            }
          >
            Add a photo
          </Text>
        </Pressable>
      )}

      <Pressable
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
          Add Trip
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.card,

    padding: 16,

    borderRadius: 16,

    marginBottom: 20,
  },

  title: {
    color: Colors.textPrimary,

    fontSize: 20,

    fontWeight: 'bold',

    marginBottom: 16,
  },

  input: {
    backgroundColor: Colors.inputBg,

    borderWidth: 1,

    borderColor: Colors.inputBorder,

    borderRadius: 12,

    padding: 14,

    color: Colors.textPrimary,

    marginBottom: 12,
  },

  photoPicker: {
    borderWidth: 2,

    borderStyle: 'dashed',

    borderColor: Colors.primary,

    borderRadius: 12,

    padding: 24,

    alignItems: 'center',

    marginBottom: 16,
  },

  photoPickerText: {
    color: Colors.textSecondary,

    marginTop: 8,
  },

  preview: {
    width: '100%',

    height: 200,

    borderRadius: 12,

    marginBottom: 12,
  },

  photoButton: {
    marginBottom: 16,

    alignItems: 'center',
  },

  photoButtonText: {
    color: Colors.primary,

    fontWeight: 'bold',
  },

  button: {
    backgroundColor: Colors.accent,

    padding: 14,

    borderRadius: 12,

    alignItems: 'center',
  },

  buttonText: {
    color: Colors.textPrimary,

    fontSize: 16,

    fontWeight: 'bold',
  },
});