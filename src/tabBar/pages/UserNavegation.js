import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { color, layoutStyle } from "../../styles/";
import ProductStack from "../components/ProductStack";
import FavoriteStack from "../components/FavoriteStack";
import CartStack from "../components/CartStack";
import AccountStack from "../components/AccountStack";

//(REQUERIDO) configuración de ruta
const Tab = createMaterialBottomTabNavigator();

//asignacion de iconos
function setIcon(route) {
  //objeto de opciones principales del menu con su respectivo icono
  const icon = {
    home: "home",
    favorite: "heart",
    cart: "shopping-cart",
    account: "bars",
  };
  //buscar iconos por opcion
  const iconName = icon[route.name];
  //retorna icono solicitado
  return <AwesomeIcon name={iconName} style={[styles.icon]} />;
}

export default function UserNavegation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        barStyle={layoutStyle.tabNavigator}
        initialRouteName="home"
        screenOptions={({ route }) => ({
          tabBarIcon: () => {
            return setIcon(route);
          },
        })}
      >
        <Tab.Screen
          name="home"
          component={ProductStack}
          options={{
            title: "Inicio",
          }}
        />
        <Tab.Screen
          name="favorite"
          component={FavoriteStack}
          options={{
            title: "Favoritos",
          }}
        />
        <Tab.Screen
          name="cart"
          component={CartStack}
          options={{
            title: "Carrito",
          }}
        />
        <Tab.Screen
          name="account"
          component={AccountStack}
          options={{
            title: "Cuenta",
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 23,
    color: color.white,
  },
});
