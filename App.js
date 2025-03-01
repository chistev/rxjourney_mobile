import { View, Text, FlatList, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Sample Blog Data
const sampleData = {
  posts: [
    { id: "1", title: "First Post", content: "This is my first blog post!" },
    { id: "2", title: "Second Post", content: "Another great article here." },
  ],
  nextPage: null,
};

// Home Screen
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Chistev</Text>
      <FlatList
        data={sampleData.posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

// About Screen
function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>About Chistev</Text>
      <Text>Welcome to my blog. I write about tech, coding, and more!</Text>
    </View>
  );
}

// Profile Card Component
function ProfileCard() {
  return (
    <View style={styles.profileCard}>
      <Text style={styles.profileText}>Profile Card</Text>
    </View>
  );
}

// Tab Navigation
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </NavigationContainer>
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
  post: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  profileCard: {
    padding: 20,
    backgroundColor: "#eee",
    alignItems: "center",
    marginTop: 20,
  },
  profileText: {
    fontSize: 16,
  },
});
