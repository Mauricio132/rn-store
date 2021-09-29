import React from "react";
import { StyleSheet, View, Text, Image, TextInput } from "react-native";
import { Button, IconButton } from "react-native-paper";
import { environment } from "../../environments/environment";
import {
  deleteProductCartApi,
  decreaseProductCartApi,
  increaseProductCartApi,
} from "../services/CartSservice";
import { color } from "../../styles/";

export default function ItemCard(props) {
  //props recibidos
  const { product, setReloadCart } = props;
  //url server
  const API_URL = environment.serverApi;

  //funcion, calcular precio
  const calcPrice = (price, discount) => {
    if (!discount) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  //funcion, eliminar producto de local storage
  const deleteProductCart = async () => {
    const response = await deleteProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  //funcion, decrementar cantidad del item
  const decreaseProductCart = async () => {
    const response = await decreaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  //funcion, incrementar cantidad del item
  const increaseProductCart = async () => {
    const response = await increaseProductCartApi(product._id);
    if (response) setReloadCart(true);
  };

  return (
    <View key={product._id} style={styles.product}>
      <View style={styles.containerImage}>
        {!product.main_image ? (
          <Image
            style={styles.imageNot}
            source={require("../../../assets/image-not-found.jpg")}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: `${API_URL}${product.main_image.url}`,
            }}
          />
        )}
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {calcPrice(product.price, product.discount)} $
            </Text>
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="minus"
              color="#fff"
              size={15}
              style={styles.btnQuantity}
              onPress={decreaseProductCart}
            />
            <TextInput
              value={product.quantity.toString()}
              style={styles.inputQuantity}
            />
            <IconButton
              icon="plus"
              color="#fff"
              size={15}
              style={styles.btnQuantity}
              onPress={increaseProductCart}
            />
          </View>
          <Button color="#b12704" mode="contained" onPress={deleteProductCart}>
            Eliminar
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    borderRadius: 1,
    borderWidth: 0.5,
    borderColor: color.secondary,
    marginStart: 10,
    marginEnd: 10,
  },
  containerImage: {
    width: "40%",
    height: 120,
    padding: 5,
    backgroundColor: color.white,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  imageNot: {
    width: "100%",
    height: "100%",
  },
  info: {
    padding: 10,
    width: "60%",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 15,
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 18,
    color: color.success,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  selectQuantity: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnQuantity: {
    backgroundColor: color.primary,
    borderRadius: 15,
    margin: 0,
  },
  inputQuantity: {
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
