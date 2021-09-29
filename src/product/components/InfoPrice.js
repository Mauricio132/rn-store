import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { color } from "../../styles/";

export default function InfoPrice(props) {
  //props recibidos desde el padre
  const { price, discount } = props;

  //funcion, calcula precio
  const calcPrice = (price, discount) => {
    if (discount === 0) return price;

    const discountAmount = (price * discount) / 100;
    return (price - discountAmount).toFixed(2);
  };

  //funcion, calcula descuento
  const calcDesc = (price, discount) => {
    if (discount === 0) return price;

    return ((price * discount) / 100).toFixed(2);
  };

  return (
    <View style={styles.prices}>
      {discount > 0 && (
        <View style={styles.conatinerData}>
          <Text style={styles.dataText}>Precio recomendado:</Text>
          <Text style={[styles.dataValue, styles.oldPrice]}>{price} $</Text>
        </View>
      )}

      <View style={styles.conatinerData}>
        <Text style={styles.dataText}>
          {discount > 0 ? "Oferta Top:" : "Precio recomendado:"}
        </Text>
        <Text style={[styles.dataValue, styles.currentPrice]}>
          {calcPrice(price, discount)} $
        </Text>
      </View>

      {discount > 0 && (
        <View style={styles.conatinerData}>
          <Text style={styles.dataText}>Ahorras:</Text>
          <Text style={[styles.dataValue, styles.saving]}>
            {calcDesc(price, discount)} $ ({discount}%)
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  prices: {
    margin: 5,
  },
  conatinerData: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
  },
  dataText: {
    width: "45%",
    fontSize: 18,
    color: color.colorGlobal,
    textAlign: "right",
  },
  dataValue: {
    width: "55%",
    fontSize: 18,
    paddingLeft: 5,
  },
  oldPrice: {
    textDecorationLine: "line-through",
    color: color.danger,
  },
  currentPrice: {
    fontSize: 23,
    color: color.success,
  },
  saving: {
    color: color.dark,
  },
});
