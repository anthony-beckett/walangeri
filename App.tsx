// System imports
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  SafeAreaView
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Local imports
import { NewReport }    from './src/new_report';
import { LoadReport }   from "./src/load_report";
import { ExportReport } from "./src/export_report";
import { styles }       from "./stylesheets/stylesheet";


const MainMenuView = (mainmenu: any) => {
  //onPress To Navigate
  const onPress = (page: String) => {
    mainmenu.navigation.navigate(page);
  };

  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.button}>
          <Button  title={"New report"}    onPress={() => onPress('NewReport')} />
        </View>

        <View style={styles.button}>
          <Button title={"Load report"}   onPress={() => onPress('LoadReport')} />
        </View>

        <View style={styles.button}>
          <Button title={"Export report"} onPress={() => onPress('ExportReport')} />
        </View>
      </SafeAreaView>
  );
};

export default function App() {
  const Stack = createStackNavigator();

  return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="MainMenuView" component={MainMenuView} />
          <Stack.Screen name="NewReport"    component={NewReport}    />
          <Stack.Screen name="LoadReport"   component={LoadReport}   />
          <Stack.Screen name="ExportReport" component={ExportReport} />
        </Stack.Navigator>
      </NavigationContainer>
  );
}