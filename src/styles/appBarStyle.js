import { StyleSheet } from "react-native";
import Constants from 'expo-constants'
import theme from "../theme";

const appBarStyle = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appBarBackground,
      flexDirection: 'row',
    },
    logo: {
      width: 40,
      height: 40,
      marginLeft: 10,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 40 / 2,
    },
    scrollView: {
      flexDirection: 'row',
    },
});

export default appBarStyle