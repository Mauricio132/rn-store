import React, { useEffect, useState } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";
import { map } from "lodash";
import { color } from "../../styles/";

export default function DropDownAddress(props) {
  //props recibidos desde el padre
  const { addresses, selectedAddress, setSelectedAddress } = props;
  const [display, setDisplay] = useState(
    `${selectedAddress?.title} - ${selectedAddress?.address}`
  );

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //actualizamos direciones
    addresses && setSelectedAddress(addresses[0]);
  }, []); // Solo se vuelve a ejecutar si [reloadCart] cambia de valor

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.containerTitle}>Direccion de envio:</Text>
        <View style={styles.containerPicker}>
          <Picker
            style={styles.pickerstyles}
            selectedValue={display}
            onValueChange={(itemValue) => {
              setDisplay(`${itemValue.title} - ${itemValue.address}`);
              setSelectedAddress(itemValue);
              console.log(selectedAddress);
            }}
          >
            {map(addresses, (address) => (
              <Picker.Item
                key={address._id}
                label={`${address.title} - ${address.address}`}
                value={address}
              />
            ))}
          </Picker>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerPicker: {
    width: "100%",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: color.info,
  },
  pickerstyles: {
    width: "100%",
    color: color.colorGlobal,
    justifyContent: "space-between",
  },
});
