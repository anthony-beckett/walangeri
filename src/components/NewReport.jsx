import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { newReportStyles, pickerSelectStyles } from '../styles/newReportStyles';
import { View, TextInput, Pressable, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Footer from './Footer';
import Notification from './Notification';
import { useLocation } from 'react-router-native';
import axios from 'axios';

const validationSchema = yup.object().shape({
    reportName: yup
        .string()
        .required('Report name is required'),
    addressLot: yup
        .string()
        .required('Address/Lot is required'),
    jobType: yup
        .string()
        .required('Job Type is required'),
    urgencyLevel: yup
        .string()
        .required('Urgency Level is required'),
});

const NewReport = ({ reports, setReports }) => {
    const location = useLocation();
    const [notificationMessage, setNotificationMessage] = useState('');

    useEffect(() => {
        if (location.state && location.state.notificationMessage) {
            setNotificationMessage(location.state.notificationMessage)
            setTimeout(() => setNotificationMessage(''), 5000)
        }
    }, [location.state]);

    const formik = useFormik({
        initialValues: {
          reportName: '',
          addressLot: '',
          jobType: '',
          urgencyLevel: '',
          notes: '',
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
          console.log(values);
          const reportObject = {
            id: String(reports.length + 1),
            reportName: values.reportName,
            addressLot: values.addressLot,
            jobType: values.jobType,
            urgencyLevel: values.urgencyLevel,
            notes: values.notes
          }
          axios
            .post('http://192.168.1.7:3001/reports', reportObject)
            .then(response => {
                console.log(response)
                setReports(reports.concat(response.data))
            })

          setNotificationMessage('Report successfully submitted!');
          resetForm();
          setTimeout(() => setNotificationMessage(''), 5000);
        },
    });

    return (
        <View style={newReportStyles.container}>
            <Notification message={notificationMessage} />

            <Text style={newReportStyles.heading}>Report a New Fault</Text>

            <TextInput 
                style={[newReportStyles.input, formik.touched.reportName && formik.errors.reportName ? newReportStyles.inputError : null]}
                placeholder="Report Name"
                onChangeText={formik.handleChange('reportName')}
                onBlur={formik.handleBlur('reportName')}
                value={formik.values.reportName}
            />
            {formik.touched.reportName && formik.errors.reportName && (
                <Text style={newReportStyles.errorText}>{formik.errors.reportName}</Text>
            )}

            <TextInput 
                style={[newReportStyles.input, formik.touched.addressLot && formik.errors.addressLot ? newReportStyles.inputError : null]}
                placeholder="Address/Lot"
                onChangeText={formik.handleChange('addressLot')}
                onBlur={formik.handleBlur('addressLot')}
                value={formik.values.addressLot}
            />
            {formik.touched.addressLot && formik.errors.addressLot && (
                <Text style={newReportStyles.errorText}>{formik.errors.addressLot}</Text>
            )}

            <RNPickerSelect
                onValueChange={value => formik.setFieldValue('jobType', value)}
                value={formik.values.jobType}
                items={[
                    { label: 'Carpentry', value: 'Carpentry' },
                    { label: 'Electrician', value: 'Electrician' },
                    { label: 'Plumbing', value: 'Plumbing' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Select Job Type", value: null }}
            />
            {formik.touched.jobType && formik.errors.jobType && (
                <Text style={newReportStyles.errorText}>{formik.errors.jobType}</Text>
            )}

            <RNPickerSelect
                onValueChange={value => formik.setFieldValue('urgencyLevel', value)}
                value={formik.values.urgencyLevel}
                items={[
                    { label: 'Low', value: 'Low' },
                    { label: 'Medium', value: 'Medium' },
                    { label: 'High', value: 'High' },
                ]}
                style={pickerSelectStyles}
                placeholder={{ label: "Select Urgency Level", value: null }}
            />
            {formik.touched.urgencyLevel && formik.errors.urgencyLevel && (
                <Text style={newReportStyles.errorText}>{formik.errors.urgencyLevel}</Text>
            )}

            <TextInput
                style={newReportStyles.input}
                placeholder="Notes"
                onChangeText={formik.handleChange('notes')}
                value={formik.values.notes}
                multiline
                numberOfLines={3}
            />

            <Pressable style={newReportStyles.button} onPress={formik.handleSubmit}>
                <Text style={newReportStyles.buttonText}>Submit</Text>
            </Pressable>

            <Footer />
        </View>
    );
};

export default NewReport;