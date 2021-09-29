import React from "react";
import { StatusBar } from "react-native";
import { color } from "../styles/";

export default function StatusBarCustom(props) {
  //destructuracion asignacion de color
  const { color } = props;
  return (
    <>
      <StatusBar backgroundColor={color} />
    </>
  );
}

//config por defecto
StatusBarCustom.defaultProps = {
  color: color.secondary,
};
