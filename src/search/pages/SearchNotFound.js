import React from "react";
import { StyleSheet, View, Text } from "react-native";

export default function SearchNotFound(props) {
  //props recibidos
  const { search } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>No hay resultados para {search}.</Text>
      <Text style={styles.otherText}>
        Revisa la ortigrafía o usa términos más generales.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  searchText: {
    fontSize: 20,
    fontWeight: "100",
  },
  otherText: {
    fontSize: 15,
    paddingTop: 5,
  },
});
