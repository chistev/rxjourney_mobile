import { View, StyleSheet, SafeAreaView, Platform } from "react-native"; 
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import AboutScreen from "./screens/AboutScreen";
import Navbar from "../components/Navbar";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = "home-outline";
            } else if (route.name === "About") {
              iconName = "information-circle-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={() => (
            <View style={styles.container}>
              <Navbar />
              <HomeScreen />
            </View>
          )}
        />
        <Tab.Screen name="About" component={AboutScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? 25 : 0, // Ensure spacing for Android status bar
  },
  container: {
    flex: 1,
  },
});
