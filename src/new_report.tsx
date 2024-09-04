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
            // Job Type picker options begin
            jtOpen  : false,
            jtItems : [
                { label: "Carpentry",    value: "carpentry" },
                { label: "Electrician", value: "electrician" },
                { label: "Plumbing",   value: "plumbing" },
            ],
            jtValue : null,
            // end
            // Urgency level picker options begin
            ulOpen  : false,
            ulItems : [
                { label: "Low",    value: "low" },
                { label: "Medium", value: "medium" },
                { label: "High",   value: "high" },
            ],
            ulValue : null,
            // end
            notes : "",
        };
        this.setValue     = this.setValue.bind(this);
        this.setOpen      = this.setOpen.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.clearAll     = this.clearAll.bind(this);
        this.submit       = this.submit.bind(this);
    }

    setValue(property: string, callback: any): void {
        this.setState(state => ({
            [property]: callback(state[property])
        }));
    }

    setOpen(open: string, val: any): void {
        const condition = new RegExp(".*Open$");

        // Open selected dropdownpicker
        this.setState({ [open]: val });

        // Close all other dropdownpickers
        Object.keys(this.state).forEach(key => {
            // Only close if: key matches regex (aka is a picker),
            // the picker isn't the picker you're opening, and
            // any other picker is actually open
            if (condition.test(key)
                && key !== open
                && this.state[key]) {
                this.setState({ [key]: false })
            }
        });
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
            if ((typeof this.state[key]) !== "object") {
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

                <View style={styles.innerContainer}>
                    <Text style={styles.label}>Job type:</Text>
                    <DropDownPicker
                        style={styles.dropdown}
                        closeAfterSelecting={true}
                        showTickIcon={true}
                        placeholder={"Choose a job type..."}
                        value={this.state.jtValue}
                        items={this.state.jtItems}
                        open={this.state.jtOpen}
                        setValue={ (val) => this.setValue("jtValue", val) }
                        setOpen = { (val) =>
                            this.setOpen("jtOpen", val)
                        }
                        setItems = { (val) =>
                            this.handleChange("jtItems", val)
                        }
                    />
                </View>

                <View style={styles.innerContainer}>
                    <Text style={styles.label}>Urgency Level:</Text>
                    <DropDownPicker
                        style={styles.dropdown}
                        closeAfterSelecting={true}
                        showTickIcon={true}
                        placeholder={"Choose an urgency level..."}
                        value={this.state.ulValue}
                        items={this.state.ulItems}
                        open={this.state.ulOpen}
                        setValue={(val) => this.setValue("ulValue", val)}
                        setOpen = { (val) =>
                            this.setOpen("ulOpen", val)
                        }
                        setItems = { (val) =>
                            this.handleChange("ulItems", val)
                        }
                        mode={"BADGE"}
                        showBadgeDot={true}
                        badgeDotColors = {[
                            "#CFB407", // Yellow
                            "#FF8400", // Orange
                            "#FF0000", // Red
                        ]}
                    />
                </View>

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