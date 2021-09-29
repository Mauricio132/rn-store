import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { map } from "lodash";
import CardProduct from "./CardProduct";

export default function ListProduct(props) {
  //props recibidos
  const { products } = props;
  //mensaje personalizado cuando no se encuentra busquedas
  if (products.statusCode) {
    return (
      <View style={styles.container}>
        <Text>items no encontrados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {map(products, (product) => (
        <CardProduct key={product._id} productItem={product}></CardProduct>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    margin: -3,
  },
});
