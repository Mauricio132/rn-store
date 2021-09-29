import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { color } from "../../styles/";
import Home from "../../product/pages/Home";
import Product from "../../product/pages/Product";
import SearchFound from "../../search/pages/SearchFound";

const Stack = createStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: color.danger,
        headerStyle: { backgroundColor: color.danger },
        cardStyle: {
          backgroundColor: color.white,
        },
      }}
    >
      <Stack.Screen
        name="appHome"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="product"
        component={Product}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="search"
        component={SearchFound}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
