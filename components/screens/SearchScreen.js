import { Text, ScrollView, StyleSheet, Platform, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import ArticleList from "../ArticleList";
import Navbar from "../Navbar";

export default function SearchScreen() {
  const route = useRoute();
  const { results, query } = route.params;

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Navbar /> 
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>Search Results for "{query}"</Text>
        {results.length > 0 ? (
          <ArticleList posts={results} />
        ) : (
          <Text style={styles.noResults}>No posts found.</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0, // Ensure spacing for Android status bar
  },
  container: { 
    flex: 1, 
    backgroundColor: "#fff", 
    padding: 20 
  },
  heading: { 
    fontSize: 24, 
    fontWeight: "bold", 
    marginBottom: 15 
  },
  noResults: { 
    fontSize: 16, 
    color: "#888", 
    textAlign: "center", 
    marginTop: 20 
  },
});
