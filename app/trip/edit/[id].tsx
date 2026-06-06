
import { useEffect } from 'react';

import {
    ActivityIndicator,
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import {
    useLocalSearchParams,
    useRouter,
} from 'expo-router';
import {
    Controller,
    useForm,
} from 'react-hook-form';


import { useTrips } from '../../../context/TripContext';

import { Colors } from '../../../constants/Colors';

import {
    tripSchema,
    type TripFormData,
} from '../../../types/tripSchema';

export default function EditTripScreen() {
  const router = useRouter();
  const navigation = useNavigation();

  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const {
    trips,
    updateTrip,
  } = useTrips();

  const trip = trips.find(
    (t) => t.id === id
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
      isDirty,
    },
  } = useForm<TripFormData>({
    resolver: zodResolver(
      tripSchema
    ),
    defaultValues: {
      title: '',
      destination: '',
      date: '',
      rating: 1,
    },
  });

  useEffect(() => {
    if (!trip) return;

    reset({
      title: trip.title,
      destination:
        trip.destination,
      date: trip.date,
      rating: trip.rating,
      imageUri: trip.imageUri,
      galleryUris:
        trip.galleryUris,
    });
  }, [trip, reset]);
  useEffect(() => {
  const unsubscribe =
    navigation.addListener(
      'beforeRemove',
      (e) => {
        if (!isDirty) {
          return;
        }

        e.preventDefault();

        Alert.alert(
          'Discard changes?',
          'You have unsaved changes.',
          [
            {
              text: 'Stay',
              style: 'cancel',
            },
            {
              text: 'Discard',
              style: 'destructive',
              onPress: () =>
                navigation.dispatch(
                  e.data.action
                ),
            },
          ]
        );
      }
    );

  return unsubscribe;
}, [navigation, isDirty]);

  const onSubmit = async (
    data: TripFormData
  ) => {
    if (!trip) return;

    try {
      await updateTrip(
        trip.id,
        data
      );

      router.back();
    } catch (err) {
      Alert.alert(
        'Error',
        String(err)
      );
    }
  };

  if (!trip) {
    return (
      <View style={styles.form}>
        <Text
          style={styles.formTitle}
        >
          Trip not found
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.form}>
      <Text
        style={styles.formTitle}
      >
        Edit Trip
      </Text>

      <Controller
        control={control}
        name="title"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <TextInput
            style={styles.input}
            placeholder="Title"
            placeholderTextColor={
              Colors.textSecondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.title && (
        <Text style={styles.error}>
          {
            errors.title
              .message
          }
        </Text>
      )}

      <Controller
        control={control}
        name="destination"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <TextInput
            style={styles.input}
            placeholder="Destination"
            placeholderTextColor={
              Colors.textSecondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.destination && (
        <Text style={styles.error}>
          {
            errors
              .destination
              .message
          }
        </Text>
      )}

      <Controller
        control={control}
        name="date"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <TextInput
            style={styles.input}
            placeholder="Date (YYYY-MM-DD)"
            placeholderTextColor={
              Colors.textSecondary
            }
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      {errors.date && (
        <Text style={styles.error}>
          {
            errors.date
              .message
          }
        </Text>
      )}

      <Controller
        control={control}
        name="rating"
        render={({
          field: {
            onChange,
            value,
          },
        }) => (
          <TextInput
            style={styles.input}
            placeholder="Rating (1-5)"
            placeholderTextColor={
              Colors.textSecondary
            }
            value={String(value)}
            onChangeText={(
              text
            ) =>
              onChange(
                Number(text)
              )
            }
            keyboardType="numeric"
          />
        )}
      />

      {errors.rating && (
        <Text style={styles.error}>
          {
            errors.rating
              .message
          }
        </Text>
      )}

      <Pressable
        style={styles.addButton}
        onPress={handleSubmit(
          onSubmit
        )}
        disabled={
          isSubmitting
        }
      >
        {isSubmitting ? (
          <ActivityIndicator />
        ) : (
          <Text
            style={
              styles.addButtonText
            }
          >
            Update Trip
          </Text>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    backgroundColor:
      Colors.card,
    padding: 16,
  },

  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color:
      Colors.textPrimary,
  },

  input: {
    backgroundColor:
      Colors.inputBg,
    borderWidth: 1,
    borderColor:
      Colors.inputBorder,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    fontSize: 16,
    color:
      Colors.textPrimary,
  },

  error: {
    color: '#ff6b6b',
    marginBottom: 8,
    fontSize: 12,
  },

  addButton: {
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

