import { View, Text, StyleSheet } from "react-native";

export default function PostIcons() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>❤️</Text>
      <Text style={styles.icon}>💬</Text>
      <Text style={styles.icon}>🔗</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  icon: {
    fontSize: 18,
  },
});
