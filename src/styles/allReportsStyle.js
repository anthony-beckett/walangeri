import { StyleSheet } from "react-native";

const allReportsStyle = StyleSheet.create({
    container: {
        padding: 20,
    },
    reportContainer: {
        marginBottom: 20,
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    reportName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    searchInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        margin: 15,
        borderRadius: 5,
    },
});

export default allReportsStyle;