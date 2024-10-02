import React, { useState, useEffect } from 'react';
import { NativeRouter } from 'react-router-native';
import { StatusBar } from 'expo-status-bar';
import Main from './src/components/Main';
import reportService from './src/services/reports'

const App = () => {
  const [reports, setReports] = useState([]); // Initialize state

  useEffect(() => {
    // Fetch data when the component mounts
    reportService
      .getAll()
      .then(initialReports => {
        console.log('promise fulfilled')
        setReports(initialReports); // Store the fetched data in state
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