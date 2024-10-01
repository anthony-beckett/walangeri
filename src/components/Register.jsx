import React from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-native'
import app from '../../firebaseConfig';

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const Register = () => {
  const auth = getAuth(app)
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
            await createUserWithEmailAndPassword(auth, values.email, values.password)
            navigate('/signin', { state: { successMessage: 'Successfully registered! Now, please sign in.' } })
        } catch(error) {
            if (error.code === 'auth/email-already-in-use') {
                setErrors({ email: 'This email address is already in use.' });
            } else if (error.code === 'auth/weak-password') {
                setErrors({ password: 'Password is too weak.' });
            } else {
                setErrors({ email: 'Something went wrong. Please try again.' });
            }
        } finally {
            setSubmitting(false)
        }
    },
  });

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Register for Walangeri App</Text>

      {/* Email Input */}
      <TextInput
        style={[
          styles.input,
          formik.touched.email && formik.errors.email && styles.inputError,
        ]}
        placeholder="Email"
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        value={formik.values.email}
        keyboardType="email-address"
      />
      {formik.touched.email && formik.errors.email && (
        <Text style={styles.errorText}>{formik.errors.email}</Text>
      )}

      {/* Password Input */}
      <TextInput
        style={[
          styles.input,
          formik.touched.password && formik.errors.password && styles.inputError,
        ]}
        placeholder="Password"
        secureTextEntry
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={styles.errorText}>{formik.errors.password}</Text>
      )}

      {/* Register Button */}
      <Pressable style={styles.registerButton} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
  registerButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Register;
