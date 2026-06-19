import { StyleSheet, Text, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../constants/Colors';

const destinations = [
  'Paris',
  'Rome',
  'Warsaw',
  'Istanbul',
  'Barcelona',
  'Prague',
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Explore Destinations</Text>

        {destinations.map((destination, index) => (
          <Animated.View
            key={destination}
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.card}
          >
            <Text style={styles.cardTitle}>{destination}</Text>
          </Animated.View>
        ))}
      </View>
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
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1F2937',
    padding: 20,
    borderRadius: 16,
    marginBottom: 12,
  },

  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});