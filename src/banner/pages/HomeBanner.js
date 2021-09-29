import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { size } from "lodash";
import { getBannersApi } from "../services/BannerService";
import { environment } from "../../environments/environment";

//obteniendo dimensiones de la patalla del dispositivo
const width = Dimensions.get("window").width;
//asigando alto del banner por defecto
const height = 175;

export default function HomeBanner() {
  //arreglo de banner, inicializado con 0 elementos
  const [banners, setBanners] = useState([]);
  //indice de banner activo inicializado en indice 0
  const [bannerActive, setBannerActive] = useState(0);
  //objeto router (navegacion entre rutas)
  const navigation = useNavigation();
  //api server (url server)
  const API_URL = environment.serverApi;
  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //funcion anonima autoejecutable de tipo async
    (async () => {
      //peticion y asignacion de los banners activos, al api server
      const response = await getBannersApi();
      setBanners(response);
    })();
  }, []); // Solo se vuelve a ejecutar si [] cambia

  //funcion que genera item del banner
  const renderItem = ({ item }) => {
    return (
      <TouchableWithoutFeedback onPress={() => goToProduct(item.product._id)}>
        <Image
          style={styles.carousel}
          source={{ uri: `${API_URL}${item.banner.url}` }}
        />
      </TouchableWithoutFeedback>
    );
  };

  //funcion que redirecciona a pantalla del producto
  const goToProduct = (id) => {
    //navigation.push("product", { idProduct: id });
    navigation.navigate("product", { idProduct: id });
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout={"default"}
        data={banners}
        sliderWidth={width}
        itemWidth={width}
        renderItem={renderItem}
        onSnapToItem={(index) => setBannerActive(index)}
      />
      <Pagination
        dotsLength={size(banners)}
        activeDotIndex={bannerActive}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.9}
        containerStyle={styles.pagination}
        dotStyle={styles.paginationColor}
        inactiveDotStyle={styles.paginationColor}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  carousel: {
    width,
    height,
  },
  pagination: {
    position: "absolute",
    bottom: -20,
    width: "100%",
  },
  paginationColor: {
    backgroundColor: "#fff",
  },
});
