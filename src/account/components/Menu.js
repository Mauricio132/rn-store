import React from "react";
import { Alert, View, StyleSheet, Text } from "react-native";
import { List, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { color, layoutStyle } from "../../styles/";

export default function Menu() {
  //obteniendo rutas(navegacion)
  const navigation = useNavigation();
  //desestructuracin AuthContetxt
  const { stateShowScreenAuth, auth, logout } = UseAuthContextService();
  //funcion para mostrar pantalla ScreenAth
  const showScreenAuth = () => {
    stateShowScreenAuth(true);
  };

  //funcion deslogueo AuthContext
  const logoutAuth = () => {
    //cerrando cesion (removiendo token de usuario)
    logout();
    //redireccion pantalla principal de menuLogout
    navigation.navigate("account");
  };

  //funcion deslogueo IU
  const logoutAccount = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estas seguro de que quieres salir de tu cuenta?",
      [
        {
          text: "NO",
        },
        { text: "SI", onPress: logoutAuth },
      ],
      { cancelable: false }
    );
  };

  return (
    <>
      <List.Section>
        {auth ? (
          <>
            <List.Section>
              <List.Subheader>Configuración de la cuenta</List.Subheader>
              <List.Item
                title="Actualizar datos"
                description="Actualice datos de sus perfil"
                left={(props) => <List.Icon {...props} icon="face" />}
                onPress={() => navigation.navigate("change-user")}
              />
              <List.Item
                title="Cambiar contraseña"
                description="Cambia el contraseña de tu cuenta"
                left={(props) => <List.Icon {...props} icon="key" />}
                onPress={() => navigation.navigate("change-password")}
              />
              <List.Item
                title="Mis direcciones"
                description="Administra tus direcciones de envio"
                left={(props) => <List.Icon {...props} icon="map" />}
                onPress={() => navigation.navigate("address")}
              />
              <List.Item
                title="Añadir direcciones"
                description="Agregue direcciones de envio"
                left={(props) => <List.Icon {...props} icon="map-plus" />}
                onPress={() => navigation.navigate("add-address")}
              />
            </List.Section>
            <List.Section>
              <List.Subheader>Preferencia</List.Subheader>
              <List.Item
                title="Pedidos"
                description="Listado de todos los pedidos"
                left={(props) => <List.Icon {...props} icon="clipboard-list" />}
                onPress={() => navigation.navigate("order")}
              />
              <List.Item
                title="Lista de deseos"
                description="Listado de todos los productos que te quieres comprar"
                left={(props) => <List.Icon {...props} icon="heart" />}
                onPress={() => navigation.navigate("favorite")}
              />
            </List.Section>

            <Divider style={layoutStyle.lineDivisor} />

            <List.Section>
              <List.Item
                title="Cerrar sesión"
                description="Cierra esta sesion e inicia con otra cuenta"
                left={(props) => <List.Icon {...props} icon="logout" />}
                onPress={logoutAccount}
              />
            </List.Section>
          </>
        ) : (
          <>
            <List.Subheader>Cuenta</List.Subheader>
            <List.Item
              title="Iniciar sesión"
              description="Inicie sesión o cree una cuenta"
              left={(props) => <List.Icon {...props} icon="login" />}
              onPress={showScreenAuth}
            />
          </>
        )}
      </List.Section>

      <View style={styles.container}>
        <Text style={styles.textColor}> Alpha - v0.0.1 </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    alignItems: "center",
  },
  textColor: {
    color: color.colorGlobal,
  },
});
