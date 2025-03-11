import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";

const formatDate = (dateString) => new Date(dateString).toDateString();

export default function ArticleList({ posts }) {
  const navigation = useNavigation();

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity 
          style={styles.article} 
          onPress={() => navigation.navigate("PostDetail", { post: item })}
        >
          <View style={styles.textContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.content}>{item.content.slice(0, 250)}...</Text>
            <Text style={styles.date}>{formatDate(item.created_at)}</Text>
          </View>
          {item.image && <Image source={{ uri: item.image }} style={styles.image} />}
        </TouchableOpacity>
      )}
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
});
