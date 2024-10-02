import React from 'react';
import { View, TextInput, Pressable, Text, Button } from 'react-native';
import { useFormik } from 'formik';
import { editReportStyles } from '../styles/editReportStyles';
import RNPickerSelect from 'react-native-picker-select';
import { useLocation, useNavigate } from 'react-router-native';
import axios from 'axios';
import * as yup from 'yup';

const validationSchema = yup.object().shape({
    reportName: yup.string().required('Report name is required'),
    addressLot: yup.string().required('Address/Lot is required'),
    jobType: yup.string().required('Job Type is required'),
    urgencyLevel: yup.string().required('Urgency Level is required'),
});

const EditReport = ({ reports, setReports }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { report } = location.state;

    const formik = useFormik({
        initialValues: {
            reportName: report.reportName,
            addressLot: report.addressLot,
            jobType: report.jobType,
            urgencyLevel: report.urgencyLevel,
            notes: report.notes || '',
        },
        validationSchema,
        onSubmit: (values) => {
            const updatedReport = {
                ...report,
                ...values,
            };

            axios
                .put(`http://192.168.1.7:3001/reports/${report.id}`, updatedReport)
                .then((response) => {
                    setReports(reports.map((r) => (r.id !== report.id ? r : response.data)))
                    navigate('/allreports')
                })
                .catch((error) => {
                    console.error('Error updating report:', error);
                });
        },
    });

    return (
        <View style={editReportStyles.container}>
            <Text style={editReportStyles.heading}>Edit Report</Text>

            <TextInput
                style={editReportStyles.input}
                placeholder="Report Name"
                onChangeText={formik.handleChange('reportName')}
                onBlur={formik.handleBlur('reportName')}
                value={formik.values.reportName}
            />
            {formik.touched.reportName && formik.errors.reportName && (
                <Text style={editReportStyles.errorText}>{formik.errors.reportName}</Text>
            )}

            <TextInput
                style={editReportStyles.input}
                placeholder="Address/Lot"
                onChangeText={formik.handleChange('addressLot')}
                onBlur={formik.handleBlur('addressLot')}
                value={formik.values.addressLot}
            />
            {formik.touched.addressLot && formik.errors.addressLot && (
                <Text style={editReportStyles.errorText}>{formik.errors.addressLot}</Text>
            )}

            <RNPickerSelect
                onValueChange={(value) => formik.setFieldValue('jobType', value)}
                value={formik.values.jobType}
                items={[
                    { label: 'Carpentry', value: 'Carpentry' },
                    { label: 'Electrician', value: 'Electrician' },
                    { label: 'Plumbing', value: 'Plumbing' },
                ]}
                style={editReportStyles.pickerSelectStyles}
                placeholder={{ label: 'Select Job Type', value: null }}
            />
            {formik.touched.jobType && formik.errors.jobType && (
                <Text style={editReportStyles.errorText}>{formik.errors.jobType}</Text>
            )}

            <RNPickerSelect
                onValueChange={(value) => formik.setFieldValue('urgencyLevel', value)}
                value={formik.values.urgencyLevel}
                items={[
                    { label: 'Low', value: 'Low' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'High', value: 'High' },
                ]}
                style={editReportStyles.pickerSelectStyles}
                placeholder={{ label: 'Select Urgency Level', value: null }}
            />
            {formik.touched.urgencyLevel && formik.errors.urgencyLevel && (
                <Text style={editReportStyles.errorText}>{formik.errors.urgencyLevel}</Text>
            )}

            <TextInput
                style={editReportStyles.input}
                placeholder="Notes"
                onChangeText={formik.handleChange('notes')}
                value={formik.values.notes}
                multiline
                numberOfLines={3}
            />

            <Pressable style={editReportStyles.button} onPress={formik.handleSubmit}>
                <Text style={editReportStyles.buttonText}>Submit</Text>
            </Pressable>

            <Button title="Back" onPress={() => navigate('/allreports')} />
        </View>
    );
};

export default EditReport;