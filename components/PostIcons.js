import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useState } from "react";
import ShareOptions from "./ShareOptions";
import { Ionicons } from "@expo/vector-icons";

export default function PostIcons({ slug }) {
  const [showShareOptions, setShowShareOptions] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setShowShareOptions(!showShareOptions)}>
        <Ionicons name="share-social" size={24} color="#777" />
      </TouchableOpacity>

      {showShareOptions && <ShareOptions slug={slug} onClose={() => setShowShareOptions(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 10,
    position: "relative",
    zIndex: 10,
  },
});
