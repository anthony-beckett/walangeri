// App.js

import React, { useState, useEffect } from 'react';
import { NativeRouter, Routes, Route, Navigate } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import SignIn from './src/components/SignIn';
import Register from './src/components/Register';
import reportService from './src/services/reports';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [reports, setReports] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const storedUser = await AsyncStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        reportService.setToken(parsedUser.token);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
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