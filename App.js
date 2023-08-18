import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Reels from "./Components/ScreenComponents/Reels";
import AskScreen from "./Components/ScreenComponents/AskScreen";
import NavButton from "./Components/ScreenComponents/NavButton";
import SearchScreen from "./Components/ScreenComponents/SearchScreen";

import { StyleSheet, View, SafeAreaView } from "react-native";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Reels">
            <Stack.Screen name="Reels" component={Reels} />
            <Stack.Screen name="AskScreen" component={AskScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
          </Stack.Navigator>
          <NavButton></NavButton>
        </NavigationContainer>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
