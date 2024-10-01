import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useNavigate } from 'react-router-native';
import { getAuth, signOut } from 'firebase/auth';
import app from '../../firebaseConfig';

const Logout = ({ setUser }) => {
  const navigate = useNavigate();
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
        await signOut(auth);
        setUser(null);
        navigate('/signin', { state: { successMessage: 'Successfully logged out!' } });
    } catch (error) {
        console.error('Error logging out:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Are you sure you want to log out?</Text>
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log out</Text>
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
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Logout;