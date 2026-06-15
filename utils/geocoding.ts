import * as Location from 'expo-location';

export async function getCoordinates(
  destination: string
) {
  try {
    const results =
      await Location.geocodeAsync(
        destination
      );

    if (results.length === 0) {
      return undefined;
    }

    return {
      latitude:
        results[0].latitude,
      longitude:
        results[0].longitude,
    };
  } catch {
    return undefined;
  }
}