import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import StatusBarCustom from "../shared/StatusBarCustom";
import { color, layoutStyle } from "../styles/";
import UseAuthContextService from "../auth/services/UseAuthContextService";

export default function ScreenLogout(props) {
  //props recibidos, mensajes personalizados
  const { text } = props;
  //desestructuracin AuthContetxt
  const { stateShowScreenAuth } = UseAuthContextService();
  //funcion para mostrar pantalla ScreenAth
  const showScreenAuth = () => {
    stateShowScreenAuth(true);
  };

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <Button
        mode="text"
        style={styles.btnText}
        labelStyle={styles.btnTextColor}
        onPress={showScreenAuth}
      >
        Iniciar sesión
      </Button>
      <View style={layoutStyle.container}>
        <Text style={styles.title}>{text.title}</Text>
        <Text style={styles.description}>{text.description}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25,
    textAlign: "center",
    padding: 1,
    color: color.dark,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
    padding: 20,
    color: color.secondary,
  },
  btnText: {
    alignItems: "flex-end",
    fontSize: 18,
    padding: 15,
  },
  btnTextColor: {
    color: color.secondary,
    textDecorationLine: "underline",
  },
});

//mensaje por defecto
ScreenLogout.defaultProps = {
  text: {
    title: "Disfrutar de una experiencia optima iniciando sesion...",
    description: "",
  },
};
