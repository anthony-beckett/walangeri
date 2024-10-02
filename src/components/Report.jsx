import { View, Text, Button } from 'react-native';
import allReportsStyle from '../styles/allReportsStyle';
import { useNavigate } from 'react-router-native'

const Report = ({ report }) => {
    const navigate = useNavigate()

    const handleEdit = () => {
        navigate(`/editreport/${report.id}`, { state: { report } })
    }

    return (
        <View style={allReportsStyle.reportContainer}>
            <Text style={allReportsStyle.reportName}>{report.reportName}</Text>
            <Text>Address/Lot: {report.addressLot}</Text>
            <Text>Job Type: {report.jobType}</Text>
            <Text>Urgency Level: {report.urgencyLevel}</Text>
            <Text>Notes: {report.notes}</Text>
            <Button title="Edit" onPress={handleEdit} />
        </View>
    );
};

export default Report;