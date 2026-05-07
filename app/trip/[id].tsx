import {
    Alert,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    Stack,
    useLocalSearchParams,
    useRouter,
} from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import RatingStars from '../../components/RatingStars';

import { useTrips } from '../../context/TripContext';

import { Colors } from '../../constants/Colors';

export default function TripDetailScreen() {
  const router = useRouter();

  const { id } =
    useLocalSearchParams<{
      id: string;
    }>();

  const {
    trips,
    deleteTrip,
  } = useTrips();

  const trip = trips.find(
    (t) => t.id === id
  );

  if (!trip) {
    return null;
  }

  const handleDelete = () => {
    Alert.alert(
      'Delete Trip',
      'This action cannot be undone. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },

        {
          text: 'Delete',

          style: 'destructive',

          onPress: async () => {
            await deleteTrip(id);

            router.back();
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title:
            trip.title ||
            'Trip Details',
        }}
      />

      <View style={styles.container}>
        {trip.imageUri ? (
          <Image
            source={{
              uri: trip.imageUri,
            }}
            style={styles.heroImage}
          />
        ) : null}

        <Text style={styles.title}>
          {trip.title}
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="location-outline"
            size={18}
            color={Colors.textSecondary}
          />

          <Text style={styles.metaText}>
            {trip.destination}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={Colors.textSecondary}
          />

          <Text style={styles.metaText}>
            {trip.date}
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <RatingStars
            rating={trip.rating}
          />
        </View>

        <Pressable
          style={styles.button}
          onPress={() =>
            router.back()
          }
        >
          <Text style={styles.buttonText}>
            Back to list
          </Text>
        </Pressable>

        <Pressable
          style={styles.deleteButton}
          onPress={handleDelete}
        >
          <Ionicons
            name="trash-outline"
            size={18}
            color="white"
          />

          <Text
            style={
              styles.deleteButtonText
            }
          >
            Delete Trip
          </Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      Colors.background,

    padding: 20,
  },

  heroImage: {
    width: '100%',

    height: 250,

    borderRadius: 16,

    marginBottom: 20,
  },

  title: {
    color: Colors.textPrimary,

    fontSize: 28,

    fontWeight: 'bold',

    marginBottom: 20,
  },

  row: {
    flexDirection: 'row',

    alignItems: 'center',

    marginBottom: 12,

    gap: 8,
  },

  metaText: {
    color: Colors.textSecondary,

    fontSize: 16,
  },

  ratingContainer: {
    marginTop: 20,
  },

  button: {
    marginTop: 40,

    backgroundColor:
      Colors.primary,

    padding: 14,

    borderRadius: 10,

    alignItems: 'center',
  },

  buttonText: {
    color: Colors.background,

    fontSize: 16,

    fontWeight: 'bold',
  },

  deleteButton: {
    marginTop: 16,

    backgroundColor:
      Colors.accent,

    padding: 14,

    borderRadius: 10,

    flexDirection: 'row',

    justifyContent: 'center',

    alignItems: 'center',

    gap: 8,
  },

  deleteButtonText: {
    color: 'white',

    fontWeight: 'bold',
  },
});