<<<<<<< HEAD
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
=======
import { StyleSheet, Text, View, Pressable } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
>>>>>>> 5108797 (fix: prevent navigation when deleting trip card)

import { Ionicons } from '@expo/vector-icons';

import RatingStars from './RatingStars';

import { Colors } from '../constants/Colors';

interface TripCardProps {
  title: string;
  destination: string;
  date: string;
  rating: number;
  imageUri?: string;
  onDelete?: () => void;
}

<<<<<<< HEAD
export default function TripCard({
  title,
  destination,
  date,
  rating,
  imageUri,
  onDelete,
}: TripCardProps) {
=======
export default function TripCard({ title, destination, date, rating, onDelete }: TripCardProps) {
  const handleDeletePress = (event: GestureResponderEvent): void => {
    // Prevent parent card press (Link navigation) when deleting.
    event.stopPropagation();
    onDelete?.();
  };

>>>>>>> 5108797 (fix: prevent navigation when deleting trip card)
  return (
    <View style={styles.card}>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.cardImage}
        />
      )}

      <View style={styles.topRow}>
        <Text style={styles.title}>
          {title}
        </Text>

        {onDelete && (
<<<<<<< HEAD
          <Pressable
            style={styles.deleteButton}
            onPress={onDelete}
          >
            <Ionicons
              name="trash-outline"
              size={18}
              color={Colors.accent}
            />
=======
          <Pressable onPress={handleDeletePress} style={styles.deleteButton}>
            <Ionicons name="close" size={16} color={Colors.accent} />
>>>>>>> 5108797 (fix: prevent navigation when deleting trip card)
          </Pressable>
        )}
      </View>

      <Text style={styles.meta}>
        {destination} | {date}
      </Text>

      <View style={styles.ratingContainer}>
        <RatingStars rating={rating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },

  cardImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: 12,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: 'bold',
  },

  meta: {
    color: Colors.textSecondary,
    fontSize: 13,
    marginTop: 4,
  },

  ratingContainer: {
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: 'rgba(233,69,96,0.15)',
    borderRadius: 12,
    padding: 6,
  },
});