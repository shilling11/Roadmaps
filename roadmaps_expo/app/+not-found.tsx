import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link, Stack, Href } from "expo-router";

const INDEX = "/" as Href

export default function NotFound() {
  return (
    <>
     <Stack.Screen options={{ title: "Not Found" }}/>
     <View style={styles.container}>
       <Text style={styles.text}><h1>Oops, page not found...</h1></Text>
       <Link href={INDEX} style={styles.button}>Go to Home screen</Link>
     </View>
    </>
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