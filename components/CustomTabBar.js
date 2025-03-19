import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Platform, Keyboard, Animated } from 'react-native';

// Importando Iconos para las pantallas
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Feather';

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  // Estado y animación para manejar la posición del tab bar
  const [translateY] = useState(new Animated.Value(0));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      Animated.timing(translateY, {
        toValue: 100, // Oculta la barra (ajusta el valor según sea necesario)
        duration: 150,
        useNativeDriver: true,
      }).start();
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      Animated.timing(translateY, {
        toValue: 0, // Restaura la posición original
        duration: 0,
        useNativeDriver: true,
      }).start();
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [translateY]);

  const tabs = [
    { name: 'List', icon: <Icon2 name="tasklist" size={24} color="#8CAE81" style={styles.Iconos} /> },
    { name: 'Home', icon: <Icon name="home" size={25} color="#8CAE81" style={styles.Iconos} /> },
    { name: 'Note', icon: <Icon3 name="edit" size={24} color="#8CAE81" style={styles.Iconos} /> },
  ];

  return (
    <Animated.View
      style={[
        styles.tabBar,
        {
          transform: [{ translateY }],
        },
      ]}
    >
      {tabs.map((tab, index) => {
        const isFocused = state.routes[state.index].name === tab.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: state.routes[index].key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(tab.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: state.routes[index].key,
          });
        };

        return (
          <TouchableOpacity
            key={tab.name}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.tab, isFocused && styles.tabFocused]}
          >
            {React.cloneElement(tab.icon, { color: isFocused ? '#8CAE81' : '#E9EFEC' })}
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1E1E1E',
    paddingVertical: 15,
    marginHorizontal: Platform.OS === 'ios' ? 20 :10,
    borderRadius: 10,
    bottom: Platform.OS === 'ios' ? 30 : 15,
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10, // Asegura que esté por encima del contenido
  },
  tab: {
    alignItems: 'center',
  },
  tabFocused: {
    borderBottomWidth: 2,
    borderBottomColor: '#8CAE81', // Indicador de selección
  },
});

export default CustomTabBar;
