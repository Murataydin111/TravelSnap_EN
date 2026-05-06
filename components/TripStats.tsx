import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

interface TripStatsProps {
  tripCount: number;
  averageRating: number;
  countries: number;
}

export default function TripStats({
  tripCount,
  averageRating,
  countries,
}: TripStatsProps) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.number}>
          {tripCount}
        </Text>

        <Text style={styles.label}>
          Trips
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>
          {averageRating.toFixed(1)}
        </Text>

        <Text style={styles.label}>
          Avg rating
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.number}>
          {countries}
        </Text>

        <Text style={styles.label}>
          Countries
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },

  card: {
    flex: 1,
    backgroundColor: Colors.card,
    padding: 12,
    borderRadius: 14,
    alignItems: 'center',
  },

  number: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },

  label: {
    marginTop: 4,
    fontSize: 12,
    color: Colors.textSecondary,
  },
});