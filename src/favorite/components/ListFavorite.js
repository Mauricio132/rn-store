import React from "react";
import { StyleSheet, ScrollView, Text } from "react-native";
import { map } from "lodash";
import ItemFavorite from "./ItemFavorite";

export default function ListFavorite(props) {
  //props recibidos
  const { products, auth, setReloadFavorite } = props;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {map(products, (item) => (
        <ItemFavorite
          key={item._id}
          item={item}
          auth={auth}
          setReloadFavorite={setReloadFavorite}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
  },
});
