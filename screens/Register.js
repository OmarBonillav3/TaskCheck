import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Platform, Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Fontisto';
import Icon3 from 'react-native-vector-icons/Entypo';
import BotonBack from '../components/BotonBack';
import { useNavigation } from '@react-navigation/native';

export default function Register () {
    const [userRegister, setUserRegister] = useState('');
    const [passwordRegister, setPasswordRegister] = useState('');
    const [passwordRegisterx2, setpasswordRegisterx2] = useState('');

    const navigation = useNavigation(); //Para el boton de retroceder la pantalla

    //Funcion para guardar los datos de los usuarios en la memoria del celular
    async function GuardarDatos() {
        try {
        //Guardando informacion de usuarios
        await AsyncStorage.setItem('@Usuario', userRegister) //Guardando nombre del usuario
        await AsyncStorage.setItem ('@Contraseña', passwordRegister) //Guardando contraseña del usuario
        // await AsyncStorage.setItem ('@Email', setEmailRegister) // Guardando email del usuario

        if (passwordRegister === passwordRegisterx2) {
            navigation.navigate ('Login');

        } else {
            Alert.alert('las Contraseña no son iguales','Procura que las constraseñas sean exactamente iguales para poder continuar')
        }

    } catch (error) {
        console.log('Error al guardar datos:', error);
      }
}


                                // NOTAS IMPORTANTES
//AGREGAR UNA FUNCION PARA QUE NO SE REPITAN CONTRASEñAS Y NOMBRES


                                    //OBSERVACIONES
//- SOLO SE GUARDA UN USUARIO NO SE SI ES MALO PERO BUENO AHI TENEMOS UN "PROBLEMA"

//- CREO QUE TAMBIEN ESTOS INICIO DE SESSION NO SE GUARDAN DEL TODO, DESDE QUE SE INICIA SESSION SE BORRAN

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            {/* BOTON PARA VOLVER ATRAS */}
            <BotonBack navigation={navigation} />
            <View style={styles.ContainerTxt}>
                <View style={styles.DiseñoCheck}>
                    <Text style={styles.TxtRegister}>Register</Text>
                    <Icon3 style={styles.IconCheck} name='check'/>
                </View>

                <Text style={styles.TxtAdd}> Aprovecha la oportunidad de organizar tus ideas y fechas importantes en un solo lugar </Text>
            </View>    

                {/* INPUT USER */}
            <View style={styles.ContainerInputs}>
                <Icon name='user' style={styles.Icons}/>
                <TextInput
                    placeholder='User '
                    value={userRegister}
                    onChangeText={setUserRegister} //Esto fue cambiado para el AsyncStorage, Aqui originalmente iba onChangeText={setUser}
                    style={styles.TextInput} 
                />
            </View> 

                {/* INPUT PASSWORD*/}
            <View style={styles.ContainerInputs}>
                <Icon name='lock' style={styles.Icons}/>
                <TextInput
                    placeholder='Password'
                    value={passwordRegister}
                    onChangeText={setPasswordRegister}
                    style={styles.TextInput} 
                    secureTextEntry={true}
                />
            </View>  
            <View style={styles.ContainerInputs}>
                <Icon name='lock' style={styles.Icons}/>
                <TextInput
                    placeholder='Repeat Password'
                    value={passwordRegisterx2}
                    onChangeText={setpasswordRegisterx2}
                    style={styles.TextInput} 
                    secureTextEntry={true}
                />
            </View>  
            {/* onPress={() => navigation.navigate('HomeTabs')} */}
                    {/* BOTON PARA GUARDAR DATOS EN BASE DE DATOS E INCIAR */}
            <TouchableOpacity style={styles.BotonRegistrar} onPress={GuardarDatos}>
                <Text style={styles.TxtBotonRegistrar}>
                    Regístrarse
                </Text>


            </TouchableOpacity> 
            <TouchableOpacity style={styles.BotonIniciarSession} onPress={() => navigation.navigate ('Login') }>
                <Text style={styles.TxtBotonInicarSession}>
                    Iniciar Session
                </Text>
            </TouchableOpacity>

                    {/* REGISTARSE CON GOOGLE */}
            <TouchableOpacity style={styles.ContainerRegisterGoogle}>
                <Icon name='google' style={styles.IconGoogle}/> 
                <Text style={styles.TxtRegisterGoogle}>| Regístrate con Google</Text>
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
    //   TEXTO DE REGISTER
    ContainerTxt: {
        marginBottom:Platform.OS === 'ios' ? 200 : 180,
        
    },
    DiseñoCheck:{
        flexDirection: 'row',
        alignSelf:'center',
    },
    TxtRegister: {
        fontSize:20,
        fontFamily:'OpenSansBold',
        alignSelf:'center',
        color:'#FFFFFF',   
    },
    IconCheck: {
        fontSize:20,
        alignSelf:'center',
        color:'#8CAE81', 
        left:5,
    },
    TxtAdd: {
        fontSize:14,
        fontFamily:'OpenSansLight',
        color:'#FFFFFF',
        textAlign:'center',
        marginHorizontal:10,
    },
    //   INPUTS
    ContainerInputs: {
        bottom:Platform.OS === 'ios' ? 120 : 110,
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
    //   BOTON PARA REGISTRARSE
    BotonRegistrar:{
        bottom:Platform.OS === 'ios' ? 90 : 80 ,
        width:300,
        height:45,
        backgroundColor:'#8CAE81',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
    },
    TxtBotonRegistrar: {
        color:'#000000',
        fontSize:18,
        fontFamily:'OpenSansBold',
    },
    //   REGISTRARSE CON GOOGLE
    ContainerRegisterGoogle:{
        bottom:Platform.OS === 'ios' ? 30 : 20 ,
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
    
    BotonIniciarSession: {
        bottom:Platform.OS === 'ios' ? 70 : 60 ,
        justifyContent:'center',
        borderColor:'#8CAE81',
        borderWidth:1,
        borderRadius:10,
        width:300,
        height:30,
        alignSelf:'center',
    },
    TxtBotonInicarSession:{
        alignSelf:'center',
        color:'#FFFFFF',
        fontSize:14,
        fontFamily:'OpenSansMedium'
    },
})