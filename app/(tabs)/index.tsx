import { useState } from 'react';

import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

import { Link } from 'expo-router';

import AddTripForm from '../../components/AddTripForm';
import EmptyState from '../../components/EmptyState';
import ScreenHeader from '../../components/ScreenHeader';
import TripCard from '../../components/TripCard';
import TripStats from '../../components/TripStats';

import { Colors } from '../../constants/Colors';

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  rating: number;
  imageUri?: string;
}

export default function HomeScreen() {
  const [trips, setTrips] = useState<
    Trip[]
  >([]);

  const handleAddTrip = (
    title: string,
    destination: string,
    date: string,
    rating: number,
    imageUri?: string
  ) => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      title,
      destination,
      date,
      rating,
      imageUri,
    };

    setTrips((prevTrips) => [
      newTrip,
      ...prevTrips,
    ]);
  };

  const handleDeleteTrip = (
    id: string
  ) => {
    setTrips((prevTrips) =>
      prevTrips.filter(
        (trip) => trip.id !== id
      )
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.contentContainer
        }
      >
        <ScreenHeader
          tripCount={trips.length}
        />

        <TripStats trips={trips} />

        <AddTripForm
          onAdd={handleAddTrip}
        />

        {trips.length === 0 ? (
          <EmptyState />
        ) : (
          trips.map((trip) => (
            <Link
              key={trip.id}
              href={{
                pathname:
                  '/trip/[id]' as any,

                params: {
                  id: trip.id,
                  title: trip.title,
                  destination:
                    trip.destination,
                  date: trip.date,
                  rating: String(
                    trip.rating
                  ),
                  imageUri:
                    trip.imageUri,
                },
              }}
              asChild
            >
              <Pressable>
                <TripCard
                  {...trip}
                  onDelete={() =>
                    handleDeleteTrip(
                      trip.id
                    )
                  }
                />
              </Pressable>
            </Link>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },

  container: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },

  contentContainer: {
    padding: 16,

    paddingBottom: 40,
  },
});