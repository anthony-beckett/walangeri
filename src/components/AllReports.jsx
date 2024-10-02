import { ScrollView } from 'react-native';
import allReportsStyle from '../styles/allReportsStyle';
import Report from './Report'; // Import the Report component

const AllReports = ({ reports }) => {
    return (
        <ScrollView style={allReportsStyle.container}>
            {reports.map((report) => (
                <Report key={report.id} report={report} /> // Render each report using the Report component
            ))}
        </ScrollView>
    );
};

export default AllReports;