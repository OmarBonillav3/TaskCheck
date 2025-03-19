import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = 'list';

export const saveData = async (titulo, checkboxes, listId) => {
  try {
    const jsonValue = JSON.stringify({ id:listId, titulo, checkboxes });
    await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
  } catch (e) {
    console.error('Error saving data:', e);
  }
};

export const loadData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue ? JSON.parse(jsonValue) : { titulo: '', checkboxes: [] };
  } catch (e) {
    console.error('Error loading data:', e);
    return { titulo: '', checkboxes: [] };
  }
};




// Hola, tengo problema con mi codigo, estoy intentadno guardar unos datos desde mi App.js pero no puedo, en mi archivo List.js si funciona perfecto pero no en App.js

// App.js
// import { StyleSheet, Platform, TouchableOpacity, Keyboard } from 'react-native';
// import React, { useEffect, useState } from 'react';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';
// import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { enableScreens } from 'react-native-screens'; //Importando para mejorar la navegacion ya que me esta dando problemas y la app se cierra
// import { useRoute } from '@react-navigation/native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// // Importando iconos y marcando los iconos usables
// import Icon from 'react-native-vector-icons/AntDesign'; // Para icono de Home - home
// import Icon3 from 'react-native-vector-icons/Feather'; // Para icono notas - edit
// import Icon4 from 'react-native-vector-icons/Entypo'; // Para icono de lista - list / check
// import Icon5 from 'react-native-vector-icons/Octicons'; // Para icono de lista - tasklist

// // Importando pantallas para navegacion por Stacks
// import Inicio from './screens/Inicio';
// import Login from './screens/Login';
// import Register from './screens/Register';

// // Importando pantallaas para navegacion por Tabs
// import Home from './screens/Home';
// import NotasScreen from './screens/NotasScreen';
// import ListScreen from './screens/List';

// // Importanto componentes
// import LogoGeneral from './components/LogoGeneral';
// import BotonBack from './components/BotonBack';
// import CustomTabBar from './components/CustomTabBar';
// import TabBarList from './components/TabBarList';
// import { saveData, loadData, STORAGE_KEY } from './components/DataList'; //Componente para administrar los datos guardados

// // Declarando constantes para las funciones de navegacion de pantallas
// const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

// enableScreens(); //Mejorando la navegacion

// function HomeTabs ({ navigation }) {


// const [titulo, setTitulo] = useState('');
// const [checkboxes, setCheckboxes] = useState([]);
// const [listId, setListId] = useState(null);

// const route = useRoute();

// // Recibe los datos y los actualiza
// useEffect(() => {
// const fetchData = async () => {
// const savedData = await saveData();
// if (savedData) {
// console.log('Loaded saved data:', savedData);
// setTitulo(savedData.titulo);
// setCheckboxes(savedData.checkboxes);
// }
// };
// fetchData();
// }, [route.params]);

// // BUSCAR FORMA DE IMPLEMENTAR DE MEJOR FORMA ESTAS FUNCIONES DE GUARDADO

// const handleSaveList = async () => {
// try {
// console.log('Saving data - Titulo:', titulo, 'Checkboxes:', checkboxes);

// // Verifica si el listId ya existe
// const existingLists = await AsyncStorage.getItem(STORAGE_KEY);
// let lists = existingLists ? JSON.parse(existingLists) : [];

// console.log('Existing lists:', lists);

// let updatedListId = listId;
// if (!updatedListId) {
// updatedListId = Date.now().toString();
// setListId(updatedListId);
// }

// const listIndex = lists.findIndex((item) => item.id === updatedListId);

// if (listIndex !== -1) {
// // Si la lista existe, actualízala
// lists[listIndex] = { id: updatedListId, titulo, checkboxes };
// } else {
// // Si no existe, agrégala
// lists.push({ id: updatedListId, titulo, checkboxes });
// }

// console.log('Updated lists:', lists);

