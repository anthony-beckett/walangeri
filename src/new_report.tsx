import { Alert, Button, Text, TextInput, SafeAreaView, View } from "react-native";
import DropDownPicker from 'react-native-dropdown-picker';
import { StatusBar } from "expo-status-bar";
import { styles } from "../stylesheets/new_report";
import React, { useState } from "react";

export class NewReport extends React.Component {
    // Methods
    constructor(props: any) {
        super(props);
        this.state = {
            reportName   : "",
            addressLot   : "",
            jobType      : "",
            // Urgency level picker options begin
            open  : false,
            items : [
                { label: "Low",    value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High",   value: "high" },
            ],
            value : null,
            // end
            notes : "",
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (name: string, value: any) => {
        console.log(name, value);
        this.setState({ [name]: value });
    };

    protected generateName(): string {
        return new Date().toISOString() + "_report";
    }

    protected clearAll(): void {
        for (const key in this.state) {
            this.handleChange(key, "");
        }
    }

    private submit(): void {
        Object.entries(this.state).forEach(([key, value]) => {
            console.log(key + ": ", value); // Output: reportName "", addressLot "", notes ""
        });
    }

    render() {
        return (
            <SafeAreaView style={styles.greaterContainer}>
                <Text style={styles.title}>Report a New Fault</Text>

                <SafeAreaView style={styles.innerContainer}>
                    <Text style={styles.label}>Report Name:</Text>
                    <TextInput style={styles.input}
                               value={this.state.reportName}
                               onChangeText={(text) => this.handleChange("reportName", text)}
                    />
                    <Button title={"\u21BB"}
                            onPress={() => this.handleChange("reportName", this.generateName())}
                    />
                </SafeAreaView>

                <SafeAreaView style={styles.innerContainer}>
                    <Text style={styles.label}>Address/Lot:</Text>
                    <TextInput style={styles.input}
                               value={this.state.addressLot}
                               onChangeText={(text) => this.handleChange("addressLot", text)}
                    />
                </SafeAreaView>

                <SafeAreaView style={styles.innerContainer}>
                    <Text style={styles.label}>Urgency Level:</Text>
                    <DropDownPicker
                        placeholder={"Choose an urgency level"}
                        value={this.state.value}
                        items={this.state.items}
                        open={this.state.open}
                        setValue = { (val) =>
                            this.handleChange("value", val)
                        }
                        setOpen = { (val) =>
                            this.handleChange("open", val)
                        }
                        setItems = { (val) =>
                            this.handleChange("items", val)
                        }
                        mode={"BADGE"}
                        badgeDotColors = {[
                            "#CFB407", /* Yellow */
                            "#FF8400", /* Orange */
                            "#FF0000", /* Red */
                        ]}
                    />
                </SafeAreaView>

                <SafeAreaView style={styles.innerContainer}>
                    <Text style={styles.label}>Notes:</Text>
                    <TextInput style={styles.input}
                               value={this.state.notes}
                               onChangeText={(text) => this.handleChange("notes", text)}
                    />
                </SafeAreaView>

                <SafeAreaView style={styles.innerContainer}>
                    <Button
                        title="clear"
                        onPress={this.clearAll}
                    />
                    <Button title="submit"
                        onPress={this.submit}
                    />
                </SafeAreaView>
            </SafeAreaView>
        );
    }
}