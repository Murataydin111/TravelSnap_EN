import {
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import type { Country } from '../types/country';

import { Colors } from '../constants/Colors';

interface Props {
  country: Country;
}

export default function CountryCard({
  country,
}: Props) {
  const currency =
    country.currencies
      ? Object.values(
          country.currencies
        )[0]
      : null;

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: country.flags.png,
        }}
        style={styles.flag}
      />

      <Text style={styles.title}>
        {country.name.common}
      </Text>

      <Text style={styles.text}>
        Capital:{' '}
        {country.capital?.[0] ??
          'Unknown'}
      </Text>

      <Text style={styles.text}>
        Region:{' '}
        {country.region}
      </Text>

      <Text style={styles.text}>
        Currency:{' '}
        {currency?.name ??
          'Unknown'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    borderRadius: 12,
    backgroundColor:
      Colors.card,
  },

  flag: {
    width: '100%',
    height: 160,
    borderRadius: 12,
    marginBottom: 12,
  },

  title: {
    color: Colors.textPrimary,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  text: {
    color: Colors.textSecondary,
    marginBottom: 4,
  },
});