// // Guarda la lista actualizada
// await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));

// navigation.reset({
// index: 0,
// routes: [{ name: 'HomeTabs' }],
// });
// } catch (error) {
// console.error('Error al guardar la lista', error);
// }
// };

// const dismissKeyboard = () => {
// Keyboard.dismiss();
// };

// return (
// <Tab.Navigator
// tabBar={(props) => {
// // Verifica la pantalla actual para cambiar la tabBar
// if (props.state.routes[props.state.index].name === 'List') {
// return <TabBarList {...props} />;
// }
// return <CustomTabBar {...props} />;
// }}
// screenOptions={() => ({
// headerLeft: () => <LogoGeneral style={styles.Logo} />,
// tabBarHideOnKeyboard: Platform.OS!== 'ios'
// })}
// >
// <Tab.Screen
// name='Home'
// component={Home}
// options={{
// headerTitle: '',
// headerStyle: {
// backgroundColor: '#1E1E1E',
// },
// tabBarIcon: ({ color, size }) => {
// return (
// <Icon name="home" size={size} color={color} style={styles.CarIcon} />
// )
// },
// headerRight: () => <Icon
// style={styles.UserICon}
// name='user' />,

// }}
// />
// <Tab.Screen
// name='List'
// component={ListScreen}
// options={{
// headerTitle: '',
// headerStyle: {
// backgroundColor: '#1E1E1E',
// },
// tabBarIcon: ({ color, size }) => {
// return (
// <Icon5 name="tasklist" size={size} color={color} style={styles.CarIcon} />
// )
// },
// headerLeft: () =>
// <BotonBack
// style={styles.BotonBackAjustes}
// iconStyle={styles.IconBackStyle}
// />,
// headerRight : () =>
// <TouchableOpacity onPress={handleSaveList} style={styles.BotonSave}>
// <Icon name='save' style={styles.IconoSave}/>
// </TouchableOpacity>
// }}
// />
// <Tab.Screen
// name='Note'
// component={NotasScreen}
// options={{
// headerTitle: '',
// headerStyle: {
// backgroundColor: '#1E1E1E',
// },
// tabBarIcon: ({ color, size }) => {
// return (
// <Icon3 name="edit" size={size} color={color} style={styles.CarIcon} />
// )
// },
// headerLeft: () =>
// <BotonBack
// style={styles.BotonBackAjustes}
// iconStyle={styles.IconBackStyle}
// TxtStyle={styles.TxtStyle}
// texto='Notas'
// />,
// headerRight: () =>
// <TouchableOpacity onPress={dismissKeyboard} style={styles.BotonListo}>
// <Icon4 name='check' style={styles.TxtListoBoton} />
// </TouchableOpacity>
// }}
// />
// </Tab.Navigator>
// )
// }


// function NavegacionStack() {
// return (
// <Stack.Navigator
// // AGREGANDO ANIMACION SEGUN DISPOSITIVO
// screenOptions={{
// ... (Platform.OS === 'ios'
// ? TransitionPresets.SlideFromRightIOS
// : TransitionPresets.FadeFromBottomAndroid),
// headerShown: false,
// }}
// >
// <Stack.Screen name='Inicio' component={Inicio} />
// <Stack.Screen name='Login' component={Login} />
// <Stack.Screen name='Register' component={Register} />
// <Stack.Screen name='HomeTabs' component={HomeTabs}/>
// </Stack.Navigator>
// );
// }

// // Agregando fuentes de forma global
// export default function App() {

// const [loaded] = useFonts({
// OpenSansRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
// OpenSansLight: require('./assets/fonts/OpenSans-Light.ttf'),
// OpenSansMedium: require('./assets/fonts/OpenSans-Medium.ttf'),
// OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
// OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
// PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf')
// });

// useEffect(() => {
// if (loaded) {
// SplashScreen.hideAsync();
// }
// }, [loaded]);

// if (!loaded) {
// return null;
// }

