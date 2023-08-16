import React, { useRef, useState } from "react";
import { Text, Dimensions, View, TouchableOpacity, Share } from "react-native";
import { Video } from "expo-av";

import Ionicons from '@expo/vector-icons/Ionicons';

import ShareIcon from './ShareIcon'

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

  const [play, setplay] = useState(true);

  const [showComponent, setShowComponent] = useState(false);


  const handleIconClick = async () => {
    const result = await Share.share({
      message:
        'React Native | A framework for building native apps using React',
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
        height: windowHeight-10,
        position: "relative",
      }}
    >
      <TouchableOpacity
        onPress={() => setplay(!play)}
      >
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
            height: windowHeight-150
          }}
        />

      </TouchableOpacity>

      {!play && (
        <View
          style={{
            position: 'absolute',
            top: "45%",
            left: "50%",
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
      )
      }
          <View style={{ zIndex: 9999 , position: 'absolute', bottom: 220, left: 10}}>

            <View style={{display: "flex", flexDirection: "row", justifyContent: 'space-between', alignItems: "center"}}>

                        <View style={{left:10}}>
                          <Text style={{ color: 'red', fontSize: 19, marginHorizontal: 10 }}>
                            @{item.username}
                            <Ionicons
                              name="ios-checkmark-circle-outline"
                              size={22}
                              color="blue"
                            />
                          </Text>

                          <Text style={{ color: 'red', fontSize: 19, marginHorizontal: 10}}>
                            {item.description}
                          </Text>

                        </View>

                        <View style={{position:'absolute' , left:360}}>
                          <TouchableOpacity onPress={handleIconClick}>
                            <Ionicons
                              name="share" // The name of the icon you want to use
                              size={30}     // Size of the icon
                              color="white" // Color of the icon
                              style={{}}
                            />
                          </TouchableOpacity>
                        </View>
            </View>

          </View>
          
    </View>
  );
};

export default SingleReel;