import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet,Text, View, TextInput, Platform, ScrollView, TouchableOpacity } from 'react-native';
import Checkbox from 'expo-checkbox'; // Importamos el componente Checkbox de Expo
import AsyncStorage from '@react-native-async-storage/async-storage'; // Importamos AsyncStorage para guardar la lista
import { useFocusEffect } from '@react-navigation/native'; // Importamos useFocusEffect para recargar la lista cada vez que la pantalla se enfoque


// Importando Iconos
import Icon from 'react-native-vector-icons/AntDesign'; // Icono para la barra de busqueda -  search1
import Icon2 from 'react-native-vector-icons/Octicons'; // Icono para editar listas -  pencil

// Importando Componentes usables
import CrearNota from '../components/CrearNota';
import CrearListas from '../components/CrearListas';


export default function Home ({ navigation }) {
    const [Search, setSearch] = useState();
    const [list, setList] = useState(null);

    // Función para cargar la lista desde AsyncStorage
    const fetchList = async () => {
        try {
          const savedList = await AsyncStorage.getItem('list');
          console.log('Datos cargados:', savedList); // Debug
          if (savedList) {
            setList(JSON.parse(savedList));
          }
        } catch (e) {
          console.error(e);
        }
      };

    // useFocusEffect para recargar la lista cada vez que la pantalla se enfoque
    useFocusEffect(
        React.useCallback(() => {
            fetchList(); // Llamamos a la función fetchList al enfocarse en la pantalla
        }, [])
    );
      
    
    const toggleCheckbox = (checkboxId, newValue, listId) => {
        if (list) {
          const updatedList = list.map((item) => {
            if (item.id === listId) {
              const updatedCheckboxes = item.checkboxes.map((checkbox) =>
                checkbox.id === checkboxId ? { ...checkbox, checked: newValue } : checkbox
              );
              return { ...item, checkboxes: updatedCheckboxes };
            }
            return item;
          });
      
          setList(updatedList);
          AsyncStorage.setItem('list', JSON.stringify(updatedList));
        }
      };

//    ENCONTRAR LA MANERA DE QUE EL TAB BAR NO SUBA CUANDO SE ABRE EL TECLADO

      return (
        <View style={styles.Container }>  
            <StatusBar style='light' />
            <ScrollView>
                {/* BUSCADOR DE PALABRAS DE EN LAS NOTAS */}
                <View style={styles.ContainerSearch}>
                    <Icon name='search1' style={styles.IconSearch}/>
                    <TextInput
                        placeholder='Search'
                        value={Search}
                        onChangeText={setSearch}
                        style={styles.TextInputSearch} 
                    />
                </View>
                {/* View de Listas */}
                {list && list.length > 0 ? (
                list.map((item) => (
                <View key={item.id} style={styles.ContainerList}>
                    <TouchableOpacity onPress={() => navigation.navigate('List', { listData: item })} style={styles.ContainerPencil}>
                        <Icon2 name='pencil' style={styles.IconPencil} />
                    </TouchableOpacity>
                    <Text style={styles.TitleList}>{item.titulo}</Text>
                    {item.checkboxes.map((checkbox) => (
                        <View key={checkbox.id} style={styles.checkboxContainer}>
                            <Checkbox
                                value={checkbox.checked}
                                onValueChange={(newValue) => toggleCheckbox(checkbox.id, newValue, item.id)}
                                color={checkbox.checked ? '#8CAE81' : undefined}
                                style={styles.checkbox}
                            />
                            <Text style={styles.checkboxText}>{checkbox.text || '...'}</Text>
                        </View>
                    ))}
                </View>
                    ))
                ) : (
        <View style={styles.ContainerPresentacion}>
            <Text style={styles.Txt1}>¡Hola! Parece que aún no tienes notas ni listas.</Text>
            <Text style={styles.Txt2}>¿Qué tal si comienzas a organizarte ahora mismo?</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <CrearNota />
                <CrearListas />
            </View>
        </View>
                )}
            </ScrollView>
        </View> 
    )
}

const styles = StyleSheet.create({
    Container: {
        flex:1,
        padding:16,
        backgroundColor:'#E3E6E9',
    },
    //     ESTILO DEL BUSCADOR
    ContainerSearch: {
        // top:10,    
        backgroundColor:"#F8F8F8",
        borderRadius:10,
        width:'auto',
        height:'auto',
        borderColor:'#8CAE81',
        borderWidth: 1.1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom:35,
    },
    IconSearch:{
        fontSize:21,
        color:'#8CAE81',
        marginLeft:16,
    },
    TextInputSearch:{
        fontSize:Platform.OS === 'ios' ? 14 : 13,
        marginLeft:10,
        width: 1000, // Esto es para asegurarme que en cada dispositivo este tome el ancho completo, Ya que arriba esta en auto y asi se ajusta
        height:Platform.OS === 'ios' ? 40 : 38,
        fontFamily:'OpenSansMedium',  
    },
    ContainerPresentacion: {
        alignItems:'center',
        justifyContent:'center',
    },
    Txt1: { 
        fontFamily:'OpenSansBold',
        fontSize:18,
        textAlign:'center',
        marginBottom:10,
    },
    Txt2: {
        textAlign:'center',
        fontFamily:'OpenSansMedium',
        fontSize:13,
    },
// ESPACIO DE ESTILO PARA LAS LISTAS
    ContainerList: {
        padding: 16,
        width: 'auto',
        height: 'auto',
        backgroundColor:'#F8F8F8',  
        borderColor:'#8CAE81',
        borderWidth: 0.3, 
        marginBottom: 15,
        borderRadius: 10,
    },
    TitleList: {
        marginBottom:10,
        fontFamily:'OpenSansBold',
    },
    ContainerPencil:{
        position:'absolute',
        alignSelf:'flex-end',
    },
    IconPencil: {
        left:20, // Ajustando el icono para que este en las esquinas
        bottom:20, // Ajustando el icono para que este en las esquinas
        margin:30, // Agrandando el fondo del icono para que la zona de pulsancion sea mas grande y facil de tocar
        fontSize: 20,
        color: '#8CAE81',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
  },
    checkbox: {
        marginRight: 8, // Espacio entre el checkbox y el input de texto
        borderRadius:7,
    },
    checkboxText:{
        fontFamily:'OpenSansRegular',
        fontSize:13,

    },
});                     