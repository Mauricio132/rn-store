import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import { size } from "lodash";
import { useNavigation } from "@react-navigation/native";
import { paymentCartApi, deleteCartApi } from "../services/CartSservice";
import { showToastShort } from "../../shared/ToastCustom";
import AuthContextService from "../../auth/services/UseAuthContextService";
import { environment } from "../../environments/environment";
import { color, formStyle } from "../../styles/";

//requerido
const stripe = require("stripe-client")(environment.strapiPublishableKey);

export default function Payment(props) {
  //props recibidos
  const { totalPayment, selectedAddress, products } = props;
  //estado spinner de carga
  const [loading, setLoading] = useState(false);
  //destructuracion de AuthContext
  const { auth } = AuthContextService();
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();

  //validar formulario
  const formik = useFormik({
    //iniciar valores
    initialValues: initialValues(),
    //validar esquema yup
    validationSchema: Yup.object(validationSchema()),
    //cuando se presiona btn
    onSubmit: async (formData) => {
      //mostrar pantalla de carga
      setLoading(true);
      //validacion api stripe(pagos en linea, ambiente de desarrollo)
      const result = await stripe.createToken({ card: formData });

      if (result?.error) {
        //mostrar mensaje de error
        showToastShort(result.error.message);
        setLoading(false);
      } else {
        //iniciando pago en linea
        const response = await paymentCartApi(
          auth,
          result.id,
          products,
          selectedAddress
        );

        if (size(response) > 0) {
          //elimnando roductos pagados del carrito
          await deleteCartApi();
          //redireccion a ?
          navigation.navigate("account", { screen: "orders" });
        } else {
          showToastShort("Error al realizar el pedido");
          setLoading(false);
        }
      }
    },
  });

  return (
    <View style={styles.continer}>
      <Text style={styles.containerTitle}>Forma de pago</Text>
      <TextInput
        label="Nombre de la tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("name", text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label="Numero de tarjeta"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("number", text)}
        value={formik.values.number}
        error={formik.errors.number}
        keyboardType={"phone-pad"}
      />
      <View style={styles.containerInputs}>
        <View style={styles.containerMonthYearInputs}>
          <TextInput
            label="Mes"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_month", text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
            keyboardType={"phone-pad"}
          />
          <TextInput
            label="Año"
            style={styles.inputDate}
            onChangeText={(text) => formik.setFieldValue("exp_year", text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
            keyboardType={"phone-pad"}
          />
        </View>
        <TextInput
          label="CVV/CVC"
          style={styles.inputCvc}
          onChangeText={(text) => formik.setFieldValue("cvc", text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
          keyboardType={"phone-pad"}
        />
      </View>

      <Button
        mode="contained"
        contentStyle={styles.btnContent}
        labelStyle={styles.btnText}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Pagar {totalPayment && `(${totalPayment} $)`}
      </Button>
    </View>
  );
}

function initialValues() {
  return {
    number: "",
    exp_month: "",
    exp_year: "",
    cvc: "",
    name: "",
  };
}

function validationSchema() {
  return {
    number: Yup.string().min(16).max(16).required(true),
    exp_month: Yup.string().min(2).max(2).required(true),
    exp_year: Yup.string().min(2).max(2).required(true),
    cvc: Yup.string().min(3).max(3).required(true),
    name: Yup.string().min(6).required(true),
  };
}

const styles = StyleSheet.create({
  continer: {
    marginTop: 40,
    marginBottom: 30,
  },
  containerTitle: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  containerInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  inputCvc: {
    width: "40%",
  },
  containerMonthYearInputs: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputDate: {
    width: 100,
    marginRight: 10,
  },
  btnContent: {
    paddingVertical: 4,
    backgroundColor: color.primary,
  },
  btnText: {
    fontSize: 16,
  },
});
