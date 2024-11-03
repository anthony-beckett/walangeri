/**
 * AppBar Component
 *
 * Renders the app's navigation bar with tabs and a logo. The tabs provide navigation to key sections of the app.
 *
 * Props:
 * - onLogout (function): Function to handle user logout.
 */

import { View, ScrollView, Image } from 'react-native';
import appBarStyle from '../styles/appBarStyle';
import AppBarTab from './AppBarTab';

const AppBar = ({ onLogout }) => {
    return (
        <View style={appBarStyle.container}>
            <Image source={require('../assets/logo.png')} style={appBarStyle.logo} />
            <ScrollView horizontal style={appBarStyle.scrollView}>
                <AppBarTab title="New Report" to="/" />
                <AppBarTab title="Load Report" to="/loadreport" />
                <AppBarTab title="Export Report" to="/exportreport" />
                <AppBarTab title="All Reports" to="/allreports" />
                <AppBarTab title="Log Out" onPress={onLogout} />
            </ScrollView>
        </View>
    );
};

export default AppBar;