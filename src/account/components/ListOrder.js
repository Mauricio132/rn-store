import React from "react";
import { View } from "react-native";
import { map } from "lodash";
import OrderItem from "./OrderItem";

export default function ListOrder(props) {
  //props recibidos desde componente padre
  const { orders } = props;

  return (
    <View>
      {map(orders, (order) => (
        <OrderItem key={order._id} order={order} />
      ))}
    </View>
  );
}
