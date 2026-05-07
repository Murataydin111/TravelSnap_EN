import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Colors } from '../../constants/Colors';

import { useTrips } from '../../context/TripContext';

export default function ProfileScreen() {
  const { trips } = useTrips();

  const averageRating =
    trips.length > 0
      ? (
          trips.reduce(
            (sum, trip) =>
              sum + trip.rating,
            0
          ) / trips.length
        ).toFixed(1)
      : '0.0';

  const countries =
    new Set(
      trips.map(
        (trip) => trip.destination
      )
    ).size;

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          MA
        </Text>
      </View>

      <Text style={styles.name}>
        Murat Aydin
      </Text>

      <Text style={styles.joined}>
        Joined March 2026
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.card}>
          <Text style={styles.value}>
            {trips.length}
          </Text>

          <Text style={styles.label}>
            Trips
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.value}>
            {countries}
          </Text>

          <Text style={styles.label}>
            Countries
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.value}>
            {averageRating}
          </Text>

          <Text style={styles.label}>
            Rating
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor:
      Colors.background,

    alignItems: 'center',

    paddingTop: 60,

    paddingHorizontal: 20,
  },

  avatar: {
    width: 100,

    height: 100,

    borderRadius: 50,

    backgroundColor:
      Colors.primary,

    justifyContent: 'center',

    alignItems: 'center',
  },

  avatarText: {
    fontSize: 36,

    fontWeight: 'bold',

    color: Colors.background,
  },

  name: {
    color: Colors.textPrimary,

    fontSize: 24,

    fontWeight: 'bold',

    marginTop: 20,
  },

  joined: {
    color: Colors.textSecondary,

    marginTop: 8,

    fontSize: 16,
  },

  statsRow: {
    flexDirection: 'row',

    marginTop: 40,

    gap: 12,
  },

  card: {
    flex: 1,

    backgroundColor: Colors.card,

    padding: 16,

    borderRadius: 16,

    alignItems: 'center',
  },

  value: {
    color: Colors.primary,

    fontSize: 24,

    fontWeight: 'bold',
  },

  label: {
    color: Colors.textSecondary,

    marginTop: 6,
  },
});