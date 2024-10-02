import { Pressable, Text } from 'react-native'
import { Link } from 'react-router-native';
import appBarTabStyle from '../styles/appBarTabStyle';

const AppBarTab = ({ title, to }) => {
    return (
        <Link to={to} component={Pressable}>
            <Text style={appBarTabStyle.text}>{title}</Text>
        </Link>
    )
}

export default AppBarTab