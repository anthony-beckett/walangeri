import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Footer from './Footer';
import theme from '../theme';

// Validation Schema using Yup
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

const NewReport = () => {
  const [successMessage, setSuccessMessage] = useState(null);

  // Formik setup
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
      setSuccessMessage('Success');
      resetForm();
      setTimeout(() => setSuccessMessage(null), 3000); // Remove success message after 3 seconds
    },
  });

  return (
    <View style={styles.container}>
      {/* Success Message */}
      {successMessage && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>{successMessage}</Text>
        </View>
      )}

      {/* Form Heading */}
      <Text style={styles.heading}>Report a New Fault</Text>

      {/* Report Name */}
      <TextInput
        style={[
          styles.input,
          formik.touched.reportName && formik.errors.reportName && styles.inputError,
        ]}
        placeholder="Report Name"
        onChangeText={formik.handleChange('reportName')}
        onBlur={formik.handleBlur('reportName')}
        value={formik.values.reportName}
      />
      {formik.touched.reportName && formik.errors.reportName && (
        <Text style={styles.errorText}>{formik.errors.reportName}</Text>
      )}

      {/* Address/Lot */}
      <TextInput
        style={[
          styles.input,
          formik.touched.addressLot && formik.errors.addressLot && styles.inputError,
        ]}
        placeholder="Address/Lot"
        onChangeText={formik.handleChange('addressLot')}
        onBlur={formik.handleBlur('addressLot')}
        value={formik.values.addressLot}
      />
      {formik.touched.addressLot && formik.errors.addressLot && (
        <Text style={styles.errorText}>{formik.errors.addressLot}</Text>
      )}

      {/* Job Type Dropdown */}
      <RNPickerSelect
        onValueChange={(value) => formik.setFieldValue('jobType', value)}
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
        <Text style={styles.errorText}>{formik.errors.jobType}</Text>
      )}

      {/* Urgency Level Dropdown */}
      <RNPickerSelect
        onValueChange={(value) => formik.setFieldValue('urgencyLevel', value)}
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
        <Text style={styles.errorText}>{formik.errors.urgencyLevel}</Text>
      )}

      {/* Notes */}
      <TextInput
        style={styles.input}
        placeholder="Notes"
        onChangeText={formik.handleChange('notes')}
        value={formik.values.notes}
        multiline
        numberOfLines={3}
      />

      {/* Submit Button */}
      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>

      <Footer />
    </View>
  );
};

// Custom picker styles
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: '#000',  // To ensure the text is visible on iOS
  },
  inputAndroid: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    color: '#000',  // To ensure the text is visible on Android
  },
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: theme.colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  successMessage: {
    backgroundColor: 'green',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  successText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default NewReport;