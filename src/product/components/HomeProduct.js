import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import ListProduct from "./ListProduct";
import { getLastProuctsApi } from "../services/ProductService";
import ScreenLoading from "../../shared/ScreenLoading";
import { color } from "../../styles";

export default function HomeProduct() {
  //arreglo de productos, inicializado con 0 elementos
  const [products, setProducts] = useState([]);

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //funcion anonima autoejecutable de tipo async
    (async () => {
      //peticion y asignacion de los productos, al api server
      const response = await getLastProuctsApi();
      setProducts(response);
    })();
  }, []); // Solo se vuelve a ejecutar si [arg] cambia, [] => se ejecuta despues del primer renderizado y muere

  return (
    <>
      {products.length === 0 ? (
        <View style={styles.containerLoading}>
          <ScreenLoading></ScreenLoading>
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.title}>Todos los productos</Text>
          {products && <ListProduct products={products} />}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  containerLoading: {
    marginTop: "50%",
  },
  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "flex-start",
    color: color.colorGlobal,
  },
});
