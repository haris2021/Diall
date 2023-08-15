import React, { useRef, useState } from "react";
import { Dimensions, View, TouchableOpacity } from "react-native";
import { Video } from "expo-av";

import Ionicons from '@expo/vector-icons/Ionicons';

const SingleReel = ({ item }) => {

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const onBuffer = buffer => {
    console.log('buffring', buffer);
  };
  const onError = error => {
    console.log('error', error);
  };

  const videoRef = useRef(null);

  const[play, setplay] = useState(true);

  return (
    <View
      style={{
        width: windowWidth,
        height: windowHeight,
        position: "relative",
      }}
    >

        <TouchableOpacity
        onPress = { () => setplay(!play)}
        >

                            <Video
                                            ref={videoRef}
                                            resizeMode="cover"
                                            isLooping
                                            onBuffer={onBuffer}
                                            onError={onError}
                                            shouldPlay = {play}
                                            source={item.video}
                                            style={{
                                            width: windowWidth,
                                            height: windowHeight,
                                            position: "absolute",
                                            }}
                                        />

        </TouchableOpacity>
        
        {!play && (
        <View 
          style={{
            position: 'absolute',
            top: windowWidth / 2.3,
            left: windowWidth / 2.3,
            padding: 10,
            borderRadius: 10,
            backgroundColor: 'rgba(52,52,52,0.1)',
          }}
        >
          <Ionicons
            name="md-pause"
            size={32}
            color="black"
          />
        </View>
      )}
                
    </View>
  );
};

export default SingleReel;