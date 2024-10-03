import { View, TextInput, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import signInStyle from '../styles/signInStyle';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';
import React from 'react';
import loginService from '../services/login'

const validationSchema = yup.object().shape({
    username: yup
      .string()
      .email('Invalid email address')
      .required('Email is required'),
    password: yup
      .string()
      .required('Password is required'),
});

const SignIn = ({setUser}) => {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { username: '', password: '' },
        validationSchema,
        onSubmit: async (values) => {
          try {
            const tryLogin = await loginService.login({
                username: values.username,
                password: values.password
            })
            setUser(tryLogin)
          } catch(exception) {
            console.log(exception)
          }
          navigate('/', { state: { notificationMessage: 'Signed in! Now, use the Walangeri app\'s reporting functionality' } });
        },
    });

    return (
        <View style={signInStyle.container}>
            <Text style={signInStyle.heading}>Sign into the Walangeri app</Text>

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
        </View>
    );
}

export default SignIn;