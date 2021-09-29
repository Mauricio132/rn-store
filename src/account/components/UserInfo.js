import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { layoutStyle } from "../../styles/";

export default function UserInfo(props) {
  //props objeto usuario(informaicon )
  const { userInfo } = props;

  return (
    <View style={layoutStyle.container}>
      <Text style={styles.title}>Bienvenido, {userInfo.username}</Text>
      <Text style={styles.titleName}>
        {userInfo.name} {userInfo.lastname}
      </Text>
      <Text style={styles.titleEmail}>{userInfo.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  titleName: {
    fontSize: 15,
    fontWeight: "normal",
  },
  titleEmail: {
    fontSize: 15,
    fontWeight: "normal",
  },
});

UserInfo.defaultProps = {
  userInfo: {
    username: "",
    name: "Usuario",
    lastname: "Invitado",
    email: "No ha iniciado sesión",
  },
};
