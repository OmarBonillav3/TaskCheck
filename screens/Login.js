import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StyleSheet, Text, View, TouchableOpacity, Platform, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native';
import { StatusBar } from "expo-status-bar";
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import BotonBack from '../components/BotonBack';

export default function Login ({ navigation }) {
    const [user, setUser] = useState(null);
    const [Password, setPassword] = useState();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <StatusBar style='light' />
                {/* BOTON PARA REGRESA HACIA ATRAS */}
                <BotonBack 
                navigation={navigation}/>

                {/* TEXTO DE INTRODUCCION */}
            <View style={styles.ContainerTxt}>
                <View style={styles.DiseñoCheck}>
                    <Text style={styles.TxtLogin}> Login </Text>
                    <Icon2 style={styles.IconCheck} name='check'/>
                </View>
                <Text style={styles.TxtAdd}>Que tienes para hoy?</Text>
            </View>
                {/* INPUTS DE NOMBRE DE USUARIO */}
            <View style={styles.ContainerInputs}>
                <Icon name='user' style={styles.Icons}/>
                <TextInput
                    placeholder='User '
                    value={user}
                    onChangeText={setUser}
                    style={styles.TextInput} 
                /> 
            </View> 
            {/* INPUT DE PASSWORD DE USUARIO */}
            <View style={styles.ContainerInputs}>
                <Icon name='lock' style={styles.Icons}/>
                <TextInput
                    placeholder='Password'
                    value={Password}
                    onChangeText={setPassword}
                    style={styles.TextInput} 
                    secureTextEntry={true}
                />
            </View> 

            {/* <TouchableOpacity style={styles.BotonInicar} onPress={() => navigation.navigate('HomeTabs')}> */}

            {user === null && 
            
            <TouchableOpacity style={styles.BotonInicar} onPress={() => navigation.navigate('HomeTabs')}>
                <Text style={styles.TxtBotonIniciar}>
                    Iniciar Session
                </Text>
            </TouchableOpacity> 
            }


            <TouchableOpacity style={styles.BotonRegistrarse} onPress={() => navigation.navigate ('Register') }>
                <Text style={styles.TxtBotonRegistrarse}>
                    Registrarse
                </Text>
            </TouchableOpacity> 

            <TouchableOpacity style={styles.ContainerRegisterGoogle}>
                <Icon name='google' style={styles.IconGoogle}/> 
                <Text style={styles.TxtRegisterGoogle}>| Iniciar con Google</Text>
            </TouchableOpacity>   
        </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#1E1E1E',
    },

    ContainerTxt: {
        marginBottom:Platform.OS === 'ios' ? 320 : 320,
    },
    DiseñoCheck:{
        flexDirection: 'row',
        alignSelf:'center',
    },
    TxtLogin: {
        fontSize:20,
        fontFamily:'OpenSansBold',
        alignSelf:'center',
        color:'#FFFFFF', 
    },
    IconCheck: {
        fontSize:20,
        alignSelf:'center',
        color:'#8CAE81', 
        right:0,
    },
    TxtAdd: {
        fontSize:14,
        fontFamily:'OpenSansLight',
        alignSelf:'center',
        color:'#FFFFFF',
    },
    //    ESTILOS DE LOS INPUTS
    ContainerInputs: {
        bottom:Platform.OS === 'ios' ? 230 : 230,
        alignSelf:'center',
        backgroundColor:"#F8F8F8",
        borderRadius:10,
        width:300,
        height:43,
        borderColor:'#E2DFDF',
        borderWidth: 1,
        marginBottom:20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 13,
    },
    Icons: {
        fontSize:20,
    },
    TextInput: {
        fontSize:Platform.OS === 'ios' ? 14 : 13,
        marginLeft:10,
        width:300,
        height:43,
        fontFamily:'OpenSansMedium'
    },
    //   BOTON PARA INICIAR SESSION APP
    BotonInicar:{
        bottom:Platform.OS === 'ios' ? 200 : 200 ,
        width:300,
        height:45,
        backgroundColor:'#8CAE81',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    TxtBotonIniciar: {
        color:'#000000',
        fontSize:18,
        fontFamily:'OpenSansBold',
    },
    //   BOTON PARA REGISTRARSE DESDE EL LOGIN
    BotonRegistrarse: {
        bottom:Platform.OS === 'ios' ? 180 : 180 ,
        justifyContent:'center',
        borderColor:'#8CAE81',
        borderWidth:1,
        borderRadius:10,
        width:300,
        height:30,
        alignSelf:'center',
    },
    TxtBotonRegistrarse:{
        alignSelf:'center',
        color:'#FFFFFF',
        fontSize:14,
        fontFamily:'OpenSansMedium'
    },

    //   INICIAR SESSION CON GOOGLE
    ContainerRegisterGoogle:{
        bottom:Platform.OS === 'ios' ? 150 : 160 ,
        alignSelf:'center',
        flexDirection: 'row',
    },
    IconGoogle:{
        marginRight:3,
        fontSize:30,
        color:'#FFFFFF'
    },
    TxtRegisterGoogle:{
        alignSelf:'center',
        color:'#FFFFFF',
        fontSize:14,
        fontFamily:'OpenSansMedium'
    },
})