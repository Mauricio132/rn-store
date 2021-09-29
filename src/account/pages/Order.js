import React, { useState, useCallback } from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import ScreenLoading from "../../shared/ScreenLoading";
import ListOrder from "../components/ListOrder";
import { getOrdersApi } from "../services/OrderService";
import StatusBarCustom from "../../shared/StatusBarCustom";
import UseAuthContextService from "../../auth/services/UseAuthContextService";

export default function Orders() {
  //arreglo de ordenes, inicalizado como null
  const [orders, setOrders] = useState(null);
  //desestructuracion de AuthContextService
  const { auth } = UseAuthContextService();

  //ejecucion de efecto secundario cuando la pantalla esta enfocada
  useFocusEffect(
    //devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado.
    useCallback(() => {
      //funcion autoejecutable al server api
      (async () => {
        //obteniendo lista de ordenes desde el server api
        const response = await getOrdersApi(auth);
        //asignando ordenes a arreglo local
        setOrders(response);
      })();
    }, []) // Solo se vuelve a ejecutar si [] cambia
  );

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <ScrollView>
        {!orders ? (
          <ScreenLoading text={"Cargando lista de ordenes..."}></ScreenLoading>
        ) : size(orders) === 0 ? (
          <Text style={styles.noOrdersText}>No tienes pedidos...</Text>
        ) : (
          <ListOrder orders={orders} />
        )}
      </ScrollView>
    </>
  );
}

var styles = StyleSheet.create({
  noOrdersText: {
    textAlign: "center",
    alignItems: "center",
    paddingTop: 20,
    fontSize: 18,
  },
});
