import { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import NetInfo from "@react-native-community/netinfo"; // To check internet connection
import ArticleList from "../ArticleList";
import ProfileCard from "../ProfileCard";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]); // Stores all posts
  const [nextPage, setNextPage] = useState(null); // Tracks the next page URL
  const [loading, setLoading] = useState(false); // Indicates loading state

  // Function to fetch posts
  const fetchPosts = async (url, isInitial = false) => {
    if (!url) return;
    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      const newPosts = data.results;

      setPosts((prevPosts) => {
        const mergedPosts = isInitial 
          ? newPosts // Replace old posts on first load
          : [...prevPosts, ...newPosts.filter(np => !prevPosts.some(op => op.id === np.id))];

        return mergedPosts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      });

      setNextPage(data.next); // Set next page URL (null if no more pages)
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load initial posts
  const loadInitialPosts = useCallback(async () => {
    setLoading(true);

    // Check internet connection
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setLoading(false);
      return;
    }

    // Fetch first page of posts
    fetchPosts("https://rxjourneyserver.pythonanywhere.com/home/post_list/?page=1", true);
  }, []);

  useEffect(() => {
    loadInitialPosts();
  }, [loadInitialPosts]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <ProfileCard />
      <Text style={styles.header}>Chistev</Text>
      
      <ArticleList posts={posts} />

      {/* Load More Button */}
      {nextPage && (
        <TouchableOpacity 
          style={styles.loadMoreButton} 
          onPress={() => fetchPosts(nextPage)} 
          disabled={loading}
        >
          <Text style={styles.loadMoreText}>{loading ? "Loading..." : "Load More"}</Text>
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
