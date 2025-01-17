import { StyleSheet, Text, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Logo = ({ style }) => {
    return (
        <View style={[styles.Container, style]}>
            <Text style={styles.Txt}> Task </Text>
            <Icon name='check' style={styles.IconCheck}/>
        </View>
    )
}

const styles = StyleSheet.create ({
    Container:{
        flexDirection: 'row',
        alignItems:'center',
    },
    Txt: {
        color:'#FFFFFF',
        fontSize:26, 
        fontFamily:'PoppinsBold',
    },
    IconCheck: {
        right:Platform.OS === 'ios' ? 9 : 8,
        bottom:Platform.OS === 'ios' ? 6 : 7,
        fontSize:40,
        color:'#8CAE81'
    },

    // ESTILO DE LOGO GENERAL
    TxtGeneral: {
        color:'#FFFFFF',
        fontSize:16, 
        fontFamily:'PoppinsBold',
    },
    IconCheckGeneral: {
        right:Platform.OS === 'ios' ? 9 : 8,
        bottom:Platform.OS === 'ios' ? 6 : 7,
        fontSize:20,
        color:'#8CAE81'
    },
    

})






export default Logo;



