import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { newReportStyles, pickerSelectStyles } from '../styles/newReportStyles';
import {View, TextInput, StyleSheet, Pressable, Text, Button, TouchableOpacity, ScrollView} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Footer from './Footer';
import Notification from './Notification';
import { useLocation } from 'react-router-native';
import reportService from '../services/reports'
import * as ImagePicker from 'expo-image-picker';
import {string} from "yup";
import { Image } from 'expo-image';

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
    const imageOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        base64: true,
    };
    const blurhash
        = '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const openCameraRoll = async () => {
        const permission
            = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("You've refused to allow this app to access your camera roll!");
            return;
        }

        let result
            = await ImagePicker.launchImageLibraryAsync(imageOptions);

        console.log(result);

        if (!result.canceled) {
            formik.setFieldValue('image', result.assets[0]);
            console.log(result.assets[0]);
        }
    };

    const openCamera = async () => {
        // Ask the user for the permission to access the camera
        const permission
            = await ImagePicker.requestCameraPermissionsAsync();

        if (!permission.granted) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result
            = await ImagePicker.launchCameraAsync(imageOptions);

        // Explore the result
        console.log(result);

        if (!result.cancelled) {
            formik.setFieldValue('image', result.assets[0]);
            console.log("Result:", result);
        }
    }

        useEffect(() => {
        if (location.state && location.state.notificationMessage) {
            setNotificationMessage(location.state.notificationMessage)
            setTimeout(() => setNotificationMessage(''), 5000)
        }
    }, [location.state]);

    const formik = useFormik({
        initialValues: {
          image: null,
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
            image: values.image,
            reportName: values.reportName,
            addressLot: values.addressLot,
            jobType: values.jobType,
            urgencyLevel: values.urgencyLevel,
            notes: values.notes
          }
          reportService
            .create(reportObject)
            .then(returnedReport => {
                console.log(returnedReport)
                setReports(reports.concat(returnedReport))
            })
            .catch(error => {
                console.log(error)
            })

          setNotificationMessage('Report successfully submitted!');
          resetForm();
          setTimeout(() => setNotificationMessage(''), 5000);
        },
    });

    return (
        <ScrollView style={newReportStyles.container}>
            <Notification message={notificationMessage}/>

            <Text style={newReportStyles.heading}>Report a New Fault</Text>

            <Image
                source={formik.values.image}
                placeholder={{blurhash}}
                style={{
                    width: 200,
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                contentFit="cover"
                transition={1000}
            />
            <Pressable style={newReportStyles.button}
                    onPress={() => openCameraRoll()}>
                <Text style={newReportStyles.buttonText}>🖼️</Text>
            </Pressable>
            {formik.values.image && (
                <Pressable onPress={() => {
                    formik.setFieldValue('image', null)
                }}>
                    <Text>❌</Text>
                </Pressable>
            )}

            <Pressable style={newReportStyles.button}
                       onPress={openCamera}>
                <Text style={newReportStyles.buttonText}>📷</Text>
            </Pressable>

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
                    {label: 'Carpentry', value: 'Carpentry'},
                    {label: 'Electrician', value: 'Electrician'},
                    {label: 'Plumbing', value: 'Plumbing'},
                ]}
                style={pickerSelectStyles}
                placeholder={{label: "Select Job Type", value: null}}
            />
            {formik.touched.jobType && formik.errors.jobType && (
                <Text style={newReportStyles.errorText}>{formik.errors.jobType}</Text>
            )}

            <RNPickerSelect
                onValueChange={value => formik.setFieldValue('urgencyLevel', value)}
                value={formik.values.urgencyLevel}
                items={[
                    {label: 'Low', value: 'Low'},
                    {label: 'Medium', value: 'Medium'},
                    {label: 'High', value: 'High'},
                ]}
                style={pickerSelectStyles}
                placeholder={{label: "Select Urgency Level", value: null}}
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

            <Footer/>
        </ScrollView>
    );
};

export default NewReport;