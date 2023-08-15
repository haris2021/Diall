import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.buttonContainer}>
      <Button
        title="Go to Ask"
        onPress={() => navigation.navigate('AskScreen')}
      />
      <Button
        title="Go to Reels"
        onPress={() => navigation.navigate('Reels')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
});

export default NavButton;

