import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Share,
  Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import filter from "lodash.filter";
import { useNavigation } from "@react-navigation/native";

import Ionicons from "@expo/vector-icons/Ionicons";

const API_endpoint = "https://randomuser.me/api/?results=30";

const SearchScreen = () => {
  const [SearchQuery, setSearchQuery] = useState("");

  const [isLoading, setisLoading] = useState(false);
  const [Data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [fullData, setfullData] = useState("");

  const [keyboardStatus, setKeyboardStatus] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    setisLoading(true);
    fetchData(API_endpoint);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const formattedquery = query.toLowerCase();
    const filtereddata = filter(fullData, (user) => {
      return contains(user, formattedquery);
    });
    setData(filtereddata);
  };

  const contains = ({ name, email }, query) => {
    const { first, last } = name;
    if (first.includes(query) || last.includes(query) || email.includes(query))
      return true;
    else return false;
  };

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json.results);
      setfullData(json.results);
      setisLoading(false);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  // To know what should happen if isLoading is true.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} color="#550dc" />
      </View>
    );
  }

  // error handling if error comes
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error in fetching data.. Please check network connectivity.</Text>
      </View>
    );
  }

  const handleIconClick = async () => {
    const result = await Share.share({
      message:
        "React Native | A framework for building native apps using React",
    });
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  };

  // Navigation.addListener("focus", focusOnInput);

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 40, top: 20 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TextInput
          placeholder="Find a therapist.."
          clearButtonMode="always"
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus={true}
          style={styles.searchbox}
          value={SearchQuery}
          onChangeText={(query) => handleSearch(query)}
        />
      </KeyboardAvoidingView>

      {SearchQuery !== "" && Data.length > 0 && (
        <FlatList
          data={Data}
          keyExtractor={(item) => item.login.username} // use unqiue thing here
          renderItem={({ item }) => (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <View>
                <Image
                  source={{ uri: item.picture.thumbnail }}
                  style={styles.image}
                />
              </View>

              <View style={{ flex: 1 }}>
                <View
                  style={{
                    left: 20,
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <Text style={styles.textName}>{item.name.first}</Text>

                  <Ionicons
                    name="md-checkmark-circle-outline" // The name of the icon you want to use
                    size={17} // Size of the icon
                    color="black" // Color of the icon
                    style={{ marginLeft: 10 }}
                  />
                </View>

                <Text style={styles.textEmail}>{item.email}</Text>
              </View>

              <View
                style={{
                  paddingTop: 5,
                }}
              >
                <TouchableOpacity style={styles.button}>
                  {/* <Text style={styles.buttonText}>Ask</Text> */}
                  <Button
                    title="Ask"
                    onPress={() => navigation.navigate("AskScreen")}
                    style={styles.button}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      {/* Display this view when search result is empty */}
      {Data.length === 0 && (
        <View style={{ display: "flex", alignItems: "center", top: "10%" }}>
          <Text style={{ color: "grey", fontWeight: "bold" }}>
            Don't see your therapist
          </Text>

          <View>
            <TouchableOpacity
              style={styles.invitebutton}
              onPress={handleIconClick}
            >
              <Text style={styles.buttonText}>Invite your therapist </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  searchbox: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 18,
    backgroundColor: "white",
    paddingHorizontal: 30, // Add some horizontal padding for better appearance
    paddingVertical: 10,
    height: 40,
    width: 380,
    marginBottom: 16,
  },
  textName: {
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "600",
  },
  textEmail: {
    fontSize: 15,
    marginLeft: 30,
    color: "grey",
  },
  image: {
    width: 35,
    height: 30,
    left: 10,
    borderRadius: 70,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
  },
  invitebutton: {
    backgroundColor: "lightgreen",
    paddingVertical: 25,
    paddingHorizontal: 22,
    borderRadius: 13,
    left: 10,
    top: 30,
  },
  button: {
    backgroundColor: "lightgreen",
    paddingVertical: 5,
    paddingHorizontal: 18,
    borderRadius: 13,
    width: 80,
    height: 45,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SearchScreen;
