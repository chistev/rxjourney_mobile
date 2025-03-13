import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(`https://rxjourneyserver.pythonanywhere.com/home/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (data.length > 0) {
        navigation.navigate("Search", { results: data, query: searchQuery });
      } else {
        alert("No results found.");
      }
    } catch (error) {
      alert("Error fetching search results.");
      console.error(error);
    } finally {
      setLoading(false);
      setSearchQuery("");
    }
  };

  return (
    <View style={styles.navbar}>
      <Text style={styles.brand}>RxJourney</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch} 
          returnKeyType="search"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : (
            <Ionicons name="search" size={22} color="#007bff" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    padding: 15,
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  brand: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
});
