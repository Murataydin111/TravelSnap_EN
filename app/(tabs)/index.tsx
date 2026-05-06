import { ScrollView, StyleSheet } from 'react-native';

import TripCard from '../../components/TripCard';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TripCard
        title="Holiday in Greece"
        destination="Santorini"
        date="2024-07-15"
        rating={5}
      />

      <TripCard
        title="Weekend in Krakow"
        destination="Krakow"
        date="2024-09-20"
        rating={4}
      />

      <TripCard
        title="Trip to Bali"
        destination="Bali"
        date="2025-01-10"
        rating={5}
      />

      <TripCard
        title="Berlin Adventure"
        destination="Berlin"
        date="2025-03-18"
        rating={3}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f2f2f2',
    flexGrow: 1,
  },
});