// return (
// <GestureHandlerRootView>
// <NavigationContainer style={styles.container} >

// <NavegacionStack />

// </NavigationContainer>
// </GestureHandlerRootView>
// );
// }

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// alignContent: 'center',
// justifyContent: 'center',
// },
// UserICon: {
// color: '#8CAE81',
// fontSize: 28,
// marginRight: Platform.OS === 'ios' ? 20 : 18,
// },
// Logo: {
// fontSize: 10
// },
// BotonBackAjustes:{
// top:Platform.OS === 'ios' ? 8: 15,
// },
// IconBackStyle: {
// fontSize:25,
// color: '#8CAE81'
// },
// TxtStyle: {

// },
// TxtListoBoton: {
// alignSelf:'center',
// marginRight:20,
// fontSize:27,
// color:'#8CAE81',
// },
// BotonSave: {
// justifyContent:'center',
// alignItems:'center',
// marginLeft:16,
// },
// IconoSave: {
// color:'#8CAE81',
// fontSize:23,
// },
// });


// // KAYROS - 16/Julio/2024 //

// List.js
// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, ScrollView, TouchableOpacity, Alert} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Checkbox from 'expo-checkbox'; // Importamos el componente Checkbox de Expo

// // Importando Iconos
// import Icon from 'react-native-vector-icons/Feather'; // Icono trash / save
// import Icon2 from 'react-native-vector-icons/Entypo'; // Icono check
// import Icon3 from 'react-native-vector-icons/MaterialIcons'; // Icono playlist-add
// import Icon4 from 'react-native-vector-icons/FontAwesome6'; // Icono list

// // Importando componentes
// import { saveData, loadData } from '../components/DataList'; //Componente para administrar los datos guardados

// // Importando para la edicion de listas
// import { useRoute } from '@react-navigation/native';

// // ------------------------------------------------------------------------------------------------------------------------------------------
// // IDEAS DE NUEVAS FUNCIONES
// // ------------------------------------------------------------------------------------------------------------------------------------------

// // ------------------------------------------------------------------------------------------------------------------------------------------
// // Agregar una funciona que haga que el enter agregue otro checkbox con su input y el teclado cambie al nuevo input.
// // Borrar el mas y con eso posicionar mejor los iconos por ejemplo en el TopBar, IDEA: Volverlos componenter y solo importarlos al App.js
// // ------------------------------------------------------------------------------------------------------------------------------------------
// // Poner que el boton de borrar toda la lista solo salga a la hora de editar las listas y no en la creacion de una nueva
// // Y que tambien no borre todas las listas creadas ya que borra todas las listas creadas
// // ------------------------------------------------------------------------------------------------------------------------------------------
// // Buscar una forma linda de poner el boton de guardar las listas y ya avanzar con otras cosas
// // ------------------------------------------------------------------------------------------------------------------------------------------


// export default function List ({ navigation }) {
// const [titulo, setTitulo] = useState('');
// const [checkboxes, setCheckboxes] = useState([]);
// const [listId, setListId] = useState(null);

// const route = useRoute();

// // Recibe los datos y los actualiza
// useEffect(() => {
// const fetchData = async () => {
// if (route.params?.listData) {
// setTitulo(route.params.listData.titulo);
// setCheckboxes(route.params.listData.checkboxes || []);
// setListId(route.params.listData.id);
// } else {
// const savedData = await loadData();
// if (savedData) {
// setTitulo(savedData.titulo);
// setCheckboxes(savedData.checkboxes);
// }
// }
// };
// fetchData();
// }, [route.params]);

// // Funcion para guardar los datos segun que estado
// const handleSaveList = async () => {
// try {
// const existingLists = await AsyncStorage.getItem('list');
// let lists = existingLists ? JSON.parse(existingLists) : [];

// if (!Array.isArray(lists)) {
// lists = [];
// }

