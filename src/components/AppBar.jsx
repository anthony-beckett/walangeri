import { View, ScrollView, Image } from 'react-native';
import appBarStyle from '../styles/appBarStyle';
import AppBarTab from './AppBarTab';

const AppBar = () => {
    return (
        <View style={appBarStyle.container}>
            <Image source={require('../assets/logo.png')} style={appBarStyle.logo} />
            <ScrollView horizontal style={appBarStyle.scrollView} >
                <AppBarTab title="New Report" to="/" />
                <AppBarTab title="Load Report" to="/loadreport" />
                <AppBarTab title="Export Report" to="/exportreport" />
                <AppBarTab title="All Reports" to="/allreports" />
                <AppBarTab title="Sign In" to="/signin" />
            </ScrollView>
        </View>
    )
}

export default AppBar