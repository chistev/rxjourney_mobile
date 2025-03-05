import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import PostIcons from "../PostIcons"; 
import SupportSection from "../SupportSection";
import ProfileCard from "../ProfileCard";
import MorePosts from "../MorePosts";

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function PostDetailScreen() {
  const route = useRoute();
  const { post } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>{formatDate(post.created_at)}</Text>
      </View>

      <View style={styles.metaContainer}>
        <PostIcons />
      </View>

      {post.image && <Image source={{ uri: post.image }} style={styles.image} />}

      <View style={styles.content}>
        <Text style={styles.postText}>{post.content}</Text>
      </View>

      <PostIcons />

      <SupportSection />

      <View style={styles.secondarySection}>
        <ProfileCard backgroundColor="#f9f9f9" />

        <View style={styles.divider} />

        <MorePosts currentSlug={post.slug} />

        <View style={styles.divider} />

        <View style={styles.seeAllContainer}>
          <Text style={styles.seeAllButton}>See all from Chistev</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#242424",
  },
  date: {
    fontSize: 14,
    color: "#6b6b6b",
    marginBottom: 20,
  },
  metaContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e0e0e0",
    paddingVertical: 10,
    marginBottom: 20,
  },
  image: {
    width: "80%",
    maxWidth: 600,
    height: 200,
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
  },
  content: {
    fontSize: 20,
    lineHeight: 32,
    color: "#242424",
  },
  secondarySection: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginTop: 20,
  },
  divider: {
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
    marginVertical: 20,
  },
  seeAllContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  seeAllButton: {
    fontSize: 14,
    fontWeight: "700",
    color: "#242424",
    padding: 10,
    borderWidth: 2,
    borderColor: "#242424",
    borderRadius: 20,
    textAlign: "center",
  },
});
