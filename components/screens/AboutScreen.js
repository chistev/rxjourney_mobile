import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Chistev</Text>
      <Text style={styles.content}>Welcome to my blog. I write about tech, coding, and more!</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
  },
});
