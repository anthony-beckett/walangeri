/**
 * App.js
 *
 * Main entry point of the application. Manages user authentication state and routing.
 * It checks for a stored user in AsyncStorage on component mount, allowing persistent login sessions.
 */

import React, { useState, useEffect } from 'react';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import SignIn from './src/components/SignIn';
import Register from './src/components/Register';
import reportService from './src/services/reports';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  // State to store reports and the authenticated user
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch stored user data on mount to retain login status
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        reportService.setToken(parsedUser.token); // Set the token for authorized API calls
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    // Fetch initial reports if user is authenticated
    if (user) {
      reportService
        .getAll()
        .then(initialReports => {
          console.log('Reports fetched');
          setReports(initialReports);
        })
        .catch(error => {
          console.error('Error fetching reports:', error);
        });
    }
  }, [user]);

  /**
   * Logs out the user by clearing the user data from AsyncStorage and state.
   */
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <NativeRouter>
      {user ? (
        <Main user={user} reports={reports} setReports={setReports} handleLogout={handleLogout} />
      ) : (
        <Routes>
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/signin" replace />} />
        </Routes>
      )}
      <StatusBar style="auto" />
    </NativeRouter>
  );
};

export default App;