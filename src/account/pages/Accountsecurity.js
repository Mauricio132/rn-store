import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToastShort } from "../../shared/ToastCustom";
import StatusBarCustom from "../../shared/StatusBarCustom";
import { updateUserApi } from "../services/AccountService";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { formStyle } from "../../styles/";

export default function AccountSecurity() {
  //desestructuracion de AuthConteXT Service
  const { auth } = UseAuthContextService();
  //estado de pantalla de carga
  const [loading, setLoading] = useState(false);
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();
  //estado mostrar password
  const [showPassword, setShowPassword] = useState(false);

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
      try {
        //peticion de actualizaciond de contraseña, al api server
        const response = await updateUserApi(auth, formData);
        //si el server responde con status!=200, mostrar mensaje de respuesta
        if (response.statusCode) {
          showToastShort(response.data[0].messages[0].message);
          setLoading(false);
        } else {
          //redireccion pantalla principal de cuenta
          navigation.goBack();
        }
      } catch (error) {
        showToastShort("Error al conectar el servidor, intentelo mas tarde");
      }
      setLoading(false);
    },
  });

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <View style={styles.container}>
        <TextInput
          label="Nueva contraseña"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("password", text)}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              name={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          value={formik.values.password}
          error={formik.errors.password}
        />
        <TextInput
          label="Repetir nueva contraseña"
          style={formStyle.input}
          onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              name={showPassword ? "eye" : "eye-off"}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />
        <Button
          mode="contained"
          style={formStyle.btnSucces}
          onPress={formik.handleSubmit}
          loading={loading}
        >
          Cambiar contraseña
        </Button>
      </View>
    </>
  );
}

function initialValues() {
  return {
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    password: Yup.string().min(4).required(true),
    repeatPassword: Yup.string()
      .min(4)
      .oneOf([Yup.ref("password")], true)
      .required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
