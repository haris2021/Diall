import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const NavButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
      <View style={styles.iconAndButton}>
        <Ionicons
          name="home"
          size={22}
          color="white"
          style={styles.icon}
        />
        <Button
          title="Watch"
          onPress={() => navigation.navigate('Reels')}
          style={styles.button}
        />
      </View>

      <View style={styles.iconAndButton}>
        <Ionicons
          name="md-chatbox"
          size={22}
          color="white"
          style={styles.icon}
        />
        <Button
          title="Ask"
          onPress={() => navigation.navigate('AskScreen')}
          style={styles.button}
        />
      </View>

      <View style={styles.iconAndButton}>
        <Ionicons
          name="search"
          size={22}
          color="white"
          style={styles.icon}
        />
        <Button
          title="Search"
          onPress={() => navigation.navigate('AskScreen')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    backgroundColor: 'black',
    padding: 4,
  },
  iconAndButton: {
    flexDirection: 'column',
    alignItems: 'center',
    marginLeft:40,
  },
  icon: {
    top: 3,
    marginBottom: 5
     // Adjust icon css
  },
  button: {
    // Adjust the button css
  },
});

export default NavButton;

