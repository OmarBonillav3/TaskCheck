import { StyleSheet, Platform, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { enableScreens } from 'react-native-screens'; //Importando para mejorar la navegacion ya que me esta dando problemas y la app se cierra
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Importando iconos y marcando los iconos usables
import Icon from 'react-native-vector-icons/AntDesign'; // Para icono de Home -  home
import Icon3 from 'react-native-vector-icons/Feather'; // Para icono notas -  edit
import Icon4 from 'react-native-vector-icons/Entypo'; // Para icono de lista -  list / check
import Icon5 from 'react-native-vector-icons/Octicons'; // Para icono de lista -  tasklist

// Importando pantallas para navegacion por Stacks
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Register from './screens/Register';

// Importando pantallaas para navegacion por Tabs
import Home from './screens/Home';
import NotasScreen from './screens/NotasScreen';
import ListScreen from './screens/List';

// Importanto componentes
import LogoGeneral from './components/LogoGeneral';
import BotonBack from './components/BotonBack';
import CustomTabBar from './components/CustomTabBar';
import TabBarList from './components/TabBarList';
import { saveData, loadData, STORAGE_KEY } from './components/DataList'; //Componente para administrar los datos guardados

// Declarando constantes para las funciones de navegacion de pantallas
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

enableScreens(); //Mejorando la navegacion

function HomeTabs ({ navigation }) {


   const [titulo, setTitulo] = useState('');
    const [checkboxes, setCheckboxes] = useState([]);
    const [listId, setListId] = useState(null);
  
    const route = useRoute();
  
    // Recibe los datos y los actualiza
    useEffect(() => {
      const fetchData = async () => {
        const savedData = await saveData();
        if (savedData) {
          console.log('Loaded saved data:', savedData);
          setTitulo(savedData.titulo);
          setCheckboxes(savedData.checkboxes);
        }
      };
      fetchData();
    }, [route.params]);

// BUSCAR FORMA DE IMPLEMENTAR DE MEJOR FORMA ESTAS FUNCIONES DE GUARDADO

    const handleSaveList = async () => {
      try {
        console.log('Saving data - Titulo:', titulo, 'Checkboxes:', checkboxes);
    
        // Verifica si el listId ya existe
        const existingLists = await AsyncStorage.getItem(STORAGE_KEY);
        let lists = existingLists ? JSON.parse(existingLists) : [];
    
        console.log('Existing lists:', lists);
    
        let updatedListId = listId;
        if (!updatedListId) {
          updatedListId = Date.now().toString();
          setListId(updatedListId);
        }
    
        const listIndex = lists.findIndex((item) => item.id === updatedListId);
    
        if (listIndex !== -1) {
          // Si la lista existe, actualízala
          lists[listIndex] = { id: updatedListId, titulo, checkboxes };
        } else {
          // Si no existe, agrégala
          lists.push({ id: updatedListId, titulo, checkboxes });
        }
    
        console.log('Updated lists:', lists);
    
        // Guarda la lista actualizada
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeTabs' }],
        });
      } catch (error) {
        console.error('Error al guardar la lista', error);
      }
    };
 
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Tab.Navigator
    tabBar={(props) => {
      // Verifica la pantalla actual para cambiar la tabBar
      if (props.state.routes[props.state.index].name === 'List') {
        return <TabBarList {...props} />;
      }
      return <CustomTabBar {...props} />;
    }}
    screenOptions={() => ({
      headerLeft: () => <LogoGeneral style={styles.Logo} />,
      tabBarHideOnKeyboard: Platform.OS!== 'ios'
    })}
    >
        <Tab.Screen 
          name='Home'
          component={Home}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#1E1E1E',
            },
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon name="home" size={size} color={color} style={styles.CarIcon} />
              )
            },
            headerRight: () => <Icon
            style={styles.UserICon}
            name='user' />,
            
          }}
        />
          <Tab.Screen 
            name='List'
            component={ListScreen}
            options={{
              headerTitle: '',
              headerStyle: {
                backgroundColor: '#1E1E1E', 
              },
              tabBarIcon: ({ color, size }) => {
                return (
                  <Icon5 name="tasklist" size={size} color={color} style={styles.CarIcon} />
                )
              },
              headerLeft: () => 
                <BotonBack 
                  style={styles.BotonBackAjustes}
                  iconStyle={styles.IconBackStyle}
                />,
                headerRight : () =>
                  <TouchableOpacity onPress={handleSaveList} style={styles.BotonSave}>
                    <Icon name='save' style={styles.IconoSave}/>
                  </TouchableOpacity>
            }}
          />
        <Tab.Screen 
          name='Note'
          component={NotasScreen}
          options={{
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#1E1E1E', 
            },
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon3 name="edit" size={size} color={color} style={styles.CarIcon} />
              )
            },
            headerLeft: () => 
            <BotonBack 
              style={styles.BotonBackAjustes}
              iconStyle={styles.IconBackStyle}
              TxtStyle={styles.TxtStyle}
              texto='Notas'
            />,
            headerRight: () => 
              <TouchableOpacity onPress={dismissKeyboard} style={styles.BotonListo}>
                 <Icon4 name='check' style={styles.TxtListoBoton} />
              </TouchableOpacity>
          }}
        />
    </Tab.Navigator>
  )
}


function NavegacionStack() {
  return (
    <Stack.Navigator
      // AGREGANDO ANIMACION SEGUN DISPOSITIVO
      screenOptions={{
        ... (Platform.OS === 'ios'
          ? TransitionPresets.SlideFromRightIOS
          : TransitionPresets.FadeFromBottomAndroid),
        headerShown: false,
      }}
    >
      <Stack.Screen name='Inicio' component={Inicio} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='HomeTabs' component={HomeTabs}/>       
    </Stack.Navigator>
  );
}

// Agregando fuentes de forma global
export default function App() {

  const [loaded] = useFonts({
    OpenSansRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansLight: require('./assets/fonts/OpenSans-Light.ttf'),
    OpenSansMedium: require('./assets/fonts/OpenSans-Medium.ttf'),
    OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf')
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer style={styles.container} >
        
        <NavegacionStack />  
        
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  UserICon: {
    color: '#8CAE81',
    fontSize: 28,
    marginRight: Platform.OS === 'ios' ? 20 : 18,
  },
  Logo: {
    fontSize: 10
  },
  BotonBackAjustes:{
    top:Platform.OS === 'ios' ? 8: 15,
},
  IconBackStyle: {
    fontSize:25,
    color: '#8CAE81'
},
TxtStyle: {
  
},
  TxtListoBoton: {
    alignSelf:'center',
    marginRight:20,  
    fontSize:27,
    color:'#8CAE81',
},
  BotonSave: {
    justifyContent:'center',
    alignItems:'center',
    marginLeft:16,
},
  IconoSave: {
    color:'#8CAE81',
    fontSize:23,
},
});


// KAYROS - 16/Julio/2024 //