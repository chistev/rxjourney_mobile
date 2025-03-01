import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

// Function to format date (Equivalent to `formatDate`)
const formatDate = (dateString) => new Date(dateString).toDateString();

// Load more posts from API
const loadMorePosts = async (nextPage, setPosts, setNextPage) => {
  if (!nextPage) return;

  try {
    const response = await fetch(nextPage);
    const data = await response.json();
    setPosts((prevPosts) => [...prevPosts, ...data.results]);
    setNextPage(data.next);
  } catch (error) {
    console.error("Failed to load more posts", error);
  }
};

export default function ArticleList({ posts, nextPage, setPosts, setNextPage }) {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.article}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content.slice(0, 100)}...</Text>
            <Text style={styles.date}>{formatDate(item.created_at)}</Text>
          </View>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        </TouchableOpacity>
      )}
      ListFooterComponent={
        nextPage ? (
          <TouchableOpacity style={styles.loadMoreButton} onPress={() => loadMorePosts(nextPage, setPosts, setNextPage)}>
            <Text style={styles.loadMoreText}>See More</Text>
          </TouchableOpacity>
        ) : null
      }
    />
  );
}

// Styles
const styles = StyleSheet.create({
  article: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    fontSize: 14,
    color: "#555",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
  image: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },
  loadMoreButton: {
    padding: 15,
    backgroundColor: "#242424",
    alignItems: "center",
    marginVertical: 10,
    borderRadius: 10,
  },
  loadMoreText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
