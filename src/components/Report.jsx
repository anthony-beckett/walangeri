import { View, Text, Button, Alert } from 'react-native';
import allReportsStyle from '../styles/allReportsStyle';
import { useNavigate } from 'react-router-native'
import reportService from '../services/reports'

const Report = ({ report, reports, setReports }) => {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/editreport/${report.id}`, { state: { report } })
    }

    const handleDelete = () => {
        Alert.alert(
            'Delete Report',
            `Are you sure you want to delete "${report.reportName}"?`,
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Delete canceled'),
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => {
                        reportService
                            .deleteReport(report.id)
                            .then(() => {
                                setReports(reports.filter(r => r.id !== report.id));
                            })
                            .catch(error => {
                                console.error('Error deleting report:', error);
                            });
                    },
                },
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={allReportsStyle.reportContainer}>
            <Text style={allReportsStyle.reportName}>{report.reportName}</Text>
            <Text>Address/Lot: {report.addressLot}</Text>
            <Text>Job Type: {report.jobType}</Text>
            <Text>Urgency Level: {report.urgencyLevel}</Text>
            <Text>Notes: {report.notes}</Text>
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Delete" onPress={handleDelete} color="red" />
        </View>
    );
};

export default Report;