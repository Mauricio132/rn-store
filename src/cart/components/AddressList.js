import React, { useEffect } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "react-native-paper";
import { map, size } from "lodash";
import { color } from "../../styles/";

export default function AddressList(props) {
  //props recibidos desde el padre
  const { addresses, selectedAddress, setSelectedAddress } = props;
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //actualizamos direción
    addresses && setSelectedAddress(addresses[0]);
  }, []); // Solo se vuelve a ejecutar si [] cambia de valor

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>Direccion de envio:</Text>

      {size(addresses) === 0 ? (
        <TouchableWithoutFeedback
          onPress={() =>
            navigation.navigate("account", { screen: "add-address" })
          }
        >
          <View style={styles.addAddress}>
            <Text style={styles.addAddressText}>
              Añada su primera dirección de envio
            </Text>
            <IconButton icon="arrow-right" color="#000" size={19} />
          </View>
        </TouchableWithoutFeedback>
      ) : (
        map(addresses, (address) => (
          <TouchableWithoutFeedback
            key={address._id}
            onPress={() => setSelectedAddress(address)}
          >
            <View
              style={[
                styles.address,
                address._id === selectedAddress?._id && styles.checked,
              ]}
            >
              <Text style={styles.title}>{address.title}</Text>
              <Text>{address.name_lastname}</Text>
              <Text>{address.address}</Text>
              <View style={styles.blockLine}>
                <Text>{address.state}, </Text>
                <Text>{address.city}, </Text>
                <Text>{address.postal_code}</Text>
              </View>
              <Text>{address.country}</Text>
              <Text>Numero de telefono: {address.phone}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))
      )}
    </View>
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
  address: {
    borderWidth: 0.9,
    borderRadius: 5,
    borderColor: "#ddd",
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
  },
  title: {
    fontWeight: "bold",
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
  },
  checked: {
    borderColor: color.success,
    backgroundColor: "#0098d330",
  },
  addAddress: {
    borderWidth: 0.8,
    borderRadius: 10,
    borderColor: color.colorGlobal,
    paddingHorizontal: 20,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  addAddressText: {
    fontSize: 18,
  },
});
