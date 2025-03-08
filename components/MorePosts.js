import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function MorePosts({ currentSlug }) {
  const [randomPosts, setRandomPosts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchRandomPosts = async () => {
      try {
        const response = await fetch(
          `https://rxjourneyserver.pythonanywhere.com/detail/random-posts/${currentSlug}/`
        );
        if (!response.ok) throw new Error("Failed to fetch random posts");
        const data = await response.json();
        setRandomPosts(data);
      } catch (error) {
        console.error("Error fetching random posts:", error);
      }
    };
    if (currentSlug) fetchRandomPosts();
  }, [currentSlug]);

  return (
    <View style={styles.container}>
      {randomPosts.length > 0 && (
        <>
          <View style={styles.divider} />
          <Text style={styles.heading}>More from Chistev</Text>
          {randomPosts.map((post) => (
            <TouchableOpacity
              key={post.slug}
              style={styles.postCard}
              onPress={() => navigation.navigate("PostDetailScreen", { post })}
            >
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.meta}>{formatDate(post.created_at)}</Text>
              <Text numberOfLines={3} style={styles.content}>{post.content}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingVertical: 20 },
  divider: { borderTopWidth: 1, borderColor: "#e0e0e0", marginVertical: 20 },
  heading: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 10 },
  postCard: { backgroundColor: "#f9f9f9", padding: 15, borderRadius: 8, marginBottom: 10 },
  title: { fontSize: 16, fontWeight: "700", color: "#242424" },
  meta: { fontSize: 12, color: "#6b6b6b", marginBottom: 5 },
  content: { fontSize: 14, color: "#242424", lineHeight: 20 },
});
