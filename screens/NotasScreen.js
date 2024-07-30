import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'; 
import BotonBack from '../components/BotonBack';
import Icon from 'react-native-vector-icons/Entypo';

export default function NotasScreen ({ navigation }) {
    const [note, setNote] = useState('');

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
          </View>
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