import React from "react";
import { StyleSheet, View, Text, Alert } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { deleteAddressApi } from "../services/AccountAddressService";
import { color } from "../../styles/";

export default function AddressList(props) {
  //props recibidos
  const { addresses, setReloadAddress } = props;
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();
  //desestructuracion de AuthConteXT Service
  const { auth } = UseAuthContextService();

  //funcion redirigir a pantalla AccountAddAddress (funcionalidad actualizar)
  const goToUpdateAddress = (idAddress) => {
    navigation.navigate("add-address", { idAddress });
  };

  //funcion eliminar una direccion IU
  const deleteAddressAlert = (address) => {
    Alert.alert(
      "Eliminadr dirección",
      `¿Estas seguro de que quieres eliminar la dirección ${address.title}?`,
      [
        {
          text: "NO",
        },
        { text: "SI", onPress: () => deleteAddress(address._id) },
      ],
      { cancelable: false }
    );
  };

  //funcion eliminar una direccion al server api
  const deleteAddress = async (idAddress) => {
    try {
      await deleteAddressApi(auth, idAddress);
      setReloadAddress(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {map(addresses, (address) => (
        <View key={address._id} style={styles.address}>
          <Text style={styles.title}>{address.title}</Text>
          <Text>Usuario: {address.name_lastname}</Text>
          <Text>Dirección: {address.address}</Text>
          <View style={styles.blockLine}>
            <Text>{address.country}, </Text>
            <Text>{address.state}, </Text>
            <Text>{address.city}, </Text>
            <Text>{address.postal_code}</Text>
          </View>
          <Text>Celular: {address.phone}</Text>
          <View style={styles.actions}>
            <Button
              mode="contained"
              style={styles.btn}
              color={color.primary}
              onPress={() => goToUpdateAddress(address._id)}
            >
              Editar
            </Button>
            <Button
              mode="contained"
              style={styles.btn}
              color={color.danger}
              onPress={() => deleteAddressAlert(address)}
            >
              Eliminar
            </Button>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  address: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: color.secondary,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    paddingBottom: 5,
  },
  blockLine: {
    flexDirection: "row",
  },
  actions: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 10,
  },
  btn: {
    marginRight: 10,
  },
});
