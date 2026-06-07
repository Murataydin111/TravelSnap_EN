import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import { Link } from 'expo-router';

import AddTripForm from '../../components/AddTripForm';
import EmptyState from '../../components/EmptyState';
import ScreenHeader from '../../components/ScreenHeader';
import TripCard from '../../components/TripCard';
import TripStats from '../../components/TripStats';

import { useTrips } from '../../context/TripContext';

import { Colors } from '../../constants/Colors';

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
      <View style={styles.loader}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle="light-content"
      />

      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          styles.contentContainer
        }
        ListHeaderComponent={
          <>
            <ScreenHeader
              tripCount={trips.length}
            />

            <TripStats trips={trips} />

            <AddTripForm
              onAdd={(trip) =>
                addTrip(trip)
              }
            />
          </>
        }
        ListEmptyComponent={
          <EmptyState />
        }
        getItemLayout={(
          _,
          index
        ) => ({
          length: CARD_HEIGHT,
          offset:
            CARD_HEIGHT * index,
          index,
        })}
        initialNumToRender={10}
        windowSize={5}
        maxToRenderPerBatch={8}
        removeClippedSubviews
        renderItem={({ item }) => (
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
          handleDelete(
            item.id
          )
        }
      />
    </Pressable>
  </Link>
)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor:
      Colors.background,
  },

  safeArea: {
    flex: 1,

    backgroundColor:
      Colors.background,
  },

  contentContainer: {
    padding: 16,

    paddingBottom: 40,
  },
});