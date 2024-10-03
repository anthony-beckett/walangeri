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