import { StyleSheet, Text, View, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const LogoGeneral = ({ style }) => {
    return (
        <View style={[styles.Container, style]}>
            <Text style={styles.TxtGeneral}> Task </Text>
            <Icon name='check' style={styles.IconCheckGeneral}/>
        </View>
    )
}



const styles = StyleSheet.create ({
    Container:{
        flexDirection: 'row',
        alignItems:'center',
    },

    // ESTILO DE LOGO GENERAL
    TxtGeneral: {
        marginLeft:10,
        color:'#FFFFFF',
        fontSize:18, 
        fontFamily:'PoppinsBold',
    },
    IconCheckGeneral: {
        
        right:Platform.OS === 'ios' ? 6 : 6,
        bottom:Platform.OS === 'ios' ? 3 : 5,
        fontSize:28,
        color:'#8CAE81'
    },
    

})


export default LogoGeneral;