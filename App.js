
import { StyleSheet, Image, Platform, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/SimpleLineIcons';
import Icon3 from 'react-native-vector-icons/Feather'; 
import Icon4 from 'react-native-vector-icons/Entypo';
import Inicio from './screens/Inicio';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import BotonBack from './components/BotonBack';
import NotasScreen from './screens/NotasScreen';
import LogoGeneral from './components/LogoGeneral';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


function HomeTabs () {

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <Tab.Navigator
    screenOptions={({ route }) => ({
      ... (Platform.OS === 'ios'
      ? TransitionPresets.SlideFromRightIOS
      : TransitionPresets.FadeFromBottomAndroid),
      headerLeft: () => <LogoGeneral style={styles.Logo} />,
      tabBarStyle: {
        display: route.name === 'Notas' ? 'none' : 'flex',
      },
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
            component={'Home'}
            options={{
              headerTitle: '',
              headerStyle: {
                backgroundColor: '#1E1E1E', 
              },
              tabBarIcon: ({ color, size }) => {
                return (
                  <Icon3 name="list" size={size} color={color} style={styles.CarIcon} />
                )
              },
            }}
          />
        <Tab.Screen 
          name='Note'
          component={NotasScreen}
          options={{
            tabBarVisible: false,
            headerTitle: '',
            headerStyle: {
              backgroundColor: '#1E1E1E', 
            },
            tabBarIcon: ({ color, size }) => {
              return (
                <Icon2 name="note" size={size} color={color} style={styles.CarIcon} />
              )
            },
            headerLeft: () => 
            <BotonBack 
              // navigation={navigation}
              style={styles.BotonBackAjustes}
              iconStyle={styles.IconBackStyle}
            />,
            headerRight: () => 
              <TouchableOpacity onPress={dismissKeyboard} style={styles.BotonListo}>
                 <Icon4
                    style={styles.TxtListoBoton}
                    name='check'
                />
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
    fontSize: 30,
    marginRight: Platform.OS === 'ios' ? 20 : 18,
    marginTop: Platform.OS === 'ios' ? 0 : 10,
  },
  Logo: {
    fontSize: 10
  },
  BotonBackAjustes:{
    top:Platform.OS === 'ios' ? 8: 15,
},
  IconBackStyle: {
  fontSize:Platform.OS === 'ios' ? 30: 30,
  color: '#8CAE81'
},
TxtListoBoton: {
  marginRight:10,  
  fontSize:30,
  color:'#8CAE81',
},
});
