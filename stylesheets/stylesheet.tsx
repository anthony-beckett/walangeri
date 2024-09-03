import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        flex: 1,
        maxHeight: 10,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
    },
    button: {
        margin: 5,
    },
});
