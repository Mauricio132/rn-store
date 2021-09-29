import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { showToastShort } from "../../shared/ToastCustom";
import StatusBarCustom from "../../shared/StatusBarCustom";
import ScreenLoading from "../../shared/ScreenLoading";
import { updateUserApi } from "../services/AccountService";
import { getMeApi } from "../../auth/services/AuthService";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { formStyle } from "../../styles";

export default function AccountProfile() {
  //desestructuracion de AuthConteXT Service
  const { auth } = UseAuthContextService();
  //estado de pantalla de carga
  const [loading, setLoading] = useState(false);
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();

  //ejecucion de efecto secundario cuando la pantalla esta enfocada
  useFocusEffect(
    //devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado.
    useCallback(() => {
      //mostrando pantalla de carga
      setLoading(true);
      //funcion autoejecutable al server api
      (async () => {
        //obteniendo datos desde el server api
        const response = await getMeApi(auth.token);
        //asignando datos a cajas de texto
        await formik.setFieldValue("name", response.name);
        await formik.setFieldValue("lastname", response.lastname);
        await formik.setFieldValue("username", response.username);
        await formik.setFieldValue("email", response.email);
        //quitando pantalla de carga
        setLoading(false);
      })();
    }, []) // Solo se vuelve a ejecutar si [] cambia
  );

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
        //peticion de actualizacion de datos, al api server
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
      {loading ? (
        <ScreenLoading text={"cargando datos..."}></ScreenLoading>
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <TextInput
              label="Nombre"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("name", text)}
              value={formik.values.name}
              error={formik.errors.name}
            />
            <TextInput
              label="Apellidos"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("lastname", text)}
              value={formik.values.lastname}
              error={formik.errors.lastname}
            />
            <TextInput
              label="Nombre de usuario"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("username", text)}
              value={formik.values.username}
              error={formik.errors.username}
            />
            <TextInput
              label="Email"
              style={formStyle.input}
              autoCapitalize="none"
              onChangeText={(text) => formik.setFieldValue("email", text)}
              value={formik.values.email}
              error={formik.errors.email}
            />

            <Button
              mode="contained"
              style={formStyle.btnSucces}
              onPress={formik.handleSubmit}
            >
              Cambiar nombre de usuario
            </Button>
          </View>
        </ScrollView>
      )}
    </>
  );
}

function initialValues() {
  return {
    name: "",
    lastname: "",
    username: "",
    email: "",
  };
}

function validationSchema() {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required(true),
    username: Yup.string().min(4).required(true),
    email: Yup.string().email(true).required(true),
  };
}

var styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
