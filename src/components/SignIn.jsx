import React, {useState, useEffect} from 'react';
import { View, TextInput, Pressable, Text, StyleSheet } from 'react-native';
import { useFormik } from 'formik';
import { useLocation } from 'react-router-native'
import SuccessMessage from './SuccessMessage'
import * as yup from 'yup';
import { useNavigate } from 'react-router-native';
import theme from '../theme';
import app from '../../firebaseConfig';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const location = useLocation()
  const initialSuccessMessage = location.state?.successMessage || null
  const [successMessage, setSuccessMessage] = useState(initialSuccessMessage)
  const auth = getAuth(app)

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema,
    onSubmit: async (values, { setSubmitting, setErrors}) => {
      console.log('Login:', values);
      try {
        const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password)
        setUser(userCredential)
        navigate('/', { state: { loginMessage: 'Successfully logged in! Now, create, load or export a report.' } })
      } catch (error) {
        if (error.code === 'auth/wrong-password') {
            setErrors({ password: 'Incorrect password. Please try again.' });
          } else if (error.code === 'auth/user-not-found') {
            setErrors({ email: 'No user found with this email address.' });
          } else {
            setErrors({ email: 'Login failed. Please try again later.' });
          }
      } finally {
        setSubmitting(false)
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Heading */}
      <Text style={styles.heading}>Sign into the Walangeri app</Text>
      <SuccessMessage message={successMessage} />

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

      {/* Login Button */}
      <Pressable style={styles.loginButton} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      {/* Signup Button */}
      <Pressable
        style={styles.signupButton}
        onPress={() => navigate('/register')}
      >
        <Text style={styles.signupText}>Sign up</Text>
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
  loginButton: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  signupButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    borderColor: theme.colors.primary,
    borderWidth: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  signupText: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
});

export default SignIn;