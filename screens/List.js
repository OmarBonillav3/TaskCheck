import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Checkbox from 'expo-checkbox'; // Importamos el componente Checkbox de Expo

// Importando Iconos
import Icon from 'react-native-vector-icons/Feather'; // Icono trash / save
import Icon2 from 'react-native-vector-icons/Entypo'; // Icono check
import Icon3 from 'react-native-vector-icons/MaterialIcons'; // Icono playlist-add
import Icon4 from 'react-native-vector-icons/FontAwesome6'; // Icono list

// Importando componentes
import { saveData, loadData } from '../components/DataList'; //Componente para administrar los datos guardados

// Importando para la edicion de listas
import { useRoute } from '@react-navigation/native';

// ------------------------------------------------------------------------------------------------------------------------------------------
//                                                     IDEAS DE NUEVAS FUNCIONES                                                              
// ------------------------------------------------------------------------------------------------------------------------------------------

// ------------------------------------------------------------------------------------------------------------------------------------------
// Agregar una funciona que haga que el enter agregue otro checkbox con su input y el teclado cambie al nuevo input.
// Borrar el mas y con eso posicionar mejor los iconos por ejemplo en el TopBar, IDEA: Volverlos componenter y solo importarlos al App.js                                                     
// ------------------------------------------------------------------------------------------------------------------------------------------ 
// Poner que el boton de borrar toda la lista solo salga a la hora de editar las listas y no en la creacion de una nueva
// Y que tambien no borre todas las listas creadas ya que borra todas las listas creadas
// ------------------------------------------------------------------------------------------------------------------------------------------ 
// Buscar una forma linda de poner el boton de guardar las listas y ya avanzar con otras cosas
// ------------------------------------------------------------------------------------------------------------------------------------------ 


export default function List ({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [checkboxes, setCheckboxes] = useState([]);
  const [listId, setListId] = useState(null);

  const route = useRoute();

  // Recibe los datos y los actualiza
  useEffect(() => {
    const fetchData = async () => {
      if (route.params?.listData) {
        setTitulo(route.params.listData.titulo);
        setCheckboxes(route.params.listData.checkboxes || []);
        setListId(route.params.listData.id);
      } else {
        const savedData = await loadData();
        if (savedData) {
          setTitulo(savedData.titulo);
          setCheckboxes(savedData.checkboxes);
        }
      }
    };
    fetchData();
  }, [route.params]);

  // Funcion para guardar los datos segun que estado
  const handleSaveList = async () => {
    try {
      const existingLists = await AsyncStorage.getItem('list');
      let lists = existingLists ? JSON.parse(existingLists) : [];
  
      if (!Array.isArray(lists)) {
        lists = [];
      }
  
      let updatedListId = listId;
      if (!listId) {
        // Si es una nueva lista, generamos un ID único
        updatedListId = Date.now().toString();
        setListId(updatedListId);
      }
  
      // Buscar si la lista ya existe
      const listIndex = lists.findIndex((item) => item.id === updatedListId);
  
      if (listIndex !== -1) {
        // Si ya existe, actualizarla
        lists[listIndex] = { id: updatedListId, titulo, checkboxes };
      } else {
        // Si no existe, agregarla
        lists.push({ id: updatedListId, titulo, checkboxes });
      }
  
      await AsyncStorage.setItem('list', JSON.stringify(lists));
  
      // Navegar de regreso a Home
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    } catch (error) {
      console.error('Error al guardar la lista', error);
    }
  };
  

  // Para agregar nuevos Checkboxes
  const addCheckbox = () => {
    setCheckboxes((prevCheckboxes) => [...(prevCheckboxes || []), { id: Date.now().toString(), text: '', checked: false }]);
  };
  const toggleCheckbox = (id, value) => {
    setCheckboxes(checkboxes.map(item => (item.id === id ? { ...item, checked: value } : item)));
  };

  // Para Actualizar
  const updateCheckboxText = (id, text) => {
    setCheckboxes(checkboxes.map(item => (item.id === id ? { ...item, text } : item)));
  };

  // Para borrar
  const deleteCheckbox = (id) => {
    setCheckboxes(checkboxes.filter(item => item.id !== id));
  };


  // Funcion para borrar toda la lista
  const confirmDeleteCurrentList = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres borrar esta lista?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Borrar',
          onPress: async () => {
            try {
              const existingLists = await AsyncStorage.getItem('list');
              let lists = existingLists ? JSON.parse(existingLists) : [];
  
              // Eliminar solo la lista actual
              lists = lists.filter((item) => item.id !== listId);
  
              await AsyncStorage.setItem('list', JSON.stringify(lists));
  
              setCheckboxes([]);
              setTitulo('');
              setListId(null);
  
              // Navegar de regreso a Home
              navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
              });
            } catch (e) {
              console.error('Error al borrar la lista:', e);
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };
  

  // Dismiss keyboard - Ocultar el teclado
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <ScrollView style={styles.container}>
        {/* Botones de opciones para las listas: Agregar y guardar */}
        <View style={styles.BoxBoton}>
          <TouchableOpacity onPress={addCheckbox} style={styles.BotonAgregar}>
            <Icon4 name='plus' style={styles.IconoAgregar}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSaveList} style={styles.BotonSave}>
            <Icon name='save' style={styles.IconoSave}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.BotonTrash} onPress={confirmDeleteCurrentList}>
            <Icon style={styles.IconoTrash} name='trash'/>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.TituloInput}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Titulo de lista"
        />
        <ScrollView style={{ marginBottom: 0 }}>
        {Array.isArray(checkboxes) && checkboxes.map((checkbox) => (
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
                // returnKeyType="Enter"
                onSubmitEditing={addCheckbox}
                blurOnSubmit={false}
              />

              {/* Botón para eliminar el checkbox */}
              <TouchableOpacity onPress={() => deleteCheckbox(checkbox.id)}>
                <View style={styles.deleteButton}>
                  <Icon style={styles.deleteIcon} name='x'/>
                  {/* <View style={styles.deleteIcon} /> */}
                </View>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View>
          <TouchableOpacity onPress={handleSaveList} style={styles.BotonSave}>
            <Icon name='save' style={styles.IconoSave}/>
          </TouchableOpacity>
        </View>
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