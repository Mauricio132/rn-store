import React, { useState, useEffect, useMemo } from "react";
import { Provider } from "react-native-paper";
//requerido por @react-navigation/native
import "react-native-gesture-handler";
import jwtDecode from "jwt-decode";
import {
  getTokenApi,
  setTokenApi,
  removeTokenApi,
} from "./src/auth/services/AuthToken";
import AuthContextService from "./src/auth/services/AuthContextService";
import ScreenAuth from "./src/auth/pages/ScreenAuth";
import UserNavegation from "./src/tabBar/pages/UserNavegation";

export default function App() {
  //incializamos estado de autentificacion como undefined
  const [auth, setAuth] = useState(undefined);
  //incializamos el estado, (0=mostrar app, 1=mostar pantalla Auth)
  const [showScreenAuth, setShowScreenAuth] = useState(false);

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //funcion anonima autoejecutable de tipo async
    (async () => {
      //peticion del token al local storage
      const token = await getTokenApi();
      if (token) {
        setShowScreenAuth(false);
        setAuth({
          token,
          idUser: jwtDecode(token).id,
        });
      } else {
        setAuth(null);
      }
    })();
  }, []); // Solo se vuelve a ejecutar si [] cambia

  //funcion para asignar estado a showScreenAuth
  const stateShowScreenAuth = (state) => {
    setShowScreenAuth(state);
  };

  //funcion de logueo, asignar valor al Auth
  const login = (user) => {
    setTokenApi(user.jwt);
    setAuth({
      token: user.jwt,
      idUser: jwtDecode(user.jwt).id,
    });
  };

  //funcion de deslogueo, asignar valor null al cerrar sesion
  const logout = () => {
    if (auth) {
      removeTokenApi();
      setAuth(null);
    }
  };

  //Devuelve un valor memorizado (autenticacion de usuario, funciones extra)
  //useMemo se ejecuta durante el renderizado
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      stateShowScreenAuth,
    }),
    [auth] // solo volverá a calcular el valor memorizado si [auth] cambia de valor
  );

  if (showScreenAuth) {
    return (
      <AuthContextService.Provider value={authData}>
        <Provider>
          <ScreenAuth></ScreenAuth>
        </Provider>
      </AuthContextService.Provider>
    );
  }

  return (
    <AuthContextService.Provider value={authData}>
      <Provider>
        <UserNavegation></UserNavegation>
      </Provider>
    </AuthContextService.Provider>
  );
}
