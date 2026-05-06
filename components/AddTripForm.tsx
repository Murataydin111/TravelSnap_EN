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

    const numericRating = Number(rating);

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
      numericRating
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