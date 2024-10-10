import React, { useState } from 'react';
import { View, Button, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Home from './Home';
// import BotonBack from '../components/BotonBack';
// import Icon from 'react-native-vector-icons/Entypo';



                // NOTAS IMPORTANTES
// - El teclado cuando sale para escribir en la plataforma de
//android hace que suba con todo y barra de navegacion

// - Hacer que cuando escriba la nota se agregue directamente en el Home
//y junto con ella se borre el texto "Aun no tienes notas?"



// export default function NotasScreen ({ navigation }) {
export default function NotasScreen ({ navigation }) {
    const [note, setNote] = useState('');

  //   async function GuardarNota () {
  //     try {
  //         await AsyncStorage.setItem('@Nota', note); // Guardando la nota
  //         console.log('Nota guardada:', note);
          
  //         if (note !== '') {
  //           navigation.navigate('Home');
  //       } 
  //     } catch (error) {
  //         console.log('Error al guardar la nota:', error);
  //     }
  // }

  
    const dismissKeyboard = () => {
        Keyboard.dismiss();
      };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                value={note}
                onChangeText={setNote}
                placeholder="Escribe tu nota aquí..."
                autoFocus
                multiline
            />

            <Button title='Guardar' onPress={''}/>
          </View>
          {/* <View>
            <Button title='Guardar' onPress={GuardarNota}/>
          </View> */}
        </TouchableWithoutFeedback>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex:1,
        padding: 16,
        backgroundColor: '#F0F0F0',
      },

    textInput: {
        flex: 1,
        marginTop:50,
        fontSize: 18,
        backgroundColor: '#F0F0F0',
        
      },
    });