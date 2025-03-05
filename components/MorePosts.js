import { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const fetchMorePosts = async () => {
  return [
    { id: "3", title: "Another Post", slug: "another-post", created_at: "2024-03-01" },
    { id: "4", title: "Interesting Topic", slug: "interesting-topic", created_at: "2024-03-02" },
  ];
};

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function MorePosts({ currentSlug }) {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMorePosts().then(setPosts);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>More Posts</Text>
      <FlatList
        data={posts.filter((post) => post.slug !== currentSlug)}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.postItem}
            onPress={() => navigation.navigate("PostDetail", { post: item })}
          >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{formatDate(item.created_at)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  postItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    color: "#888",
  },
});
