import { View, Text, TouchableOpacity, StyleSheet, Share } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ShareOptions({ onClose }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const copyLink = async () => {
    try {
      const currentUrl = "https://rxjourney.com.ng/"; // Replace with dynamic post URL
      await Share.share({ message: currentUrl });
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      alert("Failed to copy the link. Please try again.");
    }
  };

  return (
    <View style={styles.shareContainer}>
      <TouchableOpacity style={styles.shareOption} onPress={copyLink}>
        <Ionicons name="link" size={20} color="#191919" />
        <Text>Copy link</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareOption} onPress={() => openShare("twitter")}>
        <Ionicons name="logo-twitter" size={20} color="#1DA1F2" />
        <Text>Share on Twitter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.shareOption} onPress={() => openShare("facebook")}>
        <Ionicons name="logo-facebook" size={20} color="#1877F2" />
        <Text>Share on Facebook</Text>
      </TouchableOpacity>

      {linkCopied && <Text style={styles.copyNotification}>Link copied to clipboard!</Text>}
    </View>
  );
}

const openShare = (platform) => {
  const currentUrl = encodeURIComponent("https://rxjourney.com.ng/"); // Replace with dynamic post URL
  let url = "";

  if (platform === "twitter") {
    url = `https://twitter.com/intent/tweet?url=${currentUrl}`;
  } else if (platform === "facebook") {
    url = `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`;
  }

  if (url) {
    Share.share({ message: url });
  }
};

const styles = StyleSheet.create({
  shareContainer: { position: "absolute", top: 50, right: 0, backgroundColor: "#fff", padding: 10, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, elevation: 3 },
  shareOption: { flexDirection: "row", alignItems: "center", gap: 10, padding: 8 },
  copyNotification: { color: "#28a745", marginTop: 5, fontSize: 12 },
});
