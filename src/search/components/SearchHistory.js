import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
import AwesomeIcon from "react-native-vector-icons/FontAwesome";
import { map } from "lodash";
import { getSearchHistory } from "../services/SearchService";
import { color } from "../../styles/";

export default function SearchHistory(props) {
  //props recibidos
  const { showHistory, containerHeight, onSearch } = props;
  //variable de estado, lista de busquedas
  const [history, setHistory] = useState([]);

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //if show history es true, obtenemos historial de busqueda desde el localStorage
    if (showHistory) {
      //funcion anonima autoejecutable de tipo async
      (async () => {
        const response = await getSearchHistory();
        setHistory(response);
      })();
    }
  }, [showHistory]); // Solo se vuelve a ejecutar si [showHistory] cambia

  return (
    <View
      style={[
        showHistory ? styles.history : styles.hidden,
        { top: containerHeight },
      ]}
    >
      {history &&
        map(history, (item, index) => (
          <TouchableNativeFeedback
            key={index}
            onPress={() => onSearch(item.search)}
          >
            <View style={styles.historyItem}>
              <Text style={styles.text}>{item.search} </Text>
              <AwesomeIcon name="arrow-right" size={18} />
            </View>
          </TouchableNativeFeedback>
        ))}
    </View>
  );
}

const styles = StyleSheet.create({
  hidden: {
    display: "none",
  },
  history: {
    position: "absolute",
    backgroundColor: color.white,
    width: Dimensions.get("window").width,
  },
  historyItem: {
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderWidth: 0.3,
    borderTopWidth: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    color: color.colorGlobal,
    fontSize: 18,
    fontWeight: "bold",
  },
});
