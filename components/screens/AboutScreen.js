import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Me</Text>
      <Text style={styles.paragraph}>
        I am currently an intern pharmacist. Alongside my passion for Pharmacy,
        I am also a dedicated full-stack web developer, constantly honing my
        skills in building dynamic and responsive web applications.
      </Text>
      <Text style={styles.paragraph}>
        My journey into web development has been fueled by a desire to create and innovate.
        My ultimate goal is to transition fully into tech, using my coding skills
        to escape the matrix and make a broader impact.
      </Text>

      <TouchableOpacity
        style={styles.twitterButton}
        onPress={() => Linking.openURL("https://twitter.com/chistev12")}
      >
        <FontAwesome name="twitter" size={20} color="white" />
        <Text style={styles.buttonText}>Contact Me</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.emailButton}
        onPress={async () => {
          const email = "mailto:chistev12@gmail.com";
          const supported = await Linking.canOpenURL(email);
          if (supported) {
            await Linking.openURL(email);
          } else {
            alert("No email client found. Please set up an email app.");
          }
        }}
      >
        <FontAwesome name="envelope" size={20} color="white" />
        <Text style={styles.buttonText}>Email Me</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: "center",
  },
  twitterButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#14171A",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  emailButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DB4437",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
    flex: 1,
  },
});
