// System imports
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image } from 'react-native';  
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import { NewReport } from './src/new_report';
import { LoadReport } from "./src/load_report";
import { ExportReport } from "./src/export_report";
import { styles } from "./stylesheets/stylesheet";
import * as SQLite from 'expo-sqlite'

const MainMenuView = (mainmenu: any) => {
  //onPress To Navigate
  const onPress = (page: string) => {
    mainmenu.navigation.navigate(page);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* New Title */}
      <Text style={styles.title}>Walangeri Ngumpinku Aboriginal Corporation</Text>

      {/* Add Logo */}
      <Image source={require('./assets/logo.png')} style={styles.logo} />  

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="New Report" onPress={() => onPress('NewReport')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Load Report" onPress={() => onPress('LoadReport')} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Export Report" onPress={() => onPress('ExportReport')} />
      </View>
    </SafeAreaView>
  );
};

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainMenuView"
          component={MainMenuView}
          options={{
            headerShown: false, // hides the navigation header and removes the condensed title
          }}
        />
        <Stack.Screen name="NewReport" component={NewReport} />
        <Stack.Screen name="LoadReport" component={LoadReport} />
        <Stack.Screen name="ExportReport" component={ExportReport} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}