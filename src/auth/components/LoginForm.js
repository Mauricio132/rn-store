import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as Yup from "yup";
import { useFormik } from "formik";
import UseAuthContextService from "../services/UseAuthContextService";
import { loginApi } from "../services/AuthService";
import { showToastShort } from "../../shared/ToastCustom";
import { formStyle, color } from "../../styles";

export default function LoginForm(props) {
  //props enviados
  const { setShowLogin } = props;
  //desestructuracion AuthContext, funcion login (asignar jwt)
  const { login, stateShowScreenAuth } = UseAuthContextService();
  //estado spinner de carga
  const [loading, setLoading] = useState(false);
  //estado mostrar password
  const [showPassword, setShowPassword] = useState(false);

  //funcion mostrar componente(screen) Login/Register
  const showRegister = () => setShowLogin((prevState) => !prevState);

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
        //peticion de logueo, al api server
        const response = await loginApi(formData);
        //si el server responde con status!=200, mostrar mensaje de respuesta
        if (response.statusCode) {
          showToastShort(response.data[0].messages[0].message);
          setLoading(false);
        } else {
          //asignacion del objeto auth (usuario logueado)
          login(response);
          //redirigir a pantalla de incio de app
          stateShowScreenAuth(false);
        }
      } catch (error) {
        showToastShort("Error al conectar el servidor, intentelo mas tarde");
        setLoading(false);
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Email"
        style={formStyle.input}
        theme={{ colors: { primary: color.formInput } }}
        autoCapitalize="none"
        onChangeText={(text) => formik.setFieldValue("identifier", text)}
        value={formik.values.identifier}
        error={formik.errors.identifier}
      />
      <TextInput
        label="Contraseña"
        style={formStyle.input}
        theme={{ colors: { primary: color.formInput } }}
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            name={showPassword ? "eye" : "eye-off"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(text) => formik.setFieldValue("password", text)}
        value={formik.values.password}
        error={formik.errors.password}
      />
      <Button
        mode="contained"
        style={[formStyle.btnSucces, styles.btnRadius]}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Ingresar
      </Button>
      <Button
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextInfo}
        mode="text"
        onPress={showRegister}
      >
        Registrarse
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  btnRadius: {
    borderRadius: 50,
  },
});

function initialValues() {
  return {
    identifier: "",
    password: "",
  };
}

function validationSchema() {
  return {
    identifier: Yup.string().required(true),
    password: Yup.string().required(true),
  };
}
