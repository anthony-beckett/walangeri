/**
 * Notification Component
 *
 * Displays a notification message with different styles for success and error messages.
 * 
 * Props:
 * - message (string): The message to display. If empty, the component returns null.
 */

import React from 'react';
import { View, Text } from 'react-native';
import notificationStyle from '../styles/notificationStyle';

const Notification = ({ message }) => {
    if (!message) return null;

    // Display error styling if the message includes "Error"
    if(message.includes("Error")) {
        return (
            <View style={notificationStyle.errorContainer}>
                <Text style={notificationStyle.message}>{message}</Text>
            </View>
        )
    }

    return (
        <View style={notificationStyle.container}>
            <Text style={notificationStyle.message}>{message}</Text>
        </View>
    );
};

export default Notification;