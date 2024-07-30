import { StyleSheet, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';

const BotonBack = ({ style, iconStyle }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.BotonBack, style]}>
            <Icon style={[styles.IconBack, iconStyle]} name='chevron-left' />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create ({
    BotonBack: {
        position:'absolute',
        top:Platform.OS === 'ios' ? 60: 40,
        marginLeft:16,
    },
    IconBack: {
        color:'#FFFFFF',
        fontSize:25,
    },

})


export default BotonBack;