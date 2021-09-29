import React, { useState } from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";

export default function ModalPickerCustom() {
  const [chooseData, setChooseData] = useState("seleccione item...");
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.touchableOpacity}></TouchableOpacity>
        <Text style={styles.text}>{chooseData}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  touchableOpacity: {},
  text: {},
});
