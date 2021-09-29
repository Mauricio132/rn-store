import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { Button, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { environment } from "../../environments/environment";
import { deleteFavoriteApi } from "../services/FavoriteService";
import { color } from "../../styles/";

export default function ItemFavorite(props) {
  //props recibidos
  const { item, auth, setReloadFavorite } = props;
  //estado spinner de carga
  const [loading, setLoading] = useState(false);
  //objeto de rutas
  const navigation = useNavigation();
  //desestructuracion de variables globales
  const API_URL = environment.serverApi;

  //funcion precio y descuento
  const calcPrice = (price, discount) => {
    if (discount === 0) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  //funcion navegar a pantalla producto
  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  //funcion eleminar favorito de lista, peticion a api server
  const deleteFavorite = async (id) => {
    setLoading(true);
    await deleteFavoriteApi(auth, id);
    setReloadFavorite(true);
    setLoading(false);
  };

  //funcion eliminar producto de lista IU
  const deleteFavoriteIU = () => {
    Alert.alert(
      "Eliminar Favorito",
      "¿Estas seguro de que quieres eliminar este producto de su lista de favorito?",
      [
        {
          text: "NO",
        },
        { text: "SI", onPress: () => deleteFavorite(item.product._id) },
      ],
      { cancelable: false }
    );
  };

  return (
    <View key={item._id} style={styles.product}>
      <View style={styles.containerImage}>
        {!item.product.main_image ? (
          <Image
            style={styles.imageNot}
            source={require("../../../assets/image-not-found.jpg")}
          />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: `${API_URL}${item.product.main_image.url}`,
            }}
          />
        )}
      </View>

      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {item.product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {calcPrice(item.product.price, item.product.discount)} €
            </Text>
            {item.product.discount === 0 && (
              <Text style={styles.oldPrice}>{item.product.price} $</Text>
            )}
          </View>
        </View>
        <View style={styles.btnsContainer}>
          <Button
            style={styles.btnViewIten}
            icon="eye"
            size={15}
            color={color.primary}
            mode="contained"
            onPress={() => goToProduct(item.product._id)}
          >
            Ver producto
          </Button>
          <IconButton
            icon="close"
            color={color.white}
            size={15}
            style={styles.btnDelete}
            onPress={deleteFavoriteIU}
          />
        </View>
      </View>

      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  product: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    padding: 5,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: color.secondary,
  },
  containerImage: {
    width: "30%",
    height: 125,
    backgroundColor: color.white,
    padding: 1,
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
    width: "70%",
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
    fontSize: 22,
  },
  oldPrice: {
    marginLeft: 7,
    fontSize: 14,
    color: "#747474",
    textDecorationLine: "line-through",
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    position: "relative",
    width: "100%",
  },
  btnViewIten: {
    backgroundColor: color.primary,
    borderRadius: 5,
    margin: 0,
    width: "70%",
    height: 32,
  },
  btnDelete: {
    backgroundColor: color.danger,
    borderRadius: 5,
    margin: 0,
    width: "25%",
    height: 32,
  },
  loading: {
    backgroundColor: "#000",
    opacity: 0.4,
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 5,
    justifyContent: "center",
  },
});
