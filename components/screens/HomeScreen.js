import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import ArticleList from "../ArticleList";
import ProfileCard from "../ProfileCard";

// Sample Data (Replace with API Call)
const initialData = {
  posts: [
    { id: "1", title: "First Post", content: "This is my first blog post!", created_at: "2024-02-20" },
    { id: "2", title: "Second Post", content: "Another great article here.", created_at: "2024-02-22" },
  ],
  nextPage: "https://api.example.com/posts?page=2",
};

export default function HomeScreen() {
  const [posts, setPosts] = useState(initialData.posts);
  const [nextPage, setNextPage] = useState(initialData.nextPage);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chistev</Text>
      <ArticleList posts={posts} nextPage={nextPage} setPosts={setPosts} setNextPage={setNextPage} />
      <ProfileCard />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
