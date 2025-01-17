import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Puedes usar cualquier librería de iconos

const DropdownMenu = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const toggleMenu = () => {
    if (isMenuVisible) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setMenuVisible(false));
    } else {
      setMenuVisible(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const menuStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -150], // Ajusta este valor según la longitud del menú
        }),
      },
    ],
    opacity: animatedValue,
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleMenu} style={styles.button}>
        <MaterialIcons name="add" size={24} color="white" />
      </TouchableOpacity>
      {isMenuVisible && (
        <Animated.View style={[styles.menuContainer, menuStyle]}>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="home" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="search" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="settings" size={24} color="black" />
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
  menuContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'absolute',
    left: '50%', // Alinear con el botón
    top: '50%',
    transform: [{ translateX: 25 }, { translateY: -15 }], // Ajustar para alinear con el centro del botón
    elevation: 5,
    zIndex: 1,
  },
  menuItem: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default DropdownMenu;
    