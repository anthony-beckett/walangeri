import React, { useState, useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import axios from 'axios';

const App = () => {
  const [reports, setReports] = useState([]); // Initialize state

  useEffect(() => {
    // Fetch data when the component mounts
    axios
      .get('http://192.168.1.7:3001/reports')
      .then(response => {
        console.log('promise fulfilled')
        setReports(response.data); // Store the fetched data in state
      })
      .catch(error => {
        console.error('Error fetching reports:', error);
      });
  }, []);

  return (
    <>
      <NativeRouter>
        <Main reports={reports} setReports={setReports} />
      </NativeRouter>
      <StatusBar style="auto" />
    </>
  );
};

export default App;