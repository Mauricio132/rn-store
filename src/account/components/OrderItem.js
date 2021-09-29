import React from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { environment } from "../../environments/environment";
import { color } from "../../styles/";

export default function OrderItem(props) {
  //props recibidos desde componente padre
  const { order } = props;
  //obteniendo url del server api desde variable de entorno
  const API_URL = environment.serverApi;
  console.log(order);

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        <Image
          style={styles.image}
          source={{
            uri: `${API_URL}${order.product.main_image.url}`,
          }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
          {order.product.title}
        </Text>
        <Text>Cantidad : {order.quantity}</Text>
        <Text>Precio : $ {order.productsPayment / order.quantity}</Text>
        <Text>Total pagado: $ {order.productsPayment} </Text>
        <Text>
          Dirección de envio:{" "}
          {`${order.addressShipping.country}, ${order.addressShipping.state}, ${order.addressShipping.address}`}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    marginLeft: "5%",
    marginRight: "5%",
    borderBottomWidth: 0.5,
    borderColor: color.colorGlobal,
    flexDirection: "row",
  },
  containerImage: {
    width: "35%",
    height: 110,
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    width: "65%",
    justifyContent: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
