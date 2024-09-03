import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    greaterContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        maxWidth: "70%",
        alignItems: 'center', // Optional: Align items vertically
        padding: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        padding: 10,
    },
    input: {
        flex: 1, // Allow TextInput to expand to fill remaining space
        maxHeight: 100,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 5,
    },
    title: {
        textAlign: 'center',
    },
    dropdown: {
        maxWidth: "65%",
    },
    button: {
        margin: 5,
    },
});