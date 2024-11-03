/**
 * Register Component
 *
 * Registration screen for new users. Includes fields for email, username, and password.
 * Form validation handled with Yup schema validation.
 * 
 * Navigation:
 * - On successful registration, navigates to SignIn page with a success notification.
 */

import { View, TextInput, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import signInStyle from '../styles/signInStyle';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import React, { useState } from 'react';
import userService from '../services/users';

const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email address').required('Email is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: '', username: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                await userService.register({
                    username: values.email,
                    name: values.username,
                    password: values.password
                });
                navigate('/signin', {state: {notificationMessage: 'Registered! Now, please sign in to the Walangeri app!'}})
            } catch (exception) {
                setNotificationMessage("Error! Registration failed.");
                setTimeout(() => setNotificationMessage(''), 5000);
            }
        },
    });

    return (
        <View style={signInStyle.container}>
            <Text style={signInStyle.heading}>Register for Walangeri App</Text>
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
                style={[signInStyle.input, formik.touched.username && formik.errors.username ? signInStyle.inputError : null]}
                placeholder="Name"
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username && (
                <Text style={signInStyle.errorText}>{formik.errors.username}</Text>
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
                <Text style={signInStyle.buttonText}>Register</Text>
            </Pressable>
        </View>
    );
};

export default Register;