import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import AppBar from './AppBar';
import NewReport from './NewReport'
import LoadReport from './LoadReport'
import ExportReport from './ExportReport'
import AllReports from './AllReports'
import SignIn from './SignIn'

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: '#e1e4e8',
    }
})

const Main = () => {
    return (
        <View style={styles.container}>
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

export default Main;