import { useState, useEffect, useCallback } from "react";
import { Text, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo"; // To check internet connection
import ArticleList from "../ArticleList";
import ProfileCard from "../ProfileCard";

export default function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [loading, setLoading] = useState(true);

  // Memoize loadPosts to prevent unnecessary re-creations
  const loadPosts = useCallback(async () => {
    setLoading(true);
    
    // Check if internet is available
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      // Load offline data
      const savedPosts = await AsyncStorage.getItem("savedPosts");
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
      setLoading(false);
      return;
    }

    // Fetch latest posts from the server if online
    fetchPosts("https://rxjourneyserver.pythonanywhere.com/home/post_list/?page=1");
  }, []);

  async function fetchPosts(url) {
    if (!url) return;
    setLoading(true);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch posts");

      const data = await response.json();
      const newPosts = data.results;

      // Merge old and new posts
      const storedPosts = await AsyncStorage.getItem("savedPosts");
      const oldPosts = storedPosts ? JSON.parse(storedPosts) : [];

      // Avoid duplicates by filtering old posts
      const mergedPosts = [...newPosts, ...oldPosts.filter(op => !newPosts.some(np => np.id === op.id))];

      // Save merged posts to AsyncStorage
      await AsyncStorage.setItem("savedPosts", JSON.stringify(mergedPosts));

      setPosts(mergedPosts);
      setNextPage(data.next);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPosts();
  }, [loadPosts]); // Add loadPosts as a dependency

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
