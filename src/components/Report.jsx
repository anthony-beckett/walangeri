/**
 * Report Component
 *
 * Displays details of a single report in the list of all reports. Provides options to edit or delete the report.
 *
 * Props:
 * - report (object): The report object with details like report name, address, job type, etc.
 * - reports (array): List of all reports.
 * - setReports (function): Function to update the reports state after deletion.
 */

import {View, Text, Button, Alert, Modal, TouchableOpacity} from 'react-native';
import allReportsStyle from '../styles/allReportsStyle';
import { useNavigate } from 'react-router-native'
import reportService from '../services/reports'
import {Image} from "expo-image";
import React, {useState} from "react";

const Report = ({ report, reports, setReports }) => {
    const navigate = useNavigate()
    const [showFullScreen, setShowFullScreen] = useState(false);

     /**
      * Navigates to the EditReport screen, passing the current report's data.
      */
    const handleEdit = () => {
        navigate(`/editreport/${report.id}`, { state: { report } })
    }

    /**
     * Deletes the report after user confirmation.
     */
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
            {report.image && (
                <TouchableOpacity onPress={() => setShowFullScreen(true)}
                style={{width: 100, height: 100}}>
                    <Image source={{ uri: `data:image/jpeg;base64,${report.image}` }}
                       contentFit={'contain'}
                       style={{
                           width: 100,
                           height: 100,
                       }}
                    />
                </TouchableOpacity>
                )}
            <Text>Address/Lot: {report.addressLot}</Text>
            <Text>Job Type: {report.jobType}</Text>
            <Text>Urgency Level: {report.urgencyLevel}</Text>
            <Text>Notes: {report.notes}</Text>
            <Button title="Edit" onPress={handleEdit} />
            <Button title="Delete" onPress={handleDelete} color="red" />

            <Modal
                presentationStyle={"overFullScreen"}
                visible={showFullScreen}>
                <View style={{width:'100%', height:'100%'}}>
                    <Image
                        source={{ uri: `data:image/jpeg;base64,${report.image}` }}
                        contentFit="contain"
                        style={{flex: 1}}
                    />
                    <TouchableOpacity onPress={() => {
                        setShowFullScreen(false);
                    }}
                                      style={{
                                          position: 'absolute',
                                          top: 10,
                                          right: 10,
                                          // Semi-transparent background
                                          backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                          borderRadius: 50,
                                          padding: 10,
                                      }}
                    >
                        <Text>❌</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

export default Report;