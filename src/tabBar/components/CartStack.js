import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ScreenLogout from "../../shared/ScreenLogout";
import Cart from "../../cart/pages/Cart";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { color } from "../../styles/";

//instacia de stactk navigation (transccion entre pantallas)
const Stack = createStackNavigator();

export default function FavoriteStack() {
  //desestructuracion de UseAuthContextService
  const { auth } = UseAuthContextService();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: color.colorGlobal,
        headerStyle: { backgroundColor: color.white },
        cardStyle: {
          backgroundColor: color.white,
        },
      }}
    >
      {auth === null ? (
        <Stack.Screen
          name="notlogin"
          component={ScreenLogout}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="cardPayment"
          component={Cart}
          options={{ title: "Carrito" }}
        />
      )}
    </Stack.Navigator>
  );
}
