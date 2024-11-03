/**
 * AllReports Component
 *
 * Displays a list of all maintenance reports in a scrollable view.
 * Each report is rendered by the Report component.
 *
 * Props:
 * - reports (array): List of all maintenance reports.
 * - setReports (function): Function to update the reports state.
 */

import { ScrollView } from 'react-native';
import allReportsStyle from '../styles/allReportsStyle';
import Report from './Report'; // Import the Report component

const AllReports = ({ reports, setReports }) => {
    return (
        <ScrollView style={allReportsStyle.container}>
            {reports.map((report) => (
                <Report 
                    key={report.id} 
                    report={report}
                    reports={reports}
                    setReports={setReports} 
                />
            ))}
        </ScrollView>
    );
};

export default AllReports;