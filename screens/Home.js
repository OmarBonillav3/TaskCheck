import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet,Text, View, TextInput, Platform, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import Notas from '../components/Notas'
import MenuFlotante from '../components/MenuFlotante'
import Icon from 'react-native-vector-icons/AntDesign';
import Prueba from '../components/Prueba' 


export default function Home () {
    const [Search, setSearch] = useState();

    return (
        <View style={styles.Container}>  
            <StatusBar style='light' />
        {/* BUSCADOR DE PALABRAS DE EN LAS NOTAS */}
            <ScrollView contentContainerStyle={styles.CantainerNotes}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.ContainerSearch}>
                    <Icon name='search1' style={styles.IconSearch}/>
                    <TextInput
                        placeholder='Search'
                        value={Search}
                        onChangeText={setSearch}
                        style={styles.TextInputSearch} 
                    />
                </View>
                {/* HACER UNA FUNCION QUE PRESENTE ESTO SI NO HAY NADA EN HOME */}
                <View style={styles.ContainerPresentacion}>
                    <Text style={styles.Txt1}>
                        ¡Aún no tienes notas!
                   </Text>
                   <Text style={styles.Txt2}>
                        ¿Te gustaría empezar ahora?
                   </Text>
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                   <Notas />
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        backgroundColor:'#E3E6E9',
    },
    //     ESTILO DEL BUSCADOR
    ContainerSearch: {
        top:Platform.OS === 'ios' ? 10 : 10,
        alignSelf:'center',
        backgroundColor:"#F8F8F8",
        borderRadius:10,
        width:Platform.OS === 'ios' ? 350 : 330,
        height:Platform.OS === 'ios' ? 40 : 38,
        borderColor:'#E2DFDF',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 13,
        marginBottom:30,
    },
    IconSearch:{
        fontSize:21,
        color:'#8CAE81',
    },
    TextInputSearch:{
        fontSize:Platform.OS === 'ios' ? 14 : 13,
        marginLeft:10,
        width:Platform.OS === 'ios' ? 350 : 330,
        height:Platform.OS === 'ios' ? 40 : 38,
        fontFamily:'OpenSansMedium',
        
    },
    ContainerPresentacion: {
        alignItems:'center',
    },
    Txt1: { 
        fontFamily:'OpenSansBold',
        fontSize:20,
    },
    Txt2: {
        fontFamily:'OpenSansMedium',
        fontSize:13,
    },




    // CantainerNotes: {
        
        
    //     justifyContent: 'center', 
    //     alignItems: 'center',
        
    // },
})