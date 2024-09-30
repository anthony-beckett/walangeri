import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,  // App bar background color from theme
    flexDirection: 'row',
  },
  scrollView: {
    flexDirection: 'row',  // Make sure items are laid out in a row
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab title="New Report" to="/" />
        <AppBarTab title="Load Report" to="/loadreport" />
        <AppBarTab title="Export Report" to="/exportreport" />
        <AppBarTab title="All Reports" to="/allreports" />
        <AppBarTab title="Sign in" to="/signin" />
      </ScrollView>
    </View>
  )
};

export default AppBar;