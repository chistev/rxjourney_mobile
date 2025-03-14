import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useRef, useEffect } from "react";
import PostIcons from "../PostIcons"; 
import SupportSection from "../SupportSection";
import ProfileCard from "../ProfileCard";
import MorePosts from "../MorePosts";

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function PostDetailScreen() {
  const route = useRoute();
  const { post } = route.params;
  const scrollViewRef = useRef(null); // Create a reference for the ScrollView

  // Scroll to the top whenever the post changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [post]); // Runs whenever post changes

  return (
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
        <Text style={styles.postText}>{post.content}</Text>
      </View>

      <PostIcons slug={post.slug}/>

      <SupportSection />

      <View style={styles.secondarySection}>
        <ProfileCard backgroundColor="#f9f9f9" />

        <View style={styles.divider} />

        <MorePosts currentSlug={post.slug} />

        <View style={styles.divider} />

        <View style={styles.seeAllContainer}>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See all from Chistev</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
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
