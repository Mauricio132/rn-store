import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as Yup from "yup";
import { useFormik } from "formik";
import { formStyle } from "../../styles";
import { registerApi } from "../services/AuthService";
import { showToastShort } from "../../shared/ToastCustom";

export default function RegisterForm(props) {
  //props enviados
  const { setShowLogin } = props;
  ///estado spinner de carga
  const [loading, setLoading] = useState(false);
  //estado mostrar password
  const [showPassword, setShowPassword] = useState(false);
  //funcion mostrar componente(screen) Login/Register
  const showLogin = () => setShowLogin((prevState) => !prevState);
  //validar formulario login
  const formik = useFormik({
    //iniciar valores
    initialValues: initialValues(),
    //validar, esquema yup
    validationSchema: Yup.object(validationSchema()),
    //cuando se presiona btn Registrarse
    onSubmit: async (formData) => {
      //mostrar spinner de carga
      setLoading(true);
      try {
        console.log(formData);
        const response = await registerApi(formData);
        if (response.statusCode) {
          showToastShort("Email or user name already taken");
          setLoading(false);
        } else {
          showLogin();
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
        onChangeText={(text) => formik.setFieldValue("email", text)}
        value={formik.values.email}
        error={formik.errors.email}
        autoCapitalize="none"
      />
      <TextInput
        label="Nombre de usuario"
        style={formStyle.input}
        onChangeText={(text) => formik.setFieldValue("username", text)}
        value={formik.values.username}
        error={formik.errors.username}
      />
      <TextInput
        style={formStyle.input}
        label="Contraseña"
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
      <TextInput
        style={formStyle.input}
        label="Repetir contraseña"
        secureTextEntry={!showPassword}
        right={
          <TextInput.Icon
            name={showPassword ? "eye" : "eye-off"}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        onChangeText={(text) => formik.setFieldValue("repeatPassword", text)}
        value={formik.values.repeatPassword}
        error={formik.errors.repeatPassword}
      />
      <Button
        mode="contained"
        style={[formStyle.btnSucces, styles.btnRadius]}
        onPress={formik.handleSubmit}
        loading={loading}
      >
        Registrarse
      </Button>
      <Button
        style={formStyle.btnText}
        labelStyle={formStyle.btnTextDark}
        mode="text"
        onPress={showLogin}
      >
        Iniciar Sesión
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
    email: "",
    username: "",
    password: "",
    repeatPassword: "",
  };
}

function validationSchema() {
  return {
    email: Yup.string().email().required(true),
    username: Yup.string().required(true),
    password: Yup.string().required(true),
    repeatPassword: Yup.string()
      .required(true)
      .oneOf([Yup.ref("password")], true),
  };
}
