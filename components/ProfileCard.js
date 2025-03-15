import { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet, Alert, TouchableOpacity, Linking } from "react-native";

export default function ProfileCard() {
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [email, setEmail] = useState("");
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchSubscriberCount = async () => {
      try {
        const response = await fetch("https://rxjourneyserver.pythonanywhere.com/home/subscriber-count/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subscriber count");
        }

        const data = await response.json();
        setCount(data.subscriber_count);
      } catch (error) {
        console.error("Error fetching subscriber count:", error);
        setCount(0);
      }
    };

    fetchSubscriberCount();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const subscribe = async () => {
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("https://rxjourneyserver.pythonanywhere.com/home/subscribe/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", data.message);
        setShowEmailInput(false);
        setEmail("");
      } else {
        setErrorMessage(data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.card}>
      <Image source={require("../assets/RxJourney_logo.png")} style={styles.image} />
      <Text style={styles.name}>Chistev</Text>
      <Text style={styles.subscriberCount}>{count} {count === 1 ? "subscriber" : "subscribers"}</Text>
      <Text style={styles.description}>Intern Pharmacist and Web Developer</Text>

      <TouchableOpacity onPress={() => Linking.openURL("https://rxjourneyserver.pythonanywhere.com/rss_feed/rss/")}>
        <Text style={styles.rssFeed}>🔗 RSS Feed</Text>
      </TouchableOpacity>

      {showEmailInput ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Button title={isLoading ? "Subscribing..." : "Submit"} onPress={subscribe} disabled={isLoading || !email} />
          {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
        </>
      ) : (
        <Button title="Subscribe" onPress={() => setShowEmailInput(true)} color="#3a9a00" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subscriberCount: {
    fontSize: 16,
    color: "#555",
  },
  description: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
    marginBottom: 10,
  },
  rssFeed: {
    color: "#FF6600",
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  errorMessage: {
    color: "red",
    marginTop: 5,
  },
});
