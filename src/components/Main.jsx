import { View } from 'react-native'
import { Route, Routes, Navigate } from 'react-router-native';
import mainStyle from '../styles/mainStyle'
import AppBar from './AppBar'
import NewReport from './NewReport'
import LoadReport from './LoadReport';
import ExportReport from './ExportReport';
import SignIn from './SignIn';
import AllReports from './AllReports';

const Main = () => {
    return (
        <View style={mainStyle.container}>
            <AppBar />
            <Routes>
                <Route path="/" element={<NewReport />} />
                <Route path="/loadreport" element={<LoadReport />} />
                <Route path="/exportreport" element={<ExportReport />} />
                <Route path="/allreports" element={<AllReports />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </View>
    )
}

export default Main