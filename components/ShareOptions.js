import { View, Text, TouchableOpacity, StyleSheet, Share, Modal, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function ShareOptions({ slug, onClose }) {
  const [linkCopied, setLinkCopied] = useState(false);
  const currentUrl = `https://rxjourney.com.ng/${slug}`;

  const copyLink = async () => {
    try {
      await Share.share({ message: currentUrl });
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (error) {
      alert("Failed to copy the link. Please try again.");
    }
  };

  const openShare = async (platform) => {
    const encodedUrl = encodeURIComponent(currentUrl);
    let url = "";

    if (platform === "twitter") {
      url = `twitter://post?message=${encodedUrl}`; // Tries to open the Twitter app
      const fallbackUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}`;

      Linking.openURL(url).catch(() => Linking.openURL(fallbackUrl));
    } else if (platform === "facebook") {
      url = `fb://facewebmodal/f?href=${encodedUrl}`; // Tries to open the Facebook app
      const fallbackUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

      Linking.openURL(url).catch(() => Linking.openURL(fallbackUrl));
    }
  };

  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.overlay}>
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

          <TouchableOpacity onPress={onClose}>
            <Text style={styles.closeButton}>Close</Text>
          </TouchableOpacity>

          {linkCopied && <Text style={styles.copyNotification}>Link copied to clipboard!</Text>}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  shareContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  shareOption: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  closeButton: {
    marginTop: 15,
    color: "#ff0000",
    fontSize: 16,
  },
  copyNotification: {
    color: "#28a745",
    marginTop: 5,
    fontSize: 12,
  },
});
