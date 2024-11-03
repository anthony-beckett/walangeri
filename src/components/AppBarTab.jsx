/**
 * AppBarTab Component
 *
 * A single navigation tab used in the AppBar. It can navigate to a specified route or execute an onPress function.
 *
 * Props:
 * - title (string): The text displayed on the tab.
 * - to (string): The route to navigate to when clicked (optional).
 * - onPress (function): Function to execute on press, used for actions like logging out (optional).
 */

import { Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';
import appBarTabStyle from '../styles/appBarTabStyle';

const AppBarTab = ({ title, to, onPress }) => {
    if (onPress) {
        return (
            <Pressable onPress={() => {
                onPress();
            }}>
                <Text style={appBarTabStyle.text}>{title}</Text>
            </Pressable>
        );
    }
    return (
        <Link to={to} component={Pressable}>
            <Text style={appBarTabStyle.text}>{title}</Text>
        </Link>
    );
};


export default AppBarTab;