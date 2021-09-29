import React, { useState, useCallback } from "react";
import { StyleSheet, View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { size } from "lodash";
import StatusBarCustom from "../../shared/StatusBarCustom";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import ScreenLoading from "../../shared/ScreenLoading";
import FavoriteList from "../components/ListFavorite";
import { getFavoriteApi } from "../services/FavoriteService";

import { layoutStyle } from "../../styles/";

export default function Favorite(props) {
  //props recibidos
  const { auth } = props;
  //estado de arreglo lista de favoritos inicializaco con 0 elementos
  const [listFavorite, setlistFavorite] = useState([]);
  //estado spinner loading lista de favoritos
  const [loading, setLoading] = useState(true);
  //estado recargar lista de favorito
  const [reloadFavorite, setReloadFavorite] = useState(false);

  //ejecucion de efecto secundario cuando la pantalla esta enfocada
  useFocusEffect(
    //devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado.
    useCallback(() => {
      //cambiando estado loading (muestra pantalla de carga)
      setLoading(true);
      //funcion autoejecutable al server api
      (async () => {
        //obteniendo lista de favoritos al server api
        const response = await getFavoriteApi(auth);
        //asignando lista a estado listFavorite
        setlistFavorite(response);
        //una vez obtenido la lista de favritos quitamos pantalla de carga
        setLoading(false);
      })();
    }, [reloadFavorite]) // Solo se vuelve a ejecutar si [reloadFavorite] cambia su estado booleano
  );

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      {loading ? (
        <ScreenLoading></ScreenLoading>
      ) : listFavorite.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de favoritos</Text>
          <Text>No tienes productos en tu lista</Text>
        </View>
      ) : (
        <FavoriteList
          products={listFavorite}
          auth={auth}
          setReloadFavorite={setReloadFavorite}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 19,
    marginBottom: 5,
  },
});
