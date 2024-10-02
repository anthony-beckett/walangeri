import { StyleSheet } from "react-native";
import theme from "../theme";

const signInStyle = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: 'white',
      flex: 1,
      justifyContent: 'center',
    },
    heading: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: theme.colors.textPrimary,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      marginBottom: 15,
      borderRadius: 5,
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      marginBottom: 15,
    },
    loginButton: {
      backgroundColor: theme.colors.primary,
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 20,
    },
    signupButton: {
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      marginTop: 10,
      borderColor: theme.colors.primary,
      borderWidth: 1,
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    signupText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
    },
});

export default signInStyle;