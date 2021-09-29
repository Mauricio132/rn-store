import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import Favorite from "../../favorite/pages/Favorite";
import ScreenLogout from "../../shared/ScreenLogout";
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
      {auth ? (
        <Stack.Screen
          name="favoriteList"
          children={() => <Favorite auth={auth} />}
          options={{ title: "Lista de Favoritos" }}
        />
      ) : (
        <Stack.Screen
          name="notlogin"
          children={() => <ScreenLogout text={textInfo()} />}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}

//funcion que retorna objeto de mensajes personalizado
function textInfo() {
  const text = {
    title: "¿Quieres guardar algo para más tarde?",
    description:
      "Aquí encontrarás su lista de deseos, inicie sesión para continuar",
  };
  return text;
}
