import { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import TripCard from '../../components/TripCard';

interface Trip {
  id: string;
  title: string;
  destination: string;
  date: string;
  rating: number;
}

export default function HomeScreen() {
  const [title, setTitle] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [rating, setRating] = useState('');

  const [trips, setTrips] = useState<Trip[]>([]);

  const handleAddTrip = () => {
    if (
      !title.trim() ||
      !destination.trim() ||
      !date.trim() ||
      !rating.trim()
    ) {
      return;
    }

    const ratingNumber = Number(rating);

    if (ratingNumber < 1 || ratingNumber > 5) {
      return;
    }

    const dateRegex = /^\d{4}-\d{2}$/;

    if (!dateRegex.test(date)) {
      return;
    }

    const newTrip: Trip = {
      id: Date.now().toString(),
      title,
      destination,
      date,
      rating: ratingNumber,
    };

    setTrips([...trips, newTrip]);

    setTitle('');
    setDestination('');
    setDate('');
    setRating('');
  };

  const handleDelete = (id: string) => {
    setTrips(trips.filter((trip) => trip.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>TravelSnap</Text>

      <TextInput
        style={styles.input}
        placeholder="Trip title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.input}
        placeholder="Destination"
        value={destination}
        onChangeText={setDestination}
      />

      <TextInput
        style={styles.input}
        placeholder="Date YYYY-MM"
        value={date}
        onChangeText={setDate}
      />

      <TextInput
        style={styles.input}
        placeholder="Rating 1-5"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />

      <Pressable style={styles.button} onPress={handleAddTrip}>
        <Text style={styles.buttonText}>Add Trip</Text>
      </Pressable>

      <Text style={styles.tripCount}>
        Total Trips: {trips.length}
      </Text>

      {trips.map((trip) => (
        <TripCard
          key={trip.id}
          title={trip.title}
          destination={trip.destination}
          date={trip.date}
          rating={trip.rating}
          onDelete={() => handleDelete(trip.id)}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0F4F8',
  },

  heading: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },

  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#61DAFB',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  tripCount: {
    fontSize: 18,
    marginBottom: 16,
    fontWeight: '600',
  },
});