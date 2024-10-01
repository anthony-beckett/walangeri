import React from 'react';
import { View, StyleSheet, ScrollView, Image } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
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

const AppBar = ({ user }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <ScrollView horizontal style={styles.scrollView}>
        <AppBarTab title="New Report" to="/" />
        <AppBarTab title="Load Report" to="/loadreport" />
        <AppBarTab title="Export Report" to="/exportreport" />
        <AppBarTab title="All Reports" to="/allreports" />
        {user ? (
          <AppBarTab title={user.email} to="/logout" />
        ) : (
          <AppBarTab title="Sign in" to="/signin" />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;