import { useState, useEffect } from "react";
import { Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import ArticleList from "../ArticleList";
import ProfileCard from "../ProfileCard";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts("https://rxjourneyserver.pythonanywhere.com/home/post_list/?page=1");
  }, []);

  async function fetchPosts(url) {
    if (!url) return;
    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      setPosts((prevPosts) => [...prevPosts, ...data.results]);
      setNextPage(data.next);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ProfileCard />
      <Text style={styles.header}>Chistev</Text>
      
      <ArticleList posts={posts} />

      {nextPage && (
        <TouchableOpacity style={styles.loadMoreButton} onPress={() => fetchPosts(nextPage)} disabled={loading}>
          <Text style={styles.loadMoreText}>Load More</Text>
        </TouchableOpacity>
      )}
      
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loadMoreButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: "#242424",
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    marginTop: 20,
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#242424",
  },
});
