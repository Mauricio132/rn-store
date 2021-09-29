import React, { useState } from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import StatusBarCustom from "../../shared/StatusBarCustom";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { layoutStyle, color } from "../../styles/";
import logo from "../../../assets/logo.png";

export default function ScreenAuth() {
  //estado mostrar pantalla Login/Register
  const [showLogin, setShowLogin] = useState(true);
  //desestructuracin showScreenAth
  const { stateShowScreenAuth } = UseAuthContextService();

  //funcion para mostrar pantalla ScreenAth
  const showScreenAuth = () => {
    stateShowScreenAuth(false);
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
        volver
      </Button>
      <View style={layoutStyle.container}>
        <Image style={layoutStyle.imageLogo} source={logo}></Image>

        {showLogin ? (
          <LoginForm setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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
