import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

import {
  Stack,
  useLocalSearchParams,
  useRouter,
} from 'expo-router';

import { Ionicons } from '@expo/vector-icons';

import CountryCard from '../../components/CountryCard';
import RatingStars from '../../components/RatingStars';

import { useTrips } from '../../context/TripContext';

import { useFetch } from '../../hooks/useFetch';



import {
  RESTCOUNTRIES_BASE_URL,
  UNSPLASH_ACCESS_KEY,
  UNSPLASH_BASE_URL,
} from '../../constants/api';

import type {
  Country,
} from '../../types/country';

import type {
  UnsplashResponse,
} from '../../types/unsplash';

import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
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

  const {
    data: photoData,
    loading: photoLoading,
  } = useFetch<UnsplashResponse>(
    trip
      ? `${UNSPLASH_BASE_URL}/search/photos?query=${encodeURIComponent(
          trip.destination
        )}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
      : ''
  );

  const {
    data: countryData,
  } = useFetch<Country[]>(
    trip
      ? `${RESTCOUNTRIES_BASE_URL}/name/${encodeURIComponent(
          trip.destination
        )}?fullText=false`
      : ''
  );
  const heroImage =
  photoData?.results?.[0]?.urls
    ?.regular ||
  trip?.imageUri;

const country =
  countryData?.[0];

const [address, setAddress] =
  useState('');

const [addressLoading, setAddressLoading] =
  useState(false);

useEffect(() => {
  if (!trip?.coordinates) {
    return;
  }

  (async () => {
    try {
      setAddressLoading(true);

      const result =
        await Location.reverseGeocodeAsync(
          trip.coordinates!
        );

      if (result.length > 0) {
        const place = result[0];

        const formatted = [
          place.street,
          place.city,
          place.region,
          place.country,
        ]
          .filter(Boolean)
          .join(', ');

        setAddress(formatted);
      }
    } catch {
      // ignore
    } finally {
      setAddressLoading(false);
    }
  })();
}, [trip]);

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
  if (!trip) {
  return null;
}

  return (
    <>
      <Stack.Screen
        options={{
          title:
            trip.title ||
            'Trip Details',
        }}
      />

      <ScrollView
        style={styles.container}
      >
        {photoLoading ? (
          <ActivityIndicator
            size="large"
            color={Colors.primary}
          />
        ) : heroImage ? (
         <Animated.Image
  source={{ uri: heroImage }}
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

  <View>
    <Text style={styles.metaText}>
      {trip.destination}
    </Text>

    {addressLoading ? (
      <ActivityIndicator
        size="small"
        color={Colors.primary}
      />
    ) : address ? (
      <Text style={styles.addressText}>
        {address}
      </Text>
    ) : null}
  </View>
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

{country ? (
  <CountryCard
    country={country}
  />
) : null}

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
  style={styles.editButton}
  onPress={() =>
    router.push(
      `/trip/edit/${trip.id}`
    )
  }
>
  <Text style={styles.editButtonText}>
    Edit Trip
  </Text>
</Pressable>

<Pressable
  style={
    styles.deleteButton
  }
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
      </ScrollView>
    </>
  );
}

const styles =
  StyleSheet.create({
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
      color:
        Colors.textPrimary,
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
      color:
        Colors.textSecondary,
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
      color:
        Colors.background,
      fontSize: 16,
      fontWeight: 'bold',
    },
    editButton: {
  marginTop: 16,
  backgroundColor:
    Colors.primary,
  padding: 14,
  borderRadius: 10,
  alignItems: 'center',
},

editButtonText: {
  color:
    Colors.background,
  fontWeight: 'bold',
},

    deleteButton: {
      marginTop: 16,
      backgroundColor:
        Colors.accent,
      padding: 14,
      borderRadius: 10,
      flexDirection: 'row',
      justifyContent:
        'center',
      alignItems: 'center',
      gap: 8,
    },

    deleteButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    addressText: {
  marginTop: 4,
  marginLeft: 24,
  color: Colors.textSecondary,
  fontSize: 12,
},
  });