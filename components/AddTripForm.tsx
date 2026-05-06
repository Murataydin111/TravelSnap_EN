import { useState } from 'react';

import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { Colors } from '../constants/Colors';

interface AddTripFormProps {
  onAdd: (
    title: string,
    destination: string,
    date: string,
    rating: number
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

    const ratingNumber = Number(rating);

    if (
      ratingNumber < 1 ||
      ratingNumber > 5
    ) {
      Alert.alert(
        'Error',
        'Rating must be between 1 and 5'
      );
      return;
    }

    const dateRegex = /^\d{4}-\d{2}$/;

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
      ratingNumber
    );

    setTitle('');
    setDestination('');
    setDate('');
    setRating('');
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
        value={title}
        onChangeText={setTitle}
        style={styles.input}
      />

      <TextInput
        placeholder="Destination"
        placeholderTextColor={
          Colors.textSecondary
        }
        value={destination}
        onChangeText={setDestination}
        style={styles.input}
      />

      <TextInput
        placeholder="Date YYYY-MM"
        placeholderTextColor={
          Colors.textSecondary
        }
        value={date}
        onChangeText={setDate}
        style={styles.input}
      />

      <TextInput
        placeholder="Rating 1-5"
        placeholderTextColor={
          Colors.textSecondary
        }
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={styles.input}
      />

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
    borderRadius: 16,
    padding: 16,
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
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    color: Colors.textPrimary,
  },

  button: {
    backgroundColor: Colors.accent,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 4,
  },

  buttonText: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});