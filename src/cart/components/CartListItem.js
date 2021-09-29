import React, { useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import ScreenLoading from "../../shared/ScreenLoading";
import ItemCard from "./ItemCard";
import { getProductApi } from "../../product/services/ProductService";

export default function CartListItem(props) {
  // props recibidos
  const { cart, products, setProducts, setReloadCart, setTotalPayment } = props;

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //funcion autoejecutable, actualiza elementos de la lista
    (async () => {
      //inicializamos array temporal
      const productTemp = [];
      //total a pagar incializado en 0
      let totalPaymentTemp = 0;
      //recorremos lista de elemntos enviados desde el componente padre
      for await (const product of cart) {
        //peticion a server api, solicitar datos del producto
        const response = await getProductApi(product.idProduct);
        //?
        response.quantity = product.quantity;
        //agregamos elemento  a aray temporal
        productTemp.push(response);
        //calculando total a pagar
        totalPaymentTemp += response.price * product.quantity;
      }
      //asiganamos productos
      setProducts(productTemp);
      //asignamos total a pagar
      setTotalPayment(totalPaymentTemp.toFixed(2));
      //cambiamos el valor de variable de estado
      setReloadCart(false);
    })();
  }, [cart]); // Solo se vuelve a ejecutar si [cart] cambia de valor

  return (
    <View>
      <Text style={styles.title}>Productos agregados al carrito:</Text>
      {!products ? (
        <ScreenLoading text="Cargando items..."></ScreenLoading>
      ) : (
        map(products, (product) => (
          <ItemCard
            key={product._id}
            product={product}
            setReloadCart={setReloadCart}
          ></ItemCard>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
