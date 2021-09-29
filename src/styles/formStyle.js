import { StyleSheet } from "react-native";
import color from "./color";

const formStyle = StyleSheet.create({
  input: {
    marginBottom: 15,
  },
  btnSucces: {
    padding: 5,
    backgroundColor: color.success,
  },
  btnText: {
    marginTop: 10,
  },
  btnTextDark: {
    color: color.dark,
  },
  btnTextInfo: {
    color: color.primary,
  },
});

export default formStyle;
