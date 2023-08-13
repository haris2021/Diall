import React,{useRef, useState} from "react";
import { StyleSheet, Text, View , Dimensions, TouchableOpacity} from 'react-native';

import Video from 'react-native-video';

const SingleReel = ({item,index, currentIndex}) =>
{
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    const videoRef = useRef(null);

    const onBuffer = buffer => {
      console.log('buffring', buffer);
    };
    const onError = error => {
      console.log('error', error);
    };

    
    return(

        <View
        
        style={{width: windowWidth,
        height: windowHeight,
        position :'relative'
        }}
        >

            <TouchableOpacity style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute'
                            }}
                            >
        
                            <Video
                            videoRef={videoRef}
                            onBuffer={onBuffer}
                            onError={onError}
                            repeat={true}
                            resizeMode="cover"
                            source={{uri: "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4"}}
                            style={{
                                width: '100%',
                                height: '100%',
                                position: 'absolute'
                            }}

                            />

            </TouchableOpacity>


        </View>

    
       
    )
}

export default SingleReel;
