import React, { useState } from 'react';
import { Text, Button, View, SafeAreaView, Alert, FlatList, StyleSheet } from 'react-native';

export const ExportReport = () => {
  // Mock report names (for now, only one report)
  const mockReports = [
    { reportName: 'Electricity issue' },
  ];

  // State to store the selected report
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  // Handle Export button
  const handleExport = () => {
    if (selectedReport) {
      Alert.alert(`${selectedReport} report exported!`);
    } else {
      Alert.alert('Please select a report to export.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Export a Report</Text>

      {/* List of report names */}
      <FlatList
        data={mockReports}
        keyExtractor={(item) => item.reportName}
        renderItem={({ item }) => (
          <View style={styles.reportContainer}>
            {/* Display report name above the button */}
            <Text style={styles.label}>{item.reportName}</Text>
            <View style={styles.buttonWrapper}>
              <Button
                title={`Select ${item.reportName}`}
                onPress={() => setSelectedReport(item.reportName)}
              />
            </View>
          </View>
        )}
      />

      {/* Export Button */}
      <View style={styles.buttonWrapper}>
        <Button title="Export" onPress={handleExport} />
      </View>

      {/* Display the selected report at the bottom */}
      {selectedReport && (
        <Text style={styles.selectedReport}>Selected Report: {selectedReport}</Text>
      )}
    </SafeAreaView>
  );
};

// New styles for proper centering and button text handling (will add stylesheet later)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  reportContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '80%',
    alignItems: 'center',
    marginVertical: 10,
  },
  selectedReport: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
