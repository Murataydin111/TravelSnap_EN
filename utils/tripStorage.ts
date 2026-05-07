import AsyncStorage from '@react-native-async-storage/async-storage';

import { Trip } from '../types/trip';

const STORAGE_KEY = 'travelsnap_trips';

export const saveTrips = async (
  trips: Trip[]
): Promise<void> => {
  try {
    const json = JSON.stringify(trips);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      json
    );
  } catch (error) {
    console.log(error);
  }
};

export const loadTrips = async (): Promise<Trip[]> => {
  try {
    const json =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    return json ? JSON.parse(json) : [];
  } catch (error) {
    console.log(error);

    return [];
  }
};