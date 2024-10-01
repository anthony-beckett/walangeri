import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuccessMessage = ({ message }) => {
  if (!message) return null;

  return (
    <View style={styles.successMessage}>
      <Text style={styles.successText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  successMessage: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SuccessMessage;
