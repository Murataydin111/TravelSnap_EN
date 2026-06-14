import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import MapView, {
    Callout,
    Marker,
} from 'react-native-maps';

import { Colors } from '../../constants/Colors';
import { useTrips } from '../../context/TripContext';
import { useLocation } from '../../hooks/useLocation';

export default function MapScreen() {
  const {
    location,
    loading,
  } = useLocation();

  const { trips } =
    useTrips();

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
    <View style={styles.container}>
      <MapView
        style={styles.map}
        showsUserLocation
        initialRegion={{
          latitude:
            location?.coords
              .latitude ??
            52.2297,
          longitude:
            location?.coords
              .longitude ??
            21.0122,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {trips
          .filter(
            (trip) =>
              trip.coordinates
          )
          .map((trip) => (
            <Marker
              key={trip.id}
              coordinate={{
                latitude:
                  trip
                    .coordinates!
                    .latitude,
                longitude:
                  trip
                    .coordinates!
                    .longitude,
              }}
            >
              <Callout>
                <View>
                  <Text>
                    {trip.title}
                  </Text>

                  <Text>
                    {
                      trip.destination
                    }
                  </Text>
                </View>
              </Callout>
            </Marker>
          ))}
      </MapView>

      <View style={styles.overlay}>
        <Text style={styles.text}>
          Travel Map
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent:
      'center',
    alignItems: 'center',
    backgroundColor:
      Colors.background,
  },

  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  overlay: {
    position: 'absolute',
    top: 60,
    alignSelf: 'center',
    backgroundColor:
      Colors.card,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
  },

  text: {
    color:
      Colors.textPrimary,
    fontWeight: 'bold',
  },
});