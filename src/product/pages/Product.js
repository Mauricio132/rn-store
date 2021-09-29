import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import StatusBarCustom from "../../shared/StatusBarCustom";
import ScreenLoading from "../../shared/ScreenLoading";
import InfoPrice from "../components/InfoPrice";
import CarouselImage from "../components/CaruselImage";
import DropDowPicker from "../components/DropDowPicker";
import AddCart from "../components/AddCart";
import AddFavorite from "../components/AddFavorite";
import { getProductApi } from "../services/ProductService";
import { color } from "../../styles/";

export default function Product(props) {
  //props recibidos
  const { route } = props;
  //desestructuracion: campos del objeto producto
  const { params } = route;
  //objeto producto, inicializado como null
  const [product, setProduct] = useState(null);
  //arreglo de imagenes, inicializado con 0 elementos
  const [images, setImages] = useState([]);
  //valor por defecto de DropDownQuantity
  const [quantity, setQuantity] = useState(1);
  ////cantidades valor por defecto
  const valuesQuantity = [
    { label: "1", value: 1 },
    { label: "2", value: 2 },
    { label: "3", value: 3 },
    { label: "4", value: 4 },
    { label: "5", value: 5 },
  ];

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //funcion anonima autoejecutable de tipo async
    (async () => {
      //peticion y asignacion del producto especifico, al api server
      const response = await getProductApi(params.idProduct);
      setProduct(response);
      //arreglo de imagenes provisional, insertando imagen principal del producto
      const arrayImages = [response.main_image];
      //insertando imagenes secundarias del producto (quitando la referencia)
      arrayImages.push(...response.images);
      //asignando arreglo de imagenes
      setImages(arrayImages);
    })();
  }, [params]); // Solo se vuelve a ejecutar si [params] cambia de valor

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      {!product ? (
        <ScreenLoading text="Cargando producto..." size="large" />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={styles.container}
            nestedScrollEnabled={true}
          >
            <Text style={styles.title}> {product.title} </Text>
            <CarouselImage images={images}></CarouselImage>
            <InfoPrice
              price={product.price}
              discount={product.discount}
            ></InfoPrice>
            <DropDowPicker
              valuesQuantity={valuesQuantity}
              setQuantity={setQuantity}
              quantity={quantity}
            ></DropDowPicker>
            <AddFavorite product={product}></AddFavorite>
            <AddCart product={product} quantity={quantity}></AddCart>
          </ScrollView>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 50,
  },
  title: {
    fontWeight: "100",
    fontSize: 20,
    marginBottom: 5,
    marginTop: 10,
    textAlign: "center",
    color: color.colorGlobal,
  },
});
