import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { size } from "lodash";
import AuthContextService from "../../auth/services/UseAuthContextService";
import {
  addFavoriteApi,
  isFavoriteApi,
  deleteFavoriteApi,
} from "../../favorite/services/FavoriteService";
import { color } from "../../styles/";

export default function Actions(props) {
  //props enviados
  const { product } = props;
  //desestructuracion de AuthContextService
  const { auth } = AuthContextService();
  //estado, permite saber si el producto esta add a favorite
  const [isFavorite, setIsFavorite] = useState(false);
  //estado spinner loading
  const [loading, setLoading] = useState(false);
  //
  const [reloadFavorite, setReloadFavorite] = useState(false);

  useEffect(() => {
    if (auth != null) {
      (async () => {
        const response = await isFavoriteApi(auth, product._id);
        if (size(response) === 0) setIsFavorite(false);
        else setIsFavorite(true);

        setReloadFavorite(false);
        setLoading(false);
      })();
    }
  }, [product, reloadFavorite]);

  const addFavorite = async () => {
    if (!loading) {
      setLoading(true);
      await addFavoriteApi(auth, product._id);
      setReloadFavorite(true);
    }
  };

  const deleteFavorite = async () => {
    if (!loading) {
      setLoading(true);
      await deleteFavoriteApi(auth, product._id);
      setReloadFavorite(true);
    }
  };

  return (
    <Button
      mode="contained"
      disabled={auth ? false : true}
      style={styles.btn}
      contentStyle={
        isFavorite
          ? styles.btnDeleteFavoritesContent
          : styles.btnAddFavoritesContent
      }
      labelStyle={styles.btnLabel}
      onPress={isFavorite ? deleteFavorite : addFavorite}
      loading={loading}
    >
      {isFavorite ? "Eliminar de favoritos" : "Añadir a favoritos"}
    </Button>
  );
}

const styles = StyleSheet.create({
  btnLabel: {
    fontSize: 15,
  },
  btnAddFavoritesContent: {
    backgroundColor: color.success,
    paddingVertical: 1,
  },
  btnDeleteFavoritesContent: {
    backgroundColor: color.danger,
    paddingVertical: 1,
  },
  btn: {
    margin: 5,
    zIndex: 1,
  },
});
