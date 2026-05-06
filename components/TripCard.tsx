import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { Colors } from '../constants/Colors';
import RatingStars from './RatingStars';

interface TripCardProps {
  title: string;
  destination: string;
  date: string;
  rating: number;
  onDelete: () => void;
}

export default function TripCard({
  title,
  destination,
  date,
  rating,
  onDelete,
}: TripCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.meta}>
        {destination} | {date}
      </Text>

      <RatingStars rating={rating} />

      <Pressable
        style={styles.deleteButton}
        onPress={onDelete}
      >
        <Text style={styles.deleteText}>
          Delete
        </Text>
      </Pressable>
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

  deleteButton: {
    alignSelf: 'flex-start',
    marginTop: 12,
    backgroundColor: 'rgba(233,69,96,0.15)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  deleteText: {
    color: Colors.accent,
    fontWeight: '600',
  },
});