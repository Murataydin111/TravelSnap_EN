import {
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

import { Colors } from '../../constants/Colors';

export default function TripDetailScreen() {
  const router = useRouter();

  const {
    title,
    destination,
    date,
    rating,
    imageUri,
  } = useLocalSearchParams<{
    title: string;
    destination: string;
    date: string;
    rating: string;
    imageUri?: string;
  }>();

  return (
    <>
      <Stack.Screen
        options={{
          title:
            title || 'Trip Details',
        }}
      />

      <View style={styles.container}>
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={styles.heroImage}
          />
        ) : null}

        <Text style={styles.title}>
          {title}
        </Text>

        <View style={styles.row}>
          <Ionicons
            name="location-outline"
            size={18}
            color={Colors.textSecondary}
          />

          <Text style={styles.metaText}>
            {destination}
          </Text>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="calendar-outline"
            size={18}
            color={Colors.textSecondary}
          />

          <Text style={styles.metaText}>
            {date}
          </Text>
        </View>

        <View style={styles.ratingContainer}>
          <RatingStars
            rating={Number(rating)}
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
});