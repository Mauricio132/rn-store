import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { color } from "../../styles/";
import { environment } from "../../environments/environment";

export default function CardProduct(props) {
  //props recibidos
  const { productItem } = props;
  //objeto router (navegacion entre rutas)
  const navigation = useNavigation();
  //api server (url server)
  const API_URL = environment.serverApi;
  //funcion redireccionamiento a pantalla del producto
  const goToProduct = (id) => {
    navigation.navigate("product", { idProduct: id });
  };

  return (
    <>
      <TouchableWithoutFeedback
        key={productItem._id}
        onPress={() => goToProduct(productItem._id)}
      >
        <View style={styles.containerProduct}>
          <View style={styles.product}>
            {!productItem.main_image ? (
              <Image
                style={styles.imageNot}
                source={require("../../../assets/image-not-found.jpg")}
              />
            ) : (
              <Image
                style={styles.image}
                source={{
                  uri: `${API_URL}${productItem.main_image.url}`,
                }}
              />
            )}

            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {productItem.title}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  containerProduct: {
    width: "50%",
    padding: 5,
  },
  product: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.secondary,
  },
  image: {
    height: 150,
    resizeMode: "contain",
  },
  imageNot: {
    width: "100%",
    height: 150,
  },
  name: {
    fontSize: 17,
    color: color.colorGlobal,
  },
});
