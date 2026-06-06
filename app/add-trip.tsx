import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import AddTripForm from '@/components/AddTripForm';
import { Colors } from '@/constants/Colors';
import type { TripData } from '@/types/trip';
import { useTrips } from '../context/TripContext';

export default function AddTripScreen() {
  const { addTrip } = useTrips();
  const router = useRouter();

  const handleAdd = (
    trip: TripData,
    id: string
  ): void => {
    addTrip(trip);
    router.back();
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom']}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
      >
        <ScrollView
          contentContainerStyle={
            styles.content
          }
        >
          <AddTripForm
            onAdd={handleAdd}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor:
      Colors.background,
  },

  content: {
    padding: 16,
  },
});