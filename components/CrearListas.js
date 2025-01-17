import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Importanto Iconos
import Icon5 from 'react-native-vector-icons/Octicons';
import Icon from 'react-native-vector-icons/AntDesign';

export default function CrearListas () {
    const navigation = useNavigation(); // Constante para poder navegar entre pantallas

    // Funcion para navegara a la pantalla de Lista
    const NavList = () => {
        navigation.navigate('List'); 
    };

    return (
        <TouchableOpacity  style={styles.Container}onPress={NavList}>
           <Icon5 name="tasklist" style={styles.Icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginTop:20,
    },
    Icon: {
        fontSize:30
    },
})