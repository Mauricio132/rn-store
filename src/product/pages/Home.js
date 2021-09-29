import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Dimensions } from "react-native";
import StatusBarCustom from "../../shared/StatusBarCustom";
import HomeBanner from "../../banner/pages/HomeBanner";
import SearchBarCustom from "../../search/components/SearchBarCustom";
import HomeProduct from "../components/HomeProduct";
import { color } from "../../styles/";

export default function Home() {
  //variable de estado, busqueda activa
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <ScrollView style={styles.container}>
        <SearchBarCustom setSearchActive={setSearchActive}></SearchBarCustom>
        {searchActive ? (
          <View
            style={{
              height: Dimensions.get("window").height,
            }}
          ></View>
        ) : (
          <>
            <HomeBanner></HomeBanner>
            <HomeProduct></HomeProduct>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white,
  },
});
