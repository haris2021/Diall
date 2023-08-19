import { React, useState } from "react";
import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";

import { Video } from "../Database/Video.js";
import SingleReel from "./SingleReel";

const ReelsComponent = () => {
  const [Videodata, setVideodata] = useState(Video);
  const [currentIndex, setCurrentIndex] = useState(0);

  const fetchmore = () => {
    console.log("came here on reaching end");
    const newVideoData = Videodata;
    setVideodata((prevState) => [...prevState, ...newVideoData]);
  };

  return (
    <View>
      <FlatList
        data={Videodata}
        onEndReached={fetchmore}
        renderItem={({ item, index }) => (
          //<Text>{item.username}</Text>
          <SingleReel
            item={item}
            index={index}
            style={{ width: "100%", aspectRatio: 1 }}
          />
        )}
        keyExtractor={(item, index) => index}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={Dimensions.get("window").height}
      />
    </View>
  );
};

export default ReelsComponent;
