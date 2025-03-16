import { Text, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import ArticleList from "../ArticleList";

export default function SearchScreen() {
  const route = useRoute();
  const { results, query } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Search Results for "{query}"</Text>

      {results.length > 0 ? (
        <ArticleList posts={results} />
      ) : (
        <Text style={styles.noResults}>No posts found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  noResults: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 20 },
});
