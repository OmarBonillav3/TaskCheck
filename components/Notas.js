import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, StyleSheet, Platform, TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const Notas = () => {

    const [notaGuardada, setNotaGuarda] =  useState ('');

        const LlamandoNota = async () => {
            const Nota = await AsyncStorage.getItem('@Nota');
            if (Nota !== null) {
                setNotaGuarda(Nota);
            } 
        } 
      

    useEffect (() => {
        LlamandoNota();
    }, []);
    
    


    return (
            <View style={styles.Notas}>
                <TouchableOpacity style={styles.TouchableIcon}>
                    <Icon name='pencil' style={styles.IconPencil} />
                </TouchableOpacity> 
                <Text>{notaGuardada ? notaGuardada : 'Esta nota esta vacia'}</Text> 
            </View>
    )
}
const styles = StyleSheet.create({ 
    Notas:{
        backgroundColor:'#FFFFFF',
        borderRadius:14,
        marginTop:30,
        width:Platform.OS === 'ios' ? 350: 330,
        height:Platform.OS === 'ios' ? 130 :120,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TouchableIcon: {
        position: 'absolute',
        top: 1,
        right: 1,
        padding: 10,
    },
    IconPencil: {
        color:'#8CAE81',
        fontSize:19,
    },


});

export default Notas;