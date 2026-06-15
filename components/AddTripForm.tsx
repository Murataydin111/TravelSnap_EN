import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Colors } from '@/constants/Colors';
import { useImagePicker } from '@/hooks/useImagePicker';
import type { TripData } from '@/types/trip';
import { getCoordinates } from '@/utils/geocoding';

interface AddTripFormProps {
  onAdd: (trip: TripData, id: string) => void;
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

const validate = (
  title: string,
  destination: string,
  date: string,
  rating: string
): string | null => {
  if (
    !title.trim() ||
    !destination.trim() ||
    !date.trim() ||
    !rating.trim()
  ) {
    return 'All fields are required!';
  }

  if (!DATE_REGEX.test(date)) {
    return 'Date must be in YYYY-MM-DD format!';
  }

  const ratingNum = Number(rating);

  if (
    isNaN(ratingNum) ||
    ratingNum < 1 ||
    ratingNum > 5
  ) {
    return 'Rating must be a number between 1 and 5!';
  }

  return null;
};

export default function AddTripForm({
  onAdd,
}: AddTripFormProps) {
  const [tripId] = useState(() =>
    Date.now().toString()
  );

  const [step, setStep] =
    useState(1);

  const [title, setTitle] =
    useState('');

  const [
    destination,
    setDestination,
  ] = useState('');

  const [date, setDate] =
    useState('');

  const [rating, setRating] =
    useState('');

  const [imageUri, setImageUri] =
    useState<string | undefined>();
    const destinationRef =
  useRef<TextInput>(null);

const dateRef =
  useRef<TextInput>(null);

const ratingRef =
  useRef<TextInput>(null);

  const { handleAddPhoto } =
    useImagePicker({
      tripId,
      onSaved: setImageUri,
      aspect: [16, 9],
    });

  const next = () => {
    if (
      step === 1 &&
      (!title.trim() ||
        !destination.trim())
    ) {
      Alert.alert(
        'Error',
        'Fill all fields'
      );
      return;
    }

    if (
      step === 2 &&
      (!date.trim() ||
        !rating.trim())
    ) {
      Alert.alert(
        'Error',
        'Fill all fields'
      );
      return;
    }

    setStep(step + 1);
  };

  const prev = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (): Promise<void> => {
    const error = validate(
      title,
      destination,
      date,
      rating
    );

    if (error) {
      Alert.alert(
        'Error',
        error
      );
      return;
    }
    const coordinates =
  await getCoordinates(
    destination.trim()
  );

    onAdd(
        {
  title: title.trim(),
  destination: destination.trim(),
  date: date.trim(),
  rating: Number(rating),
  imageUri,
  galleryUris: imageUri
    ? [imageUri]
    : [],
  coordinates,
},
     tripId
    );

    setTitle('');
    setDestination('');
    setDate('');
    setRating('');
    setImageUri(undefined);
    setStep(1);
  };

  return (
    <View style={styles.form}>
      <Text
        style={styles.formTitle}
      >
        Add new trip
      </Text>

      <Text style={styles.stepText}>
        Step {step} / 3
      </Text>

      {step === 1 && (
        <>
          <TextInput
  style={styles.input}
  placeholder="Title"
  autoFocus
  returnKeyType="next"
  onSubmitEditing={() =>
    destinationRef.current?.focus()
  }
  placeholderTextColor={
    Colors.textSecondary
  }
  value={title}
  onChangeText={setTitle}
/>

         <TextInput
  style={styles.input}
  placeholder="Destination"
  placeholderTextColor={
    Colors.textSecondary
  }
  value={destination}
  onChangeText={
    setDestination
  }
  ref={destinationRef}
  returnKeyType="done"
/>
        </>
      )}

      {step === 2 && (
        <>
          <TextInput
  style={styles.input}
  placeholder="Date (YYYY-MM-DD)"
  autoFocus
  placeholderTextColor={
    Colors.textSecondary
  }
  value={date}
  onChangeText={setDate}
  ref={dateRef}
  returnKeyType="next"
  onSubmitEditing={() =>
    ratingRef.current?.focus()
  }
/>

          <TextInput
  style={styles.input}
  placeholder="Rating (1-5)"
  placeholderTextColor={
    Colors.textSecondary
  }
  value={rating}
  onChangeText={setRating}
  keyboardType="numeric"
  ref={ratingRef}
  returnKeyType="done"
/>
        </>
      )}

      {step === 3 && (
        <>
          {imageUri ? (
            <View
              style={
                styles.previewContainer
              }
            >
              <Image
                source={{
                  uri: imageUri,
                }}
                style={
                  styles.preview
                }
              />

              <Pressable
                style={
                  styles.changePhotoButton
                }
                onPress={
                  handleAddPhoto
                }
              >
                <Text
                  style={
                    styles.changePhotoText
                  }
                >
                  Change photo
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={
                styles.photoPlaceholder
              }
              onPress={
                handleAddPhoto
              }
            >
              <Ionicons
                name="camera-outline"
                size={32}
                color={
                  Colors.textSecondary
                }
              />

              <Text
                style={
                  styles.photoPlaceholderText
                }
              >
                Add a photo
              </Text>
            </Pressable>
          )}
        </>
      )}

      <View style={styles.buttonRow}>
        {step > 1 && (
          <Pressable
            style={styles.addButton}
            onPress={prev}
          >
            <Text
              style={
                styles.addButtonText
              }
            >
              Back
            </Text>
          </Pressable>
        )}

        <Pressable
          style={styles.addButton}
          onPress={() => {
            if (step < 3) {
              next();
            } else {
              handleSubmit();
            }
          }}
        >
          <Text
            style={
              styles.addButtonText
            }
          >
            {step === 3
              ? 'Add Trip'
              : 'Next'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    backgroundColor:
      Colors.card,
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color:
      Colors.textPrimary,
  },

  stepText: {
    textAlign: 'center',
    marginBottom: 16,
    color:
      Colors.textSecondary,
  },

  input: {
    backgroundColor:
      Colors.inputBg,
    borderWidth: 1,
    borderColor:
      Colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    color:
      Colors.textPrimary,
  },

  photoPlaceholder: {
    borderWidth: 1.5,
    borderColor:
      Colors.inputBorder,
    borderStyle: 'dashed',
    borderRadius: 8,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },

  photoPlaceholderText: {
    color:
      Colors.textSecondary,
    fontSize: 14,
  },

  previewContainer: {
    marginBottom: 12,
    gap: 8,
  },

  preview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },

  changePhotoButton: {
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor:
      Colors.inputBg,
  },

  changePhotoText: {
    color:
      Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },

  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },

  addButton: {
    flex: 1,
    backgroundColor:
      Colors.accent,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },

  addButtonText: {
    color:
      Colors.textPrimary,
    fontWeight: 'bold',
    fontSize: 16,
  },
});