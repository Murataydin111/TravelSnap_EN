import { useState } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';

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
}

export default function HomeScreen() {
  const [trips, setTrips] = useState<Trip[]>(
    []
  );

  const handleAddTrip = (
    title: string,
    destination: string,
    date: string,
    rating: number
  ) => {
    const newTrip: Trip = {
      id: Date.now().toString(),
      title,
      destination,
      date,
      rating,
    };

    setTrips([...trips, newTrip]);
  };

  const handleDeleteTrip = (id: string) => {
    setTrips(
      trips.filter((trip) => trip.id !== id)
    );
  };

  const averageRating =
    trips.length > 0
      ? trips.reduce(
          (sum, trip) => sum + trip.rating,
          0
        ) / trips.length
      : 0;

  const countries = new Set(
    trips.map((trip) => trip.destination)
  ).size;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        style={styles.container}
        contentContainerStyle={
          styles.content
        }
      >
        <ScreenHeader
          tripCount={trips.length}
        />

        <TripStats
          tripCount={trips.length}
          averageRating={averageRating}
          countries={countries}
        />

        <AddTripForm
          onAdd={handleAddTrip}
        />

        {trips.length === 0 ? (
          <EmptyState />
        ) : (
          trips.map((trip) => (
            <TripCard
              key={trip.id}
              title={trip.title}
              destination={
                trip.destination
              }
              date={trip.date}
              rating={trip.rating}
              onDelete={() =>
                handleDeleteTrip(trip.id)
              }
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  content: {
    padding: 16,
  },
});