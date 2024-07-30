import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import React from 'react';
import { StatusBar } from "expo-status-bar";

import Logo from '../components/Logo';

export default function Inicio ({ navigation }) {
    return (
        <View style={styles.container}>
            <StatusBar style='light' />

            <Logo style={styles.Logo} />

            <View style={styles.ContainerTxt}>
                <Text style={styles.Txt1}> ¡Haz que cada dia cuente! </Text>
                <Text style={styles.Txt2}> unete a TaskCheck y agrega un check a tus metas </Text>
            </View>
            <TouchableOpacity style={styles.Boton} onPress={() => navigation.navigate('Login')}>
                <Text style={styles.BotonTxt}> Comenzar </Text>
            </TouchableOpacity>
            <View style={styles.ContainerTxtBottom}>
                <Text style={styles.TxtBottom1}> No tienes cuenta? {''}
                    <TouchableOpacity onPress={() => navigation.navigate('Register')} style={styles.ContainerTxtBoton}>
                        <Text style={styles.TxtBoton}> Crear Cuenta</Text> 
                    </TouchableOpacity>
            </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create ({
    container: {
        backgroundColor:'#1E1E1E',
        alignContent:'center',
        flex:1,
    },
            // LOGO DE LA APLICACION
    Logo: {
        alignSelf:'center',
        marginTop:Platform.OS === 'ios' ? 160 : 140,
    },
    ContainerTxt:{
        marginTop:Platform.OS === 'ios' ? 100 : 100,
    },
    Txt1: {  
        fontFamily:'OpenSansBold',
        fontSize:24,
        color:'#FFFFFF',
        textAlign:'center',
        marginHorizontal:16,
    },
    Txt2: {
        marginTop:10,
        textAlign:'center',  
        marginHorizontal:16,
        fontFamily:'OpenSansLight',
        fontSize:16,
        color:'#FFFFFF',
    },
    //   BOTON PARA INICIAR SESSION
    Boton: {
        marginTop:Platform.OS === 'ios' ? 130 : 160,
        alignSelf:'center',
        backgroundColor:'#8CAE81',
        width:155,
        height:47,
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 10,
    },
    BotonTxt: {
        color:"#000000",
        fontSize:18,
        fontFamily:"OpenSansBold", 
    },
    //      OPCION DE CREAR NUEVA CUENTA
    ContainerTxtBottom: {
        alignSelf:'center',
        marginTop:Platform.OS === 'ios' ? 20 : 15,
    },
    TxtBottom1: {
        fontFamily:'OpenSansLight',
        fontSize:13,
        color:'#FFFFFF',
    },
    ContainerTxtBoton: { 
        
    },
    TxtBoton: {
        top:Platform.OS === 'ios' ? 3 : 4,
        fontFamily:'OpenSansBold',
        fontSize:13,
        color:'#8CAE81',
    }
})