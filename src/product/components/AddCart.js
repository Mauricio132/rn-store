import React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { showToastShort } from "../../shared/ToastCustom";
import { addProductCartApi } from "../../cart/services/CartSservice";
import AuthContextService from "../../auth/services/UseAuthContextService";
import { color } from "../../styles/";

export default function AddCart(props) {
  //props recibidos
  const { product, quantity } = props;
  //desestructuracion de AuthContextService
  const { auth } = AuthContextService();

  //funcion, agregar productos al carrito
  const addProductCart = async () => {
    // peticion a local storage, add item al carrito
    const response = await addProductCartApi(product._id, quantity);
    //mensaje de confirmacion
    response
      ? showToastShort(product.title + " añadido al carrito")
      : showToastShort(
          "Error al añadir el producto al carrito, intente de nuevo..."
        );
  };

  return (
    <Button
      mode="contained"
      disabled={auth ? false : true}
      style={styles.btn}
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      onPress={addProductCart}
    >
      Añadir a la cesta
    </Button>
  );
}

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 15,
  },
  btnBuyContent: {
    backgroundColor: color.primary,
    paddingVertical: 1,
  },

  btn: {
    margin: 5,
  },
});
