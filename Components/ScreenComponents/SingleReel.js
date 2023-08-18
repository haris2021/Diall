import React, { useRef, useState } from "react";
import { Text, Dimensions, View, TouchableOpacity, Share } from "react-native";
import { Video } from "expo-av";

import Ionicons from "@expo/vector-icons/Ionicons";

const SingleReel = ({ item }) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onBuffer = (buffer) => {
    console.log("buffring", buffer);
  };
  const onError = (error) => {
    console.log("error", error);
  };

  const videoRef = useRef(null);

  const [play, setplay] = useState(true);

  const [showComponent, setShowComponent] = useState(false);

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

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight - 10,
        position: "relative",
      }}
    >
      <TouchableOpacity onPress={() => setplay(!play)}>
        <Video
          ref={videoRef}
          resizeMode="cover"
          isLooping
          onBuffer={onBuffer}
          onError={onError}
          shouldPlay={play}
          source={item.video}
          style={{
            width: "100%",
            height: windowHeight - 200,
          }}
        />
      </TouchableOpacity>

      {!play && (
        <View
          style={{
            position: "absolute",
            top: "45%",
            left: "45%",
            borderRadius: 10,
            backgroundColor: "rgba(52,52,52,0.1)",
          }}
        >
          <Ionicons name="md-pause" size={45} color="black" />
        </View>
      )}

      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          bottom: 100,
        }}
      >
        <View>
          <View style={{ display: "flex", flexDirection: "row", left: 25 }}>
            <Text style={{ fontSize: 19, color: "blue", fontWeight: "bold" }}>
              @ {item.username}
            </Text>
            <Ionicons
              name="ios-checkmark-circle-outline"
              size={19}
              color="lightblue"
              style={{ left: 10 }}
            />
          </View>

          <View>
            <Text style={{ fontSize: 17, left: 25, color: "white" }}>
              {" "}
              {item.description}
            </Text>
          </View>
        </View>

        <View style={{ position: "absolute", right: 10 }}>
          <TouchableOpacity onPress={handleIconClick}>
            <Ionicons
              name="share" // The name of the icon you want to use
              size={30} // Size of the icon
              color="white" // Color of the icon
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SingleReel;
