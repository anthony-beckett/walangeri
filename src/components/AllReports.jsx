/**
 * AllReports Component
 *
 * Displays a searchable list of maintenance reports. The component includes a search field at the top
 * for filtering reports by name. Each report is rendered using the Report component in a scrollable view.
 *
 * Props:
 * - reports (array): Array of report objects, each containing details such as reportName, addressLot,
 *   jobType, urgencyLevel, and notes. Passed down to render each report.
 * - setReports (function): Function to update the reports state after actions like deletion or editing.
 *
 * State:
 * - searchQuery (string): Holds the current search input value to filter reports based on reportName.
 *
 * Structure:
 * - TextInput: A search input field at the top that updates searchQuery state.
 * - ScrollView: A scrollable container displaying each filtered report, allowing users to scroll through the list.
 *
 * Usage:
 * The component is intended to be used as part of a navigation route after user authentication. It relies on
 * the Report component to display individual report details and handle report-specific actions.
 */

import React, { useState } from 'react';
import { ScrollView, TextInput, View } from 'react-native';
import allReportsStyle from '../styles/allReportsStyle';
import Report from './Report';

const AllReports = ({ reports, setReports }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredReports = reports.filter((report) =>
        report.reportName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={{ flex: 1 }}>
            {/* Search Input */}
            <TextInput
                style={allReportsStyle.searchInput}
                placeholder="Search reports by name..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />

            {/* Display filtered reports */}
            <ScrollView contentContainerStyle={allReportsStyle.scrollViewContainer}>
                {filteredReports.map((report) => (
                    <Report 
                        key={report.id} 
                        report={report}
                        reports={reports}
                        setReports={setReports} 
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default AllReports;