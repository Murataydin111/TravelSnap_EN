import {
  Alert,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://picsum.photos/200',
        }}
        style={styles.image}
      />

      <Text style={styles.title}>TravelSnap</Text>

      <Text style={styles.subtitle}>
        Your travel journal
      </Text>

      <Text style={styles.author}>
        Murat Aydin
      </Text>

      <Pressable
        style={styles.button}
        onPress={() =>
          Alert.alert('Welcome to TravelSnap!')
        }
      >
        <Text style={styles.buttonText}>
          Press Me
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },

  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 18,
    color: 'gray',
    marginTop: 10,
  },

  author: {
    fontSize: 16,
    marginTop: 15,
  },

  button: {
    marginTop: 30,
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },

  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});