// let updatedListId = listId;
// if (!listId) {
// // Si es una nueva lista, generamos un ID único
// updatedListId = Date.now().toString();
// setListId(updatedListId);
// }

// // Buscar si la lista ya existe
// const listIndex = lists.findIndex((item) => item.id === updatedListId);

// if (listIndex !== -1) {
// // Si ya existe, actualizarla
// lists[listIndex] = { id: updatedListId, titulo, checkboxes };
// } else {
// // Si no existe, agregarla
// lists.push({ id: updatedListId, titulo, checkboxes });
// }

// await AsyncStorage.setItem('list', JSON.stringify(lists));

// // Navegar de regreso a Home
// navigation.reset({
// index: 0,
// routes: [{ name: 'Home' }],
// });
// } catch (error) {
// console.error('Error al guardar la lista', error);
// }
// };


// // Para agregar nuevos Checkboxes
// const addCheckbox = () => {
// setCheckboxes((prevCheckboxes) => [...(prevCheckboxes || []), { id: Date.now().toString(), text: '', checked: false }]);
// };
// const toggleCheckbox = (id, value) => {
// setCheckboxes(checkboxes.map(item => (item.id === id ? { ...item, checked: value } : item)));
// };

// // Para Actualizar
// const updateCheckboxText = (id, text) => {
// setCheckboxes(checkboxes.map(item => (item.id === id ? { ...item, text } : item)));
// };

// // Para borrar
// const deleteCheckbox = (id) => {
// setCheckboxes(checkboxes.filter(item => item.id !== id));
// };


// // Funcion para borrar toda la lista
// const confirmDeleteCurrentList = () => {
// Alert.alert(
// 'Confirmar eliminación',
// '¿Estás seguro de que quieres borrar esta lista?',
// [
// {
// text: 'Cancelar',
// style: 'cancel',
// },
// {
// text: 'Borrar',
// onPress: async () => {
// try {
// const existingLists = await AsyncStorage.getItem('list');
// let lists = existingLists ? JSON.parse(existingLists) : [];

// // Eliminar solo la lista actual
// lists = lists.filter((item) => item.id !== listId);

// await AsyncStorage.setItem('list', JSON.stringify(lists));

// setCheckboxes([]);
// setTitulo('');
// setListId(null);

// // Navegar de regreso a Home
// navigation.reset({
// index: 0,
// routes: [{ name: 'Home' }],
// });
// } catch (e) {
// console.error('Error al borrar la lista:', e);
// }
// },
// style: 'destructive',
// },
// ],
// { cancelable: true }
// );
// };


// // Dismiss keyboard - Ocultar el teclado
// const dismissKeyboard = () => {
// Keyboard.dismiss();
// };

// return (
// <TouchableWithoutFeedback onPress={dismissKeyboard}>
// <ScrollView style={styles.container}>
// {/* Botones de opciones para las listas: Agregar y guardar */}
// <View style={styles.BoxBoton}>
// <TouchableOpacity onPress={addCheckbox} style={styles.BotonAgregar}>
// <Icon4 name='plus' style={styles.IconoAgregar}/>
// </TouchableOpacity>

// <TouchableOpacity onPress={handleSaveList} style={styles.BotonSave}>
// <Icon name='save' style={styles.IconoSave}/>
// </TouchableOpacity>
// <TouchableOpacity style={styles.BotonTrash} onPress={confirmDeleteCurrentList}>
// <Icon style={styles.IconoTrash} name='trash'/>
// </TouchableOpacity>
// </View>
// <TextInput
// style={styles.TituloInput}
// value={titulo}
// onChangeText={setTitulo}
// placeholder="Titulo de lista"
// />
// <ScrollView style={{ marginBottom: 0 }}>
// {Array.isArray(checkboxes) && checkboxes.map((checkbox) => (
// <View key={checkbox.id} style={styles.checkboxContainer}>
// {/* CheckBox componente de Expo */}
// <Checkbox
// value={checkbox.checked}
// onValueChange={(newValue) => toggleCheckbox(checkbox.id, newValue)}
// color={checkbox.checked ? '#8CAE81' : undefined} // Colores personalizados
// style={styles.checkbox}
// />

