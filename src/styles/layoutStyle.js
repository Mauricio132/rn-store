import { StyleSheet } from "react-native";
import color from "./color";

const layoutStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  imageLogo: {
    width: "100%",
    height: 120,
    resizeMode: "center",
    marginBottom: 20,
  },
  tabNavigator: {
    backgroundColor: color.colorGlobal,
    padding: 1,
  },
  lineDivisor: {
    borderBottomColor: color.secondary,
    borderBottomWidth: 1,
    marginRight: "5%",
    marginLeft: "5%",
  },
});

export default layoutStyle;
