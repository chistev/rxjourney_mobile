import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function MorePosts({ currentSlug }) {
  const [randomPosts, setRandomPosts] = useState([]);
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // Get screen width for HTML rendering

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
              onPress={() => navigation.navigate("PostDetail", { post })}
            >
              <Text style={styles.title}>{post.title}</Text>
              <Text style={styles.meta}>{formatDate(post.created_at)}</Text>
              <RenderHTML contentWidth={width} source={{ html: post.content }} />
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
});
