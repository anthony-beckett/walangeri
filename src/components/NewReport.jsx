import * as yup from 'yup';
import { useFormik } from 'formik';
import { newReportStyles, pickerSelectStyles } from '../styles/newReportStyles';
import { View, TextInput, Pressable, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import Footer from './Footer'

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
})

const NewReport = () => {
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
        },
    });

    return (
        <View style={newReportStyles.container}>
            <Text style={newReportStyles.heading}>Report a New Fault</Text>

            <TextInput 
                style={newReportStyles.input}
                placeholder="Report Name"
                onChangeText={formik.handleChange('reportName')}
                onBlur={formik.handleBlur('reportName')}
                value={formik.values.reportName}
            />

            <TextInput 
                style={newReportStyles.input}
                placeholder="Address/Lot"
                onChangeText={formik.handleChange('addressLot')}
                onBlur={formik.handleBlur('addressLot')}
                value={formik.values.addressLot}
            />

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
    )
}

export default NewReport