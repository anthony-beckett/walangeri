/**
 * SignIn Component
 *
 * Login screen for existing users. Includes fields for email and password.
 * On successful login, navigates to the main app screen.
 * 
 * Props:
 * - setUser (function): Function to set the authenticated user in the parent component.
 */

import { View, TextInput, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import signInStyle from '../styles/signInStyle';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import React, { useState, useEffect } from 'react';
import loginService from '../services/login';
import Notification from './Notification';
import reportService from '../services/reports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocation } from 'react-router-native'

const validationSchema = yup.object().shape({
    username: yup.string().email('Invalid email address').required('Email is required'),
    password: yup.string().required('Password is required'),
});

const SignIn = ({ setUser }) => {
    const navigate = useNavigate();
    const location = useLocation()
    const [errorMessage, setErrorMessage] = useState('');
    const [notificationMsg, setNotificationMsg] = useState('')

    useEffect(() => {
        // Display success notification from Register component if available
        if (location.state && location.state.notificationMessage) {
            setNotificationMsg(location.state.notificationMessage)
            setTimeout(() => setNotificationMsg(''), 5000)
        }
    }, [location.state])

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const tryLogin = await loginService.login({
                    username: values.username,
                    password: values.password
                });
                reportService.setToken(tryLogin.token);
                setUser(tryLogin);
                await AsyncStorage.setItem('user', JSON.stringify(tryLogin));
            } catch (exception) {
                setErrorMessage("Error! Username or password is incorrect!");
                setTimeout(() => setErrorMessage(''), 5000);
            }
        },
    });

    return (
        <View style={signInStyle.container}>
            <Text style={signInStyle.heading}>Sign into the Walangeri app</Text>
            <Notification message={notificationMsg} />
            <Notification message={errorMessage} />
            <TextInput
                style={[signInStyle.input, formik.touched.username && formik.errors.username ? signInStyle.inputError : null]}
                placeholder="Email"
                onChangeText={formik.handleChange('username')}
                onBlur={formik.handleBlur('username')}
                value={formik.values.username}
                keyboardType="email-address"
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
                <Text style={signInStyle.buttonText}>Login</Text>
            </Pressable>
            <Pressable style={signInStyle.signupButton} onPress={() => navigate('/register')}>
                <Text style={signInStyle.signupText}>Register</Text>
            </Pressable>
        </View>
    );
};

export default SignIn;