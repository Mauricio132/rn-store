import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import { IconButton } from "react-native-paper";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import ScreenLoading from "../../shared/ScreenLoading";
import StatusBarCustom from "../../shared/StatusBarCustom";
import AddressList from "../components/AddressList";
import { getAddressesApi } from "../services/AccountAddressService";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { color } from "../../styles/";

export default function AccountMyAddress() {
  //estado de direcciones, inicializado como arreglo con 0 elementos
  const [addresses, setAddresses] = useState([]);
  //estado de pantalla de carga
  const [loading, setLoading] = useState(false);
  //estado actualizar direcciones
  const [reloadAddress, setReloadAddress] = useState(false);
  //desestructuracion de AuthConteXT Service
  const { auth } = UseAuthContextService();
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();

  //ejecucion de efecto secundario cuando la pantalla esta enfocada
  useFocusEffect(
    //devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado.
    useCallback(() => {
      //mostrando pantalla de carga
      setLoading(true);
      (async () => {
        //obteniendo direcciones desde el server api
        const response = await getAddressesApi(auth);
        //asignando direcciones al array
        setAddresses(response);
        //asignando valor a variable de estado
        setReloadAddress(false);
        //quitando pantalla de carga
        setLoading(false);
      })();
    }, [reloadAddress]) // Solo se vuelve a ejecutar si [reloadAddress] cambia
  );

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <ScrollView style={styles.container}>
        <TouchableWithoutFeedback
          onPress={() => navigation.navigate("add-address")}
        >
          <View style={styles.addAddress}>
            <Text style={styles.addAddressText}>Añadir una dirección</Text>
            <IconButton icon="arrow-right" color="#000" size={19} />
          </View>
        </TouchableWithoutFeedback>

        {loading ? (
          <View style={{ marginTop: "60%" }}>
            <ScreenLoading text={"cargando direcciones..."}></ScreenLoading>
          </View>
        ) : size(addresses) === 0 ? (
          <Text style={styles.noAddressText}>Cree su primera dirección...</Text>
        ) : (
          <AddressList
            addresses={addresses}
            setReloadAddress={setReloadAddress}
          />
        )}
      </ScrollView>
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
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
  noAddressText: {
    textAlign: "center",
    paddingTop: 20,
    fontSize: 18,
    marginTop: "50%",
  },
});
