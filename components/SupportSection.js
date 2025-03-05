import { View, Text, StyleSheet } from "react-native";

export default function SupportSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Support our content ❤️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    padding: 20,
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
