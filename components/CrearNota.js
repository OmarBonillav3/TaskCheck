import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Importand Iconos
import Icon from 'react-native-vector-icons/AntDesign';
import Icon3 from 'react-native-vector-icons/Feather'; // Para icono notas -  edit


                    // NOTAS IMPORTANTES

// - Agregar funcion que cuando se agregue una nota se borre este boton


export default function CrearNota () {

// Creamos una funcion para poder navegar a la pantalla de 
//NotasScreen, ya que .js no es una pantalla
        const navigation = useNavigation();
        const navegarNotasScreen = () => {
          navigation.navigate('Note'); 
        };

    return (
        <TouchableOpacity 
            style={styles.Container}
            onPress={navegarNotasScreen} 
        >
            <Icon3 name="edit" style={styles.PlusIcon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginTop:20,
        marginRight:20,
    },
    PlusIcon: {
        fontSize:30
    },
})