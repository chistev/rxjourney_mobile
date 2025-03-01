import { View, Text, StyleSheet } from "react-native";

export default function ProfileCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>Profile Card</Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
