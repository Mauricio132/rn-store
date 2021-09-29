import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { useFormik } from "formik";
import * as Yup from "yup";
import StatusBarCustom from "../../shared/StatusBarCustom";
import ScreenLoading from "../../shared/ScreenLoading";
import {
  addAddressApi,
  getAddressApi,
  updateAddressApi,
} from "../services/AccountAddressService";
import { showToastShort } from "../../shared/ToastCustom";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { color, formStyle } from "../../styles/";

export default function AccountAddAddress(props) {
  //props recibidos
  const {
    route: { params },
  } = props;
  //estado de pantalla de carga
  const [loading, setLoading] = useState(false);
  //estado actualizar(false)/agregar(true) direccion
  const [newAddress, setNewAddress] = useState(true);
  //desestructuracion de AuthConteXT Service
  const { auth } = UseAuthContextService();
  //instancia de objeto de navegacion (rutas/screen)
  const navigation = useNavigation();

  //hook de efecto (se ejecuta despues de renderizarse/actualizar el componente)
  useEffect(() => {
    //funcion anonima autoejecutable de tipo async
    (async () => {
      //condicion si existe el parametro idAddress (cargar datos de direccion)
      if (params?.idAddress) {
        //mostrar pantalla cargando
        setLoading(true);
        //peticion y asignacion de datos, desde el api server
        const response = await getAddressApi(auth, params.idAddress);
        await formik.setFieldValue("_id", response._id);
        await formik.setFieldValue("title", response.title);
        await formik.setFieldValue("name_lastname", response.name_lastname);
        await formik.setFieldValue("address", response.address);
        await formik.setFieldValue("postal_code", response.postal_code);
        await formik.setFieldValue("city", response.city);
        await formik.setFieldValue("state", response.state);
        await formik.setFieldValue("country", response.country);
        await formik.setFieldValue("phone", response.phone);
        //estado actualizar/agregar direccion
        setNewAddress(false);
        //quitar pantalla cargando
        setLoading(false);
      }
    })();
  }, [params]); // Solo se vuelve a ejecutar si [params] cambia

  const responseServe = (newAddress, auth, formData) => {
    // estado crear nueva direccion
    if (newAddress) return addAddressApi(auth, formData);
    // estado actualizar direccion
    return updateAddressApi(auth, formData);
  };

  //validar formulario login
  const formik = useFormik({
    //iniciar valores
    initialValues: initialValues(),
    //validar esquema yup
    validationSchema: Yup.object(validationSchema()),
    //cuando se presiona btn ingresar
    onSubmit: async (formData) => {
      //mostrar spinner de carga
      setLoading(true);
      try {
        //peticion, al api server
        const response = await responseServe(newAddress, auth, formData);
        //si el server responde con status!=200, mostrar mensaje de respuesta
        if (response.statusCode) {
          showToastShort(response.data[0].messages[0].message);
          setLoading(false);
        } else {
          //redireccion pantalla anterior
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
        <KeyboardAwareScrollView extraScrollHeight={25}>
          <View style={styles.container}>
            <Text style={styles.title}>
              {newAddress ? "Crear Dirección" : "Actualizar Dirección"}
            </Text>
            <TextInput
              label="Titulo"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("title", text)}
              value={formik.values.title}
              error={formik.errors.title}
            />
            <TextInput
              label="Nombre y apellidos"
              style={formStyle.input}
              onChangeText={(text) =>
                formik.setFieldValue("name_lastname", text)
              }
              value={formik.values.name_lastname}
              error={formik.errors.name_lastname}
            />
            <TextInput
              label="Dirección"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("address", text)}
              value={formik.values.address}
              error={formik.errors.address}
            />
            <TextInput
              label="Codigo Postal"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("postal_code", text)}
              value={formik.values.postal_code}
              error={formik.errors.postal_code}
            />
            <TextInput
              label="Ciudad"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("city", text)}
              value={formik.values.city}
              error={formik.errors.city}
            />
            <TextInput
              label="Provincia"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("state", text)}
              value={formik.values.state}
              error={formik.errors.state}
            />
            <TextInput
              label="Pais"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("country", text)}
              value={formik.values.country}
              error={formik.errors.country}
            />
            <TextInput
              label="Telefono"
              style={formStyle.input}
              onChangeText={(text) => formik.setFieldValue("phone", text)}
              value={formik.values.phone}
              error={formik.errors.phone}
              keyboardType="number-pad"
            />
            <Button
              mode="contained"
              style={[formStyle.btnSucces, styles.btnSucces]}
              onPress={formik.handleSubmit}
              loading={loading}
            >
              {newAddress ? "Crear dirección" : "Actualizar dirección"}
            </Button>
          </View>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

var styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  btnSucces: {
    marginBottom: 20,
  },

  title: {
    padding: 10,
    fontWeight: "bold",
    fontSize: 20,
    alignItems: "flex-start",
    color: color.colorGlobal,
  },
  keyboard: { flex: 1, flexDirection: "column", justifyContent: "center" },
});

function initialValues() {
  return {
    title: "",
    name_lastname: "",
    address: "",
    postal_code: "",
    city: "",
    state: "",
    country: "",
    phone: "",
  };
}

function validationSchema() {
  return {
    title: Yup.string().required(true),
    name_lastname: Yup.string().required(true),
    address: Yup.string().required(true),
    postal_code: Yup.string().required(true),
    city: Yup.string().required(true),
    state: Yup.string().required(true),
    country: Yup.string().required(true),
    phone: Yup.string().required(true),
  };
}
