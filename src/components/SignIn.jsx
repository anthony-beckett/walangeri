import { View, TextInput, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import signInStyle from '../styles/signInStyle';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import React from 'react';

const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required'),
});

const SignIn = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: values => {
          console.log('Login:', values);
          navigate('/', { state: { notificationMessage: 'Signed in! Now, use the Walangeri app\'s reporting functionality' } });
        },
    });

    return (
        <View style={signInStyle.container}>
            <Text style={signInStyle.heading}>Sign into the Walangeri app</Text>

            <TextInput
                style={[signInStyle.input, formik.touched.email && formik.errors.email ? signInStyle.inputError : null]}
                placeholder="Email"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                keyboardType="email-address"
            />
            {formik.touched.email && formik.errors.email && (
                <Text style={signInStyle.errorText}>{formik.errors.email}</Text>
            )}

            <TextInput
                style={[signInStyle.input, formik.touched.password && formik.errors.password ? signInStyle.inputError : null]}
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
                <Text style={signInStyle.errorText}>{formik.errors.password}</Text>
            )}

            <Pressable style={signInStyle.loginButton} onPress={formik.handleSubmit}>
                <Text style={signInStyle.buttonText}>Login</Text>
            </Pressable>
        </View>
    );
}

export default SignIn;