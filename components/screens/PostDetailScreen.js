import { useState, useEffect, useRef } from "react";
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRoute } from "@react-navigation/native";
import RenderHTML from "react-native-render-html";
import { useWindowDimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PostIcons from "../PostIcons"; 
import SupportSection from "../SupportSection";
import ProfileCard from "../ProfileCard";
import MorePosts from "../MorePosts";
import Navbar from "../Navbar";

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function PostDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { slug, post: initialPost } = route.params || {}; 
  const [post, setPost] = useState(initialPost || null);
  const [loading, setLoading] = useState(!initialPost);
  const { width } = useWindowDimensions();
  const scrollViewRef = useRef(null);

  useEffect(() => {
    if (!post || post.content.length < 500) { 
      fetchFullPost();
    }
  }, [slug]);

  const fetchFullPost = async () => {
    if (!slug) {
      console.error("Error: slug is undefined, cannot fetch post.");
      return;
    }

    try {
      console.log("Fetching full post with slug:", slug); // Debugging
      setLoading(true);
      const response = await fetch(`https://rxjourneyserver.pythonanywhere.com/detail/post/${slug}/`);
      if (!response.ok) throw new Error("Failed to fetch full post");
      const fullPost = await response.json();
      console.log("Fetched full post:", fullPost); // Debugging
      setPost(fullPost);
    } catch (error) {
      console.error("Error fetching full post:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [post]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#242424" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.safeContainer}>
        <Text style={{ textAlign: "center", marginTop: 50, fontSize: 18 }}>Post not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.safeContainer}>
      <Navbar />
      <ScrollView ref={scrollViewRef} style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.date}>{formatDate(post.created_at)}</Text>
        </View>
        <View style={styles.metaContainer}>
          <PostIcons slug={post.slug} />
        </View>
        {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
        <View style={styles.content}>
          <RenderHTML contentWidth={width} source={{ html: post.content }} />
        </View>
        <PostIcons slug={post.slug} />
        <SupportSection />
        <View style={styles.secondarySection}>
          <ProfileCard backgroundColor="#f9f9f9" />
          <View style={styles.divider} />
          <View style={styles.divider} />
          <View style={styles.seeAllContainer}>
            <TouchableOpacity onPress={() => navigation.navigate("MainTabs")}>
              <Text style={styles.seeAllButton}>See all from Chistev</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 25,
  },
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: { marginBottom: 10 },
  title: { fontSize: 32, fontWeight: "bold", color: "#242424" },
  date: { fontSize: 14, color: "#6b6b6b", marginBottom: 20 },
  metaContainer: { borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#e0e0e0", paddingVertical: 10, marginBottom: 20 },
  image: { width: "80%", height: 200, alignSelf: "center", marginBottom: 20, borderRadius: 10 },
  content: { fontSize: 20, lineHeight: 32, color: "#242424" },
  secondarySection: { backgroundColor: "#f9f9f9", padding: 20, marginTop: 20 },
  divider: { borderTopWidth: 1, borderColor: "#e0e0e0", marginVertical: 20 },
  seeAllContainer: { alignItems: "center", marginTop: 20 },
  seeAllButton: { fontSize: 14, fontWeight: "700", color: "#242424", padding: 10, borderWidth: 2, borderColor: "#242424", borderRadius: 20, textAlign: "center" },
});
