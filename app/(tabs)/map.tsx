import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import {
    useEffect,
    useRef,
} from 'react';

import ClusteredMapView from 'react-native-map-clustering';

import {
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
  const DARK_MAP_STYLE = [
  {
    elementType: 'geometry',
    stylers: [{ color: '#1d2c4d' }],
  },
  {
    elementType: 'labels.text.fill',
    stylers: [{ color: '#8ec3b9' }],
  },
  {
    elementType: 'labels.text.stroke',
    stylers: [{ color: '#1a3646' }],
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{ color: '#304a7d' }],
  },
  {
    featureType: 'water',
    elementType: 'geometry',
    stylers: [{ color: '#0e1626' }],
  },
];

  const { trips } =
    useTrips();

  const mapRef =
  useRef<any>(null);

  useEffect(() => {
    const tripsWithCoords =
      trips.filter(
        (trip) =>
          trip.coordinates
      );

    if (
      tripsWithCoords.length === 0
    ) {
      return;
    }

    setTimeout(() => {
      mapRef.current?.fitToCoordinates(
        tripsWithCoords.map(
          (trip) => ({
            latitude:
              trip.coordinates!
                .latitude,
            longitude:
              trip.coordinates!
                .longitude,
          })
        ),
        {
          edgePadding: {
            top: 80,
            right: 80,
            bottom: 80,
            left: 80,
          },
          animated: true,
        }
      );
    }, 500);
  }, [trips]);

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
  <ClusteredMapView
  ref={mapRef}
  clusteringEnabled
  radius={50}
  spiralEnabled
  animationEnabled
  customMapStyle={DARK_MAP_STYLE}
  style={styles.map}
  showsUserLocation
  initialRegion={{
    latitude:
      location?.coords
        ?.latitude ??
      52.2297,
    longitude:
      location?.coords
        ?.longitude ??
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
              <View
                style={
                  styles.customMarker
                }
              >
                {trip.imageUri ? (
                  <Image
                    source={{
                      uri: trip.imageUri,
                    }}
                    style={
                      styles.markerImage
                    }
                  />
                ) : (
                  <View
                    style={
                      styles.markerPlaceholder
                    }
                  >
                    <Text>
                      📍
                    </Text>
                  </View>
                )}
              </View>

              <Callout>
                <View
                  style={
                    styles.calloutContainer
                  }
                >
                  {trip.imageUri ? (
                    <Image
                      source={{
                        uri: trip.imageUri,
                      }}
                      style={
                        styles.calloutImage
                      }
                    />
                  ) : null}

                  <View>
                    <Text
                      style={
                        styles.calloutTitle
                      }
                    >
                      {trip.title}
                    </Text>

                    <Text
                      style={
                        styles.calloutDestination
                      }
                    >
                      {trip.destination}
                    </Text>
                  </View>
                </View>
              </Callout>
            </Marker>
          ))}
      </ClusteredMapView>

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

  calloutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    maxWidth: 200,
  },

  calloutImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },

  calloutTitle: {
    fontWeight: 'bold',
  },

  calloutDestination: {
    color:
      Colors.textSecondary,
  },
  customMarker: {
  width: 50,
  height: 50,
  borderRadius: 25,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: 'white',
  backgroundColor:
    Colors.card,
},

markerImage: {
  width: '100%',
  height: '100%',
},

markerPlaceholder: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
});