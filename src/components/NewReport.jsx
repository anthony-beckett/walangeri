import * as yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { newReportStyles, pickerSelectStyles } from '../styles/newReportStyles';
import {View, TextInput, StyleSheet, Pressable, Text, Button, TouchableOpacity} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import Footer from './Footer';
import Notification from './Notification';
import { useLocation } from 'react-router-native';
import reportService from '../services/reports'
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
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
    const [image, setImage] = useState(null);
    const [cameraRollPermission, requestCameraRollPermission] = ImagePicker.useMediaLibraryPermissions();



    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            base64: true,
            // allowsMultipleSelection: true,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };


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

    if (!cameraRollPermission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!cameraRollPermission.granted) {
        const requestCameraPermissions = () => {
            requestCameraRollPermission();
        }
        // Camera permissions are not granted yet.
        return (
            <View >
                <Text>We need your permission to show the camera</Text>
                <Button onPress={requestCameraPermissions} title="grant permission" />
            </View>
        );
    }

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


    return (
        <View style={newReportStyles.container}>
            <Notification message={notificationMessage}/>

            <Text style={newReportStyles.heading}>Report a New Fault</Text>

            {/*<CameraView*/}
            {/*    style={absoluteFillObject}*/}
            {/*    facing={'back'} isActive={true}>*/}
            {/*    <View>*/}
            {/*        <TouchableOpacity onPress={toggleCameraFacing}>*/}
            {/*            <Text>Flip Camera</Text>*/}
            {/*        </TouchableOpacity>*/}
            {/*    </View>*/}
            {/*</CameraView>*/}

            <Image
                source={image}
                placeholder={{ blurhash }}
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
                    onPress={pickImage}>
                <Text style={newReportStyles.buttonText}>Pick an image from camera roll</Text>
            </Pressable>
            {image && (
                <Pressable onPress={() => setImage(null)}>
                    <Text>❌</Text>
                </Pressable>
            )}

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
        </View>
    );
};

export default NewReport;