import { View, Text, StyleSheet } from "react-native";

export default function SearchScreen({ route }) {
  const { query } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Results for "{query}"</Text>
      {/* Implement search results here */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
