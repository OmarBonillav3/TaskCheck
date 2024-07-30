import React, { useState } from 'react';
import { StyleSheet, View, Platform, TouchableOpacity, Modal, TouchableWithoutFeedback} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign'; 
import Icon2 from 'react-native-vector-icons/SimpleLineIcons'; 
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import * as Animatable from 'react-native-animatable';


const MenuFlotante = ({ modalVisible, setModalVisible, navigation, iconPosition, iconRef}) => {
   

    const CerrarMenu = () => {
        setModalVisible(false);
        navigation.navigate('NotasScreen');
    }


    return (
        <View>
            <TouchableOpacity 
                style={styles.MenuFlotante} 
                onPress={() => setModalVisible(true)}
                ref={iconRef}
                >
                <Icon name='plus' style={styles.IconFlotante}/>
            </TouchableOpacity>
            <Modal
                animationType="none"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <TouchableWithoutFeedback >
                <View style={styles.ModalOverlay}>
                {/* <View style={[styles.ModalOverlay, { top: iconPosition.top, left: iconPosition.left }]}> */}
                <Animatable.View
                    animation={modalVisible ? 'slideInRight' : 'slideOutRight'}
                    duration={300}
                    style={styles.ModalContainer}
                    >
                        <View style={styles.ModalContent}>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon3 name='checklist' style={styles.CheckListIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon3 name='event-note' style={styles.CalendarIcon} />
                            </TouchableOpacity>
                            

                            <TouchableOpacity onPress={CerrarMenu}>
                                <Icon2 name='note' style={styles.NoteIcon} />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Icon name='close' style={styles.CloseIcon} />
                            </TouchableOpacity>
                        </View>
                </Animatable.View>
                    </View>
                    </TouchableWithoutFeedback>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({ 
    MenuFlotante: {
        // CENTRANDO BOTON FLOTANTE
        justifyContent:'center',
        alignSelf:'flex-end',

        // AJUSTES GENERALES
        backgroundColor:'#1E1E1E',
        borderRadius:20,

        // Ajuste de  Tamaño
        width:Platform.OS === 'ios' ? 50 : 47,
        height:Platform.OS === 'ios' ? 50 : 47,
        bottom: Platform.OS === 'ios' ? 60 : 20,
        right:Platform.OS === 'ios' ? 30 : 12,
    },
    IconFlotante: {
        // CENTRAR ICONO AQUI
        alignSelf:'center',
        color:'#8CAE81',
        fontSize:Platform.OS === 'ios' ? 35: 30,
    },


    
    // MENU FOLTANTE EXTENDIDO
    ModalOverlay: {
        position:'absolute',
        flex: 1,
        alignSelf:'flex-end',
       top:Platform.OS === 'ios' ? 702 : 661,
       right:Platform.OS === 'ios' ? 24 : 11,
    
    },
    ModalContainer: {
        // POSICIONAR MODAL
        borderRadius: 20,
        backgroundColor: '#1E1E1E',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: Platform.OS === 'ios' ? 260 : 250,
        height: Platform.OS === 'ios' ? 50 : 47,  
    },
    ModalContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    // OPCIONES DE ICONOS
    CloseIcon: {
        color: '#8CAE81',
        fontSize: Platform.OS === 'ios' ? 35 : 30,
        marginLeft: Platform.OS === 'ios' ? 15 : 15,
    },
    NoteIcon: {
        color: '#8CAE81',
        fontSize: Platform.OS === 'ios' ? 26 : 25,
        marginRight: Platform.OS === 'ios' ? 19 : 15,
    },
    CalendarIcon: {
        top:1,
        color: '#8CAE81',
        fontSize: Platform.OS === 'ios' ? 30 : 30,
        marginRight: Platform.OS === 'ios' ? 37 : 39,
    },
    CheckListIcon: {
        top:1,
        color: '#8CAE81',
        fontSize: Platform.OS === 'ios' ? 30 : 30,
        marginRight: Platform.OS === 'ios' ? 30 : 35,
    },



})

export default MenuFlotante;