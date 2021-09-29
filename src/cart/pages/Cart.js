import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import StatusBarCustom from "../../shared/StatusBarCustom";
import ScreenLoading from "../../shared/ScreenLoading";
import CartListItem from "../components/CartListItem";
import DropDownAddress from "../components/DropDownAddress";
import AddressList from "../components/AddressList";
import Payment from "../components/Payment";
import { getProductCartApi } from "../services/CartSservice";
import { getAddressesApi } from "../../account/services/AccountAddressService";
import AuthContextService from "../../auth/services/UseAuthContextService";
import { color } from "../../styles/";

export default function Cart() {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState(null);
  const [addresses, setAddresses] = useState(null);
  const [reloadCart, setReloadCart] = useState(false);
  const [totalPayment, setTotalPayment] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  //destructuracion de AuthContext
  const { auth } = AuthContextService();

  //hook de efecto secundario cuando la pantalla esta enfocada
  useFocusEffect(
    //devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado.
    useCallback(() => {
      setCart(null);
      loadCart();
      loadAddresses();
    }, []) // Solo se vuelve a ejecutar si [] cambia
  );

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //actulizar elementos en el carrito
    reloadCart && loadCart();
  }, [reloadCart]); // Solo se vuelve a ejecutar si [reloadCart] cambia de valor

  //funcion, carga productos agregados al carrito desde el local storage
  const loadCart = async () => {
    const response = await getProductCartApi();
    setCart(response);
  };

  //carga lista de direcciones desde el server api
  const loadAddresses = async () => {
    const response = await getAddressesApi(auth);
    setAddresses(response);
  };

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      {!cart || size(cart) === 0 ? (
        <View style={styles.cartContainer}>
          <Text style={styles.text}>No tienes productos en el carrito</Text>
        </View>
      ) : (
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <ScrollView style={styles.cartContainer}>
            <CartListItem
              cart={cart}
              products={products}
              setProducts={setProducts}
              setReloadCart={setReloadCart}
              setTotalPayment={setTotalPayment}
            ></CartListItem>
            <AddressList
              addresses={addresses}
              selectedAddress={selectedAddress}
              setSelectedAddress={setSelectedAddress}
            ></AddressList>
            <Payment
              totalPayment={totalPayment}
              selectedAddress={selectedAddress}
              products={products}
            ></Payment>
          </ScrollView>
          {reloadCart && (
            <View style={styles.reload}>
              <ActivityIndicator size="large" color={color.white} />
              <Text style={styles.reloadText}>Cargando...</Text>
            </View>
          )}
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  reload: {
    backgroundColor: "#000",
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  reloadText: {
    marginTop: 10,
    color: "#fff",
  },
});
