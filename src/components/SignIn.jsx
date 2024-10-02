import { View, TextInput, Pressable, Text } from 'react-native';
import * as yup from 'yup';
import signInStyle from '../styles/signInStyle';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-native';

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
    const navigate = useNavigate()

    const formik = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema,
        onSubmit: values => {
          console.log('Login:', values)
          navigate('/', { state: { loginMessage: 'Successfully logged in! Now, create, load or export a report.' } })
        },
    });

    return (
        <View style={signInStyle.container}>
            <Text style={signInStyle.heading}>Sign into the Walangeri app</Text>

            <TextInput
                style={[signInStyle.input]}
                placeholder="Email"
                onChangeText={formik.handleChange('email')}
                onBlur={formik.handleBlur('email')}
                value={formik.values.email}
                keyboardType="email-address"
            />

            <TextInput
                style={[signInStyle.input]}
                placeholder="Password"
                secureTextEntry
                onChangeText={formik.handleChange('password')}
                onBlur={formik.handleBlur('password')}
                value={formik.values.password}
            />

            <Pressable style={signInStyle.loginButton} onPress={formik.handleSubmit}>
                <Text style={signInStyle.buttonText}>Login</Text>
            </Pressable>
        </View>
    )
}

export default SignIn