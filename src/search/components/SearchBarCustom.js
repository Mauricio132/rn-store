import React, { useState, useEffect } from "react";
import { View, StyleSheet, Keyboard, Animated } from "react-native";
import { Searchbar } from "react-native-paper";
import { useNavigation, useRoute } from "@react-navigation/native";
import SearchHistory from "../components/SearchHistory";
import {
  AnimatedIcon,
  arrowAnimation,
  inputAnimation,
  inputAnimationWidth,
  animatedTransition,
  animatedTransitionReset,
} from "./SearchAnimation";
import { updateSearchHistory } from "../services/SearchService";
import { color } from "../../styles";

export default function SearchBarCustom(props) {
  //props recibidos
  const { searchBarText, currentSearch, setSearchActive } = props;
  //variable de estado, alto de custom search
  const [containerHeight, setContainerHeight] = useState(0);
  //variable de estado buscar, si currentSearch(no existe) asigna cadena vacia ("")
  const [searchQuery, setSearchQuery] = useState(currentSearch || "");
  //variable de estado, mostrar historial
  const [showHistory, setShowHistory] = useState(false);
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();
  const route = useRoute();

  //cuando el valor de la busqueda cambia
  const onChangeSearch = (query) => setSearchQuery(query);

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    if (currentSearch !== searchQuery) setSearchQuery(currentSearch);
  }, [currentSearch]); // Solo se vuelve a ejecutar si [currentSearch] cambia

  //
  const openSearch = () => {
    //iniciamos animacion
    animatedTransition.start();
    //variable de estado mostra historial
    setShowHistory(!showHistory);
    //variable de estado, SearchBarCustom activo
    setSearchActive(true);
  };

  //
  const closeSearch = () => {
    setSearchQuery("");
    animatedTransitionReset.start();
    Keyboard.dismiss();
    setShowHistory(!showHistory);
    setSearchActive(false);
  };

  //
  const onSearch = async (reuseSearch) => {
    console.log(reuseSearch);

    const isReuse = typeof reuseSearch === "string";

    closeSearch();

    setSearchQuery("");
    !isReuse && (await updateSearchHistory(searchQuery));

    if (route.name === "search") {
      navigation.navigate("search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    } else {
      navigation.navigate("search", {
        search: isReuse ? reuseSearch : searchQuery,
      });
    }
  };

  return (
    <View
      style={styles.container}
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
    >
      <View style={styles.containerInput}>
        <AnimatedIcon
          name="arrow-left"
          size={18}
          style={[styles.backArrow, arrowAnimation]}
          onPress={closeSearch}
        />
        <Animated.View style={[inputAnimation, { width: inputAnimationWidth }]}>
          <Searchbar
            placeholder={searchBarText}
            onChangeText={onChangeSearch}
            value={searchQuery}
            onFocus={openSearch}
            onSubmitEditing={onSearch}
            clearIcon="eraser"
          />
        </Animated.View>
      </View>
      <SearchHistory
        showHistory={showHistory}
        containerHeight={containerHeight}
        onSearch={onSearch}
      ></SearchHistory>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: color.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 1,
  },
  containerInput: {
    position: "relative",
    alignItems: "flex-end",
  },
  backArrow: {
    position: "absolute",
    left: 0,
    top: "30%",
    color: color.white,
  },
});

SearchBarCustom.defaultProps = {
  searchBarText: "Buscar un producto...",
};
