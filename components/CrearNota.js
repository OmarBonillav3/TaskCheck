import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';


                    // NOTAS IMPORTANTES

// - Arreglar este boton para que diriga bien a NotasScreen, Tambien 
//ir a App.js a configurarlor en el apartado de navegacion por stacks

export default function CrearNota ({ navigation }) {
    return (
       <TouchableOpacity 
       style={styles.Container}
       onPress={() => navigation.navigate('Note')}
       >
        <Icon name='plus' style={styles.PlusIcon} />
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    Container: {
        marginTop:40,
        backgroundColor: '#8CAE81',
        borderRadius:50,
        padding:10,
    },
    PlusIcon: {
        fontSize:40
    },
})