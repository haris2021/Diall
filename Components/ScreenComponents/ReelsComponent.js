import { React, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { SwiperFlatList } from "react-native-swiper-flatlist";
import { Video } from "../Database/Video.js";
import SingleReel from "./SingleReel";

const ReelsComponent = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleChangeIndexValue = ({ index }) => {
    setCurrentIndex(index);
  };

  return (
    <View>
      <FlatList
        data={Video}
        renderItem={({ item, index }) => (
          //<Text>{item.username}</Text>
          <SingleReel item={item} index={index} currentIndex={currentIndex} />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default ReelsComponent;
