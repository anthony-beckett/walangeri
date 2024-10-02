import React from 'react';
import { View, Text } from 'react-native';
import notificationStyle from '../styles/notificationStyle';

const Notification = ({ message }) => {
    if (!message) return null;

    return (
        <View style={notificationStyle.container}>
            <Text style={notificationStyle.message}>{message}</Text>
        </View>
    );
};

export default Notification;