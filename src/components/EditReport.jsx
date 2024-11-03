/**
 * EditReport Component
 *
 * Allows the user to edit an existing report's details. Form fields include report name, address, job type, urgency level, and notes.
 * Form validation is handled using Yup schema validation.
 *
 * Props:
 * - reports (array): List of all maintenance reports.
 * - setReports (function): Function to update the reports state after editing.
 */

import React from 'react';
import {View, TextInput, Pressable, Text, Button, ScrollView, TouchableOpacity} from 'react-native';
import { useFormik } from 'formik';
import { editReportStyles } from '../styles/editReportStyles';
import RNPickerSelect from 'react-native-picker-select';
import { useLocation, useNavigate } from 'react-router-native';
import * as yup from 'yup';
import reportService from '../services/reports'
import {Image} from "expo-image";
import {newReportStyles} from "../styles/newReportStyles";
import * as ImagePicker from "expo-image-picker";

// Yup validation schema for form validation (https://www.npmjs.com/package/yup/v/1.0.0-alpha.3)
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
    // Image picker configuration
    const imageOptions = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 0.4,
        base64: true,
    };

    /**
     * Opens the device's photo library to select an image for the report.
     */
    const openCameraRoll = async () => {
        const permission
            = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert("You've refused to allow this app to access your camera roll!");
            return;
        }

        let result
            = await ImagePicker.launchImageLibraryAsync(imageOptions);

        //console.log(result);

        if (!result.canceled) {
            formik.setFieldValue('image', result.assets[0].base64);
        }
    };

    /**
     * Opens the device's camera to capture an image for the report.
     */
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


        if (!result.cancelled) {
            formik.setFieldValue('image', result.assets[0].base64);
        }
    }


    const formik = useFormik({
        initialValues: {
            image: report.image,
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

            // Update report in backend and local state
            reportService
                .update(report.id, updatedReport)
                .then(returnedReport => {
                    setReports(reports.map((r) => (r.id !== report.id ? r : returnedReport)))
                    navigate('/allreports')
                })
                .catch((error) => {
                    console.error('Error updating report:', error);
                });
        },
    });

    return (
        <ScrollView style={editReportStyles.container}>
            <Text style={editReportStyles.heading}>Edit Report</Text>

            {formik.values.image && (<View style={{
                width: 200,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Image
                    source={{uri: `data:image/jpeg;base64,${formik.values.image}`}}

                    style={{
                        width: 200,
                        height: 200,
                        alignSelf: 'center',
                        margin: 5,
                    }}
                    contentFit="cover"
                />

                <TouchableOpacity onPress={() => {
                    console.log("Image deleted");
                    formik.setFieldValue('image', null);
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
            </View>)}

            <View style={{
                paddingBottom: 5,
                flexDirection: 'row',
            }}>
                <Pressable style={[
                    newReportStyles.button,
                    {
                        width: "50%",
                    }
                ]}
                           onPress={() => openCameraRoll()}>
                    <Text style={newReportStyles.buttonText}>🖼️</Text>
                </Pressable>


                <Pressable style={[
                    newReportStyles.button,
                    {
                        width: "50%",
                    }
                ]}
                           onPress={openCamera}>
                    <Text style={newReportStyles.buttonText}>📷</Text>
                </Pressable>
            </View>

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
        </ScrollView>
    );
};

export default EditReport;