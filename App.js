import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import Reels from './Components/ScreenComponents/Reels';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>hwasppppppp</Text>
      <Reels/>
      <StatusBar style="auto" />
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
