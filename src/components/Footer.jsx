import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  logo: {
    width: windowWidth * 5,
    height: 100,
    resizeMode: 'contain'
  },
});

const Footer = () => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
    </View>
  );
};

export default Footer;