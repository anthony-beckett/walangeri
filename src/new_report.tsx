import {Alert, Button, Text, TextInput, SafeAreaView, View} from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import {StatusBar} from "expo-status-bar";
import {styles} from "../stylesheets/stylesheet";
import React from "react";

export class NewReport extends React.Component {
    // Attributes
    private view: React.JSX.Element = (
        <SafeAreaView style={styles.container}>
            <Text>Report a new fault</Text>

            <View>
                <Text>Notes:</Text>
                <TextInput
                    style={styles.input}
                />
            </View>

            <TextInput
                style={styles.input}
            />

            <Button title="submit"
                    onPress={() => Alert.alert("Report submission not yet implemented!")}
            />
        </SafeAreaView>
    );

    // Methods
    public getView() : React.JSX.Element {
        return this.view;
    }

    public setView(view: any) {
        this.view = view;
    }

    render() {
        return NewReportView();
    }
}

export const NewReportView = () : React.JSX.Element => {
    let new_report: NewReport = new NewReport({});

    return new_report.getView();
};