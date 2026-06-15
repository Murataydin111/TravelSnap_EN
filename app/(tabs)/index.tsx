import { Link } from 'expo-router';
import { useCallback } from 'react';
import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';

import AddTripForm from '../../components/AddTripForm';
import AnimatedTripCard from '../../components/AnimatedTripCard';
import EmptyState from '../../components/EmptyState';
import FAB from '../../components/FAB';
import ScreenHeader from '../../components/ScreenHeader';
import SkeletonCard from '../../components/SkeletonCard';
import TripCard from '../../components/TripCard';
import TripStats from '../../components/TripStats';

import { Colors } from '../../constants/Colors';
import { useTrips } from '../../context/TripContext';

const CARD_HEIGHT = 300;

export default function HomeScreen() {
  const {
    trips,
    addTrip,
    loading,
    deleteTrip,
  } = useTrips();

  const handleDelete = useCallback(
    (id: string) => {
      deleteTrip(id);
    },
    [deleteTrip]
  );

  if (loading) {
  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <View
        style={styles.contentContainer}
      >
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </View>
    </SafeAreaView>
  );
}

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      <Animated.FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        ListHeaderComponent={
          <>
            <ScreenHeader tripCount={trips.length} />

            <TripStats trips={trips} />

            <AddTripForm
              onAdd={(trip) => addTrip(trip)}
            />
          </>
        }
        ListEmptyComponent={<EmptyState />}
        getItemLayout={(_, index) => ({
          length: CARD_HEIGHT,
          offset: CARD_HEIGHT * index,
          index,
        })}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={8}
        removeClippedSubviews
        renderItem={({ item, index }) => (
          <AnimatedTripCard
            index={index}
            onDelete={() =>
              handleDelete(item.id)
            }
          >
            <Link
              href={{
                pathname:
                  '/trip/[id]' as any,
                params: {
                  id: item.id,
                },
              }}
              asChild
            >
              <Pressable>
                <TripCard
                  {...item}
                  onDelete={() =>
                    handleDelete(item.id)
                  }
                />
              </Pressable>
            </Link>
          </AnimatedTripCard>
        )}
      />

      <FAB />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },

  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },

  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
});