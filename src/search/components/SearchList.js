import React from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Button } from "react-native-paper";
import { map } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { environment } from "../../environments/environment";
import { color } from "../../styles/";

export default function SearchList(props) {
  const { products } = props;
  const navigation = useNavigation();

  const API_URL = environment.serverApi;

  const calcPrice = (price, discount) => {
    if (discount === 0) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      {map(products, (product) => (
        <TouchableWithoutFeedback
          key={product._id}
          onPress={() => goToProduct(product._id)}
        >
          <View style={styles.product}>
            <View style={styles.containerImage}>
              <Image
                style={styles.image}
                source={{
                  uri: `${API_URL}${product.main_image.url}`,
                }}
              />
            </View>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                {product.title}
              </Text>
              <View style={styles.prices}>
                <Text style={styles.currentPrice}>
                  {calcPrice(product.price, product.discount)} $
                </Text>
                {product.discount === 0 && (
                  <Text style={styles.oldPrice}>{product.price} $</Text>
                )}
              </View>
              <Button style={styles.btn} color={color.primary}>
                Ver producto
              </Button>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
  },
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: color.info,
  },
  containerImage: {
    width: "40%",
    height: 125,
    backgroundColor: color.white,
    borderRadius: 10,
    padding: 5,
  },
  image: {
    height: "100%",
    resizeMode: "contain",
  },
  info: {
    padding: 10,
    width: "60%",
  },
  name: {
    fontSize: 15,
    color: color.colorGlobal,
  },
  prices: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "flex-end",
  },
  currentPrice: {
    fontSize: 22,
    color: color.success,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: color.danger,
    textDecorationLine: "line-through",
  },
  btn: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
  },
});
