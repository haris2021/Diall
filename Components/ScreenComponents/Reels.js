import React from "react";
import { StyleSheet, Text, View,Dimensions } from 'react-native';

import ReelsComponent from "./ReelsComponent";
import NavigationButtons from './NavButton';

const Reels = ( ) =>
{
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;


    return(
        <View 
         style={{
         width: windowWidth,
        height: windowHeight,
         backgroundColor: 'white',
        position: 'relative'
         }}
        >
            {/* <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0 }}>

                <Text style={{fontSize: 20, fontWeight: 'bold'}}> iNSIFE NEW View </Text>
          </View> */}

             <ReelsComponent/> 
           
        </View>
    )
}

export default Reels;