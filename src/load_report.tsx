import React, { useState } from 'react';
import { Text, TextInput, Button, View, SafeAreaView, Alert } from 'react-native';
import { styles } from '../stylesheets/load_report';

export const LoadReport = () => {
  const [reportName, setReportName] = useState('');
  const [reportDetails, setReportDetails] = useState<any>(null);

  // Mock report data for "Electricity issue"
  const mockReport = {
    reportName: 'Electricity issue',
    addressLot: '2A Maud Street, Rostrevor SA 5073',
    jobType: 'Electrician',
    urgencyLevel: 'Medium',
    notes: 'This is a test',
  };

  // Handle submit button
  const handleSubmit = () => {
    if (reportName.toLowerCase() === 'electricity issue') {
      setReportDetails(mockReport);
    } else {
      Alert.alert('Report not found!', 'Please enter a valid report name.');
      setReportDetails(null);
    }
  };

  return (
    <SafeAreaView style={styles.greaterContainer}>
      <Text style={styles.title}>Load Report</Text>

      <View style={styles.innerContainer}>
        <Text style={styles.label}>Report Name:</Text>
        <TextInput
          style={styles.input}
          value={reportName}
          onChangeText={setReportName}
          placeholder="Enter report name..."
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Submit" onPress={handleSubmit} />
      </View>

      {reportDetails && (
        <View style={styles.tableContainer}>
          <Text style={styles.tableHeader}>Report Details</Text>
          <Text style={styles.tableRow}>Report Name: {reportDetails.reportName}</Text>
          <Text style={styles.tableRow}>Address/Lot: {reportDetails.addressLot}</Text>
          <Text style={styles.tableRow}>Job Type: {reportDetails.jobType}</Text>
          <Text style={styles.tableRow}>Urgency Level: {reportDetails.urgencyLevel}</Text>
          <Text style={styles.tableRow}>Notes: {reportDetails.notes}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};