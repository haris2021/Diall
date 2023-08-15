import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Reels from './Components/ScreenComponents/Reels';
import AskScreen from './Components/ScreenComponents/AskScreen';
import NavButton from './Components/ScreenComponents/NavButton';

import { StyleSheet, View } from 'react-native';

export default function App() {
  
  const Stack = createNativeStackNavigator();

  return (
    <View style={styles.container}>

      <NavigationContainer>

        <Stack.Navigator initialRouteName="Reels">
          <Stack.Screen name="Reels" component={Reels} />
          <Stack.Screen name="AskScreen" component={AskScreen} />
        </Stack.Navigator>

      </NavigationContainer>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
