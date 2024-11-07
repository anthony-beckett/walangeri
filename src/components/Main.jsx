/**
 * Main Component
 *
 * Root component of the app after user authentication. It renders the AppBar and Routes for different screens.
 *
 * Props:
 * - reports (array): List of maintenance reports.
 * - setReports (function): Function to update the reports state.
 * - handleLogout (function): Function to handle user logout.
 */

import { View } from 'react-native';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-native';
import mainStyle from '../styles/mainStyle';
import AppBar from './AppBar';
import NewReport from './NewReport';
import AllReports from './AllReports';
import EditReport from './EditReport'; // Import EditReport

const Main = ({ reports, setReports, handleLogout }) => {
    return (
        <View style={mainStyle.container}>
            <AppBar onLogout={handleLogout}/>
            <Routes>
                <Route path="/" element={<NewReport setReports={setReports} reports={reports} />} />
                <Route path="/allreports" element={<AllReports reports={reports} setReports={setReports} />} />
                <Route path="/editreport/:id" element={<EditReport reports={reports} setReports={setReports} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;