import { View } from 'react-native';
import { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-native';
import mainStyle from '../styles/mainStyle';
import AppBar from './AppBar';
import NewReport from './NewReport';
import LoadReport from './LoadReport';
import ExportReport from './ExportReport';
import SignIn from './SignIn';
import AllReports from './AllReports';
import EditReport from './EditReport'; // Import EditReport

const Main = ({ reports, setReports }) => {
    const [user, setUser] = useState(null)

    return (
        <View style={mainStyle.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<NewReport setReports={setReports} reports={reports} />} />
                <Route path="/loadreport" element={<LoadReport />} />
                <Route path="/exportreport" element={<ExportReport />} />
                <Route path="/allreports" element={<AllReports reports={reports} setReports={setReports} />} />
                <Route path="/signin" element={<SignIn setUser={setUser} />} />
                <Route path="/editreport/:id" element={<EditReport reports={reports} setReports={setReports} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    );
};

export default Main;