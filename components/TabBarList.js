import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TabBarList = ({ navigation }) => {
      const route = useRoute();
      const { listData } = route.params || {}; // Recibir datos desde Home.js

       useEffect(() => {
          if (listData) {
            setCheckboxes(listData.checkboxes || []);
            setTitulo(listData.titulo || '');
          }
        }, [listData]);

    const saveList = async (listData, titulo, checkboxes) => {
        try {
          const existingLists = await AsyncStorage.getItem('list');
          let parsedLists = existingLists ? JSON.parse(existingLists) : [];
      
          console.log("Listas existentes:", parsedLists); // Agregar log para ver las listas previas
      
          if (listData?.id) {
            // Actualizar lista existente
            const updatedLists = parsedLists.map((list) =>
              list.id === listData.id ? { ...list, titulo, checkboxes } : list
            );
            await AsyncStorage.setItem('list', JSON.stringify(updatedLists));
            console.log("Lista actualizada:", updatedLists);
          } else {
            // Crear una nueva lista
            const newList = { id: Date.now(), titulo, checkboxes };
            parsedLists.push(newList);
            await AsyncStorage.setItem('list', JSON.stringify(parsedLists));
            console.log("Nueva lista guardada:", parsedLists);
          }

          navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });

        } catch (e) {
          console.error('Error al guardar la lista:', e);
        }
      };
      




  return (
    <View style={styles.container}>
      {/* Botón de agregar (+) */}
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>
      
      {/* Botón de guardar (Save) */}
      <TouchableOpacity style={styles.button} onPress={(saveList)}>
        <Icon name="save" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    marginHorizontal: Platform.OS === 'ios' ? 20 :10,
    bottom: Platform.OS === 'ios' ? 30 : 15,
    borderRadius: 10,
  },
  button: {
    alignItems: 'center',
  },
});

export default TabBarList;