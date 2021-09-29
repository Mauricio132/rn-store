import React from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { color } from "../styles/";

export default function ScreenLoading(props) {
  //props enviados configuracion personalizada
  const { text, size, color } = props;

  return (
    <View style={styles.containerLoading}>
      <ActivityIndicator size={size} color={color} style={styles.loading} />
      <Text style={styles.title}>{text}</Text>
    </View>
  );
}

var styles = StyleSheet.create({
  containerLoading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loading: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
  },
});

ScreenLoading.defaultProps = {
  text: "Cargando...",
  color: color.success,
  size: "large",
};
