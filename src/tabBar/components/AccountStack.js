import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import AccountLogout from "../../account/pages/AccountLogout";
import Account from "../../account/pages/Account";
import AccountProfile from "../../account/pages/AccountProfile";
import Accountsecurity from "../../account/pages/Accountsecurity";
import AccountMyAddress from "../../account/pages/AccountMyAddress";
import AccountAddAddress from "../../account/pages/AccountAddAddress";
import Order from "../../account/pages/Order";
import { color } from "../../styles/";

//instacia de stactk navigation (transccion entre pantallas)
const Stack = createStackNavigator();

export default function FavoriteStack() {
  //destructuracion de AuthContextService
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
          name="menuLogout"
          component={AccountLogout}
          options={{ title: "Cuenta", headerShown: false }}
        />
      ) : (
        <>
          <Stack.Screen
            name="menu"
            component={Account}
            options={{ title: "Cuenta", headerShown: false }}
          />
          <Stack.Screen
            name="change-user"
            component={AccountProfile}
            options={{
              title: "Actualizar datos",
            }}
          />
          <Stack.Screen
            name="change-password"
            component={Accountsecurity}
            options={{
              title: "Cambiar contraseña",
            }}
          />
          <Stack.Screen
            name="address"
            component={AccountMyAddress}
            options={{
              title: "Mis direcciones",
            }}
          />
          <Stack.Screen
            name="add-address"
            component={AccountAddAddress}
            options={{
              title: "Formulario",
            }}
          />
          <Stack.Screen
            name="order"
            component={Order}
            options={{
              title: "Mis pedidos",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
