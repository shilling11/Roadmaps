import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}><h1>Hello World!</h1></Text>
      <Link href='/about' style={styles.button}>Go to About screen</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },

  text: {
    color: '#fff'
  },

  button: {
    fontSize: 20,
    color: '#fff'
  }
});