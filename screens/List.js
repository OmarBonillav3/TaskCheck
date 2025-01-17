import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox'; // Importamos el componente Checkbox de Expo

// Importando Iconos
import Icon from 'react-native-vector-icons/Feather'; // Icono trash / save
import Icon2 from 'react-native-vector-icons/Entypo'; // Icono check
import Icon3 from 'react-native-vector-icons/MaterialIcons'; // Icono playlist-add
import Icon4 from 'react-native-vector-icons/FontAwesome6'; // Icono list

// Importando para la edicion de listas
import { useRoute } from '@react-navigation/native';

// ------------------------------------------------------------------------------------------------------------------------------------------
//                                                     IDEAS DE NUEVAS FUNCIONES                                                              
// ------------------------------------------------------------------------------------------------------------------------------------------
//  Hacer que se pueda guardar y que se pueda presentar en la pantalla Home.
//  Que la visual de esta en la pantalla Home solo sea el titulo los checkbox con su texto respectivo y que desde ahi se le pueda dar check.
//  
//  Agregar una funciona en la cual podemos entrar a esta lista y poder editarla, asi tambien si queremos borrar algo podemos agregar un lapiz
//  para poder entrar a esta funcion, buscar la manera de poder editar esto de la forma mas facil posible y que no consuma tanto
// ------------------------------------------------------------------------------------------------------------------------------------------


export default function List({ navigation }) {
  const [checkboxes, setCheckboxes] = useState(listData?.checkboxes || []);
  const [titulo, setTitulo] = useState(listData?.titulo || '');

  const route = useRoute();
  const { listData } = route.params || {}; // Recibir datos desde Home.js

   // useEffect para inicializar el estado cuando listData esté disponible
   useEffect(() => {
    if (listData) {
      setCheckboxes(listData.checkboxes || []);
      setTitulo(listData.titulo || '');
    }
  }, [listData]);

  // Función para agregar un nuevo checkbox
  const addCheckbox = () => {
    setCheckboxes([...checkboxes, { id: Date.now(), text: '', checked: false }]);
  };

  // Función para actualizar el texto de un checkbox
  const updateCheckboxText = (id, newText) => {
    setCheckboxes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, text: newText } : item))
    );
  };

  // Función para eliminar un checkbox
  const deleteCheckbox = (id) => {
    setCheckboxes((prev) => prev.filter((item) => item.id !== id));
  };

  // Función para alternar el estado de marcado de un checkbox
  const toggleCheckbox = (id, newValue) => {
    setCheckboxes((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: newValue } : item))
    );
  };

  // Dismiss keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  // Funcion para guardar y editar datos de las listas
  const saveList = async () => {
    try {
      const existingLists = await AsyncStorage.getItem('list');
      let parsedLists = existingLists ? JSON.parse(existingLists) : [];
      
      if (!Array.isArray(parsedLists)) {
        parsedLists = [];
      }
  
      if (listData?.id) {
        // Actualizar lista existente
        const updatedLists = parsedLists.map((list) => 
          list.id === listData.id ? { ...list, titulo, checkboxes } : list
        );
        await AsyncStorage.setItem('list', JSON.stringify(updatedLists));
      } else {
        // Crear nueva lista
        const newList = { id: Date.now(), titulo, checkboxes };
        const updatedLists = [...parsedLists, newList];
        await AsyncStorage.setItem('list', JSON.stringify(updatedLists));
      }
  
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (e) {
      console.error('Error al guardar la lista:', e);
    }
  };

  // Funcion para borrar toda la lista
  const confirmDeleteAll = () => {
    Alert.alert(
      "Confirmar",
      "¿Estás seguro de que quieres borrar toda la lista?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Borrar",
          onPress: async () => {
            try {
              const existingLists = await AsyncStorage.getItem('list');
              let parsedLists = existingLists ? JSON.parse(existingLists) : [];
              
              if (!Array.isArray(parsedLists)) {
                parsedLists = [];
              }
              
              const updatedLists = parsedLists.filter((list) => list.id !== listData.id);
              await AsyncStorage.setItem('list', JSON.stringify(updatedLists));
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            } catch (e) {
              console.error('Error al borrar la lista:', e);
            }
          },
          style: "destructive"
        }
      ],
      { cancelable: true }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView style={styles.container}>
        {/* Botones de opciones para las listas: Agregar y guardar */}
        <View style={styles.BoxBoton}>
          <TouchableOpacity onPress={addCheckbox} style={styles.BotonAgregar}>
            <Icon4 name='plus' style={styles.IconoAgregar}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={saveList} style={styles.BotonSave}>
            <Icon name='save' style={styles.IconoSave}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BotonTrash} onPress={confirmDeleteAll}>
            <Icon style={styles.IconoTrash} name='trash'/>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.TituloInput}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Titulo de lista"
        />
        <ScrollView>
          {checkboxes.map((checkbox) => (
            <View key={checkbox.id} style={styles.checkboxContainer}>
              {/* CheckBox componente de Expo */}
              <Checkbox
                value={checkbox.checked}
                onValueChange={(newValue) => toggleCheckbox(checkbox.id, newValue)}
                color={checkbox.checked ? '#8CAE81' : undefined} // Colores personalizados
                style={styles.checkbox}
              />

              {/* Editable text input */}
              <TextInput
                style={styles.textInput}
                value={checkbox.text}
                onChangeText={(text) => updateCheckboxText(checkbox.id, text)}
                placeholder="Escribe..."
              />

              {/* Botón para eliminar el checkbox */}
              <TouchableOpacity onPress={() => deleteCheckbox(checkbox.id)}>
                <View style={styles.deleteButton}>
                  <Icon style={styles.deleteIcon} name='trash'/>
                  {/* <View style={styles.deleteIcon} /> */}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#F0F0F0',
  },
  // ---- VIEW DE BOTONES DE OPCIONES PARA LAS LISTAS ---- //
  BoxBoton: {
    top:-1,
    right:-16,
    paddingTop:10,
    padding:10,
    borderBottomLeftRadius:10,
    height:'auto',
    flexDirection:'row',
    alignSelf:'flex-end',
    backgroundColor:'#1E1E1E',
  },
  // Contenedor y boton de guardar
  BotonAgregar: {
    justifyContent:'center',
    alignItems:'center',
  },
  IconoAgregar: {
    fontSize:23,
    color:'#8CAE81',
    marginRight:3,
  },
  // Contenedor y boton de check
  BotonSave: {
    justifyContent:'center',
    alignItems:'center',
    marginLeft:16,
  },
  IconoSave: {
    color:'#8CAE81',
    fontSize:23,
  },
  // Contenedor y boton de trash
  BotonTrash: {
    justifyContent:'center',
    alignItems:'center',
    marginLeft:16,
  },
  IconoTrash:{
    color:'#B8001F',
    fontSize:23,
  },
// ---- FIN VIEW ---- //

  TituloInput: {
    alignSelf:'center',
    marginVertical:16,
    fontSize:15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkbox: {
    marginRight: 8, // Espacio entre el checkbox y el input de texto
    borderRadius:7,
  },
  textInput: {
    flex: 1,  
    fontSize: 13,
    padding: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButton: {
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 18,
    borderRadius: 8,
  },
});