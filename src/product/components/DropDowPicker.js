import React from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
import { map } from "lodash";
import { color } from "../../styles/";

export default function DropDowPicker(props) {
  //props recibidos
  const { quantity, valuesQuantity, setQuantity } = props;

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text1}>Cantidad : </Text>
        <View style={styles.containerPicker}>
          <Picker
            style={styles.pickerstyles}
            itemStyle={styles.itemStyles}
            selectedValue={quantity}
            onValueChange={(itemValue) => {
              setQuantity(itemValue);
            }}
          >
            {map(valuesQuantity, (i) => (
              <Picker.Item key={i.value} label={i.label} value={i.value} />
            ))}
          </Picker>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 5,
    paddingVertical: 1,
  },
  containerPicker: {
    width: "21%",
    borderRadius: 5,
    borderWidth: 0.8,
    borderColor: color.info,
  },
  text1: {
    width: "45%",
    margin: 10,
    fontSize: 20,
    textAlign: "right",
  },
  pickerstyles: {
    width: "100%",
    color: color.colorGlobal,
    justifyContent: "space-between",
  },
  pickersText: {
    fontSize: 1,
  },
  itemStyles: {
    alignItems: "center",
    color: color.danger,
  },
});