// {/* Editable text input */}
// <TextInput
// style={styles.textInput}
// value={checkbox.text}
// onChangeText={(text) => updateCheckboxText(checkbox.id, text)}
// placeholder="Escribe..."
// // returnKeyType="Enter"
// onSubmitEditing={addCheckbox}
// blurOnSubmit={false}
// />

// {/* Botón para eliminar el checkbox */}
// <TouchableOpacity onPress={() => deleteCheckbox(checkbox.id)}>
// <View style={styles.deleteButton}>
// <Icon style={styles.deleteIcon} name='x'/>
// {/* <View style={styles.deleteIcon} /> */}
// </View>
// </TouchableOpacity>
// </View>
// ))}
// </ScrollView>
// <View>
// <TouchableOpacity onPress={handleSaveList} style={styles.BotonSave}>
// <Icon name='save' style={styles.IconoSave}/>
// </TouchableOpacity>
// </View>
// </ScrollView>
// </TouchableWithoutFeedback>
// );
// }

// const styles = StyleSheet.create({
// container: {
// flex: 1,
// paddingHorizontal: 16,
// backgroundColor: '#F0F0F0',
// },
// // ---- VIEW DE BOTONES DE OPCIONES PARA LAS LISTAS ---- //
// BoxBoton: {
// top:-1,
// right:-16,
// paddingTop:10,
// padding:10,
// borderBottomLeftRadius:10,
// height:'auto',
// flexDirection:'row',
// alignSelf:'flex-end',
// backgroundColor:'#1E1E1E',
// },
// // Contenedor y boton de guardar
// BotonAgregar: {
// justifyContent:'center',
// alignItems:'center',
// },
// IconoAgregar: {
// fontSize:23,
// color:'#8CAE81',
// marginRight:3,
// },
// // Contenedor y boton de check
// BotonSave: {
// justifyContent:'center',
// alignItems:'center',
// marginLeft:16,
// },
// IconoSave: {
// color:'#8CAE81',
// fontSize:23,
// },

// // Contenedor y boton de trash
// BotonTrash: {
// justifyContent:'center',
// alignItems:'center',
// marginLeft:16,
// },
// IconoTrash:{
// color:'#B8001F',
// fontSize:23,
// },
// // ---- FIN VIEW ---- //

// TituloInput: {
// alignSelf:'center',
// marginVertical:16,
// fontSize:15,
// },
// checkboxContainer: {
// flexDirection: 'row',
// alignItems: 'center',
// marginBottom: 16,
// },
// checkbox: {
// marginRight: 8, // Espacio entre el checkbox y el input de texto
// borderRadius:7,
// },
// textInput: {
// flex: 1,
// fontSize: 13,
// padding: 4,
// borderBottomWidth: 1,
// borderBottomColor: '#ddd',
// },
// deleteButton: {
// marginLeft: 8,
// },
// deleteIcon: {
// fontSize: 18,
// borderRadius: 8,
// },
// });

// DataList.js (Aqui es donde estamos guardando los datos)
// import AsyncStorage from '@react-native-async-storage/async-storage';

// export const STORAGE_KEY = 'list';

// export const saveData = async (titulo, checkboxes, listId) => {
// try {
// const jsonValue = JSON.stringify({ id:listId, titulo, checkboxes });
// await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
// } catch (e) {
// console.error('Error saving data:', e);
// }
// };

// export const loadData = async () => {
// try {
// const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
// return jsonValue ? JSON.parse(jsonValue) : { titulo: '', checkboxes: [] };
// } catch (e) {
// console.error('Error loading data:', e);
// return { titulo: '', checkboxes: [] };
// }
// };

// No puedo guardar los datos desde App.js y no entiendo porque no pasa?

