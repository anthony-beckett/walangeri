import { StyleSheet } from "react-native";

const notificationStyle = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    },
    message: {
        color: 'white',
        fontWeight: 'bold',
    },
    errorContainer: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: 'center',
    }
});

export default notificationStyle