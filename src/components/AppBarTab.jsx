import { Pressable, Text, StyleSheet } from 'react-native'
import { Link } from 'react-router-native';
import theme from '../theme'

const styles = StyleSheet.create({
    text: {
        color: 'white',
        paddingHorizontal: 10,
        paddingVertical: 15,
        fontWeight: theme.fontWeights.bold,
    }
})

const AppBarTab = ({ title, to }) => {
    return (
        <Link to={to} component={Pressable}>
            <Text style={styles.text}>{title}</Text>
        </Link>
    )
}

export default AppBarTab