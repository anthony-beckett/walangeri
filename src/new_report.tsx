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
        this.setValue = this.setValue.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearAll     = this.clearAll.bind(this);
        this.submit       = this.submit.bind(this);
    }

    setValue(property: string, callback: any): void {
        this.setState(state => ({
            [property]: callback(state[property])
        }));
    }

    handleChange = (name: string, value: any) => {
        console.log(name, value);
        this.setState({ [name]: value });
    };

    protected generateName(): string {
        return new Date().toISOString() + "_report";
    }

    protected clearAll(): void {
        Object.keys(this.state).forEach(key => {
            if (key !== "items") {
                this.setState({ [key]: "" }); // Reset all properties to empty strings
            }
        });
    }

    private submit(): void {
        Object.entries(this.state).forEach(([key, value]) => {
            console.log(key + ": ", value);
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
                    <SafeAreaView style={styles.button}>
                        <Button title={"\u21BB"}
                            onPress={() => this.handleChange("reportName", this.generateName())}
                        />
                    </SafeAreaView>
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
                        style={styles.dropdown}
                        closeAfterSelecting={true}
                        showTickIcon={true}
                        placeholder={"Choose an urgency level"}
                        value={this.state.value}
                        items={this.state.items}
                        open={this.state.open}
                        setValue={(value) => this.setValue("value", value)}
                        setOpen = { (val) =>
                            this.handleChange("open", val)
                        }
                        setItems = { (val) =>
                            this.handleChange("items", val)
                        }
                        mode={"BADGE"}
                        showBadgeDot={true}
                        badgeDotColors = {[
                            "#CFB407", // Yellow
                            "#FF8400", // Orange
                            "#FF0000", // Red
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
                    <SafeAreaView style={styles.button}>
                        <Button
                            title="clear"
                            onPress={this.clearAll}
                        />
                    </SafeAreaView>

                    <SafeAreaView style={styles.button}>
                            <Button title="submit"
                            onPress={this.submit}
                            />
                    </SafeAreaView>
                </SafeAreaView>
            </SafeAreaView>
        );
    }
}