import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";

const SupportSection = () => {
  const coffeeUrl = "https://buymeacoffee.com/chistev12";
  const flutterwaveUrl = "https://flutterwave.com/donate/nxlpmfy1jibs";

  return (
    <View style={styles.supportContainer}>
      <Text style={styles.heading}>Enjoyed the post? ☕</Text>
      <Text style={styles.description}>
        If you had a good time and if you're feeling extra generous, you can leave a donation to show some love. No pressure, but your support does fuel more awesome content! 😉
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.supportButton} onPress={() => Linking.openURL(coffeeUrl)}>
          <Text style={styles.buttonText}>☕ Buy Me a Coffee</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.supportButton, styles.flutterwaveButton]} onPress={() => Linking.openURL(flutterwaveUrl)}>
          <Text style={styles.buttonText}>💳 Send Naira</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  supportContainer: {
    textAlign: "center",
    marginTop: 30,
    padding: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "700",
    color: "#242424",
    marginBottom: 15,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#6b6b6b",
    marginBottom: 20,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
  },
  supportButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#ff5a5f",
    borderRadius: 5,
  },
  flutterwaveButton: {
    backgroundColor: "#f4a261",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default SupportSection;
