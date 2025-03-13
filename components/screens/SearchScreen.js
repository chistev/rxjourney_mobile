import { Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";

export default function SearchScreen() {
  const route = useRoute();
  const { results, query } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Search Results for "{query}"</Text>

      {results.length > 0 ? (
        results.map((post) => (
          <TouchableOpacity key={post.id} style={styles.postCard} onPress={() => 
          alert(`Navigate to ${post.slug}`)}>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postSnippet}>{post.content.slice(0, 100)}...</Text>
          </TouchableOpacity>
        ))
      ) : (
        <Text style={styles.noResults}>No posts found.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 15 },
  postCard: { padding: 15, marginBottom: 10, backgroundColor: "#f9f9f9", borderRadius: 5 },
  postTitle: { fontSize: 18, fontWeight: "bold" },
  postSnippet: { fontSize: 14, color: "#555" },
  noResults: { fontSize: 16, color: "#888", textAlign: "center", marginTop: 20 },
});
