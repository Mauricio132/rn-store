import React, { useState, useCallback } from "react";
import { ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import { useFocusEffect } from "@react-navigation/native";
import StatusBarCustom from "../../shared/StatusBarCustom";
import UserInfo from "../components/UserInfo";
import Menu from "../components/Menu";
import ScreenLoading from "../../shared/ScreenLoading";
import { getMeApi } from "../../auth/services/AuthService";
import UseAuthContextService from "../../auth/services/UseAuthContextService";
import { layoutStyle } from "../../styles/";

export default function Account() {
  //estado informacion de usuario, inicalizado como null
  const [userInfo, setUserInfo] = useState(null);
  //destructuracion de AuthContext
  const { auth } = UseAuthContextService();

  //hook de efecto secundario cuando la pantalla esta enfocada
  useFocusEffect(
    //devolverá una versión memorizada del callback que solo cambia si una de las dependencias ha cambiado.
    useCallback(() => {
      (async () => {
        //peticion deinformacion de usuario al api serve
        const response = await getMeApi(auth.token);
        //asiganar informacion de usuario al objeto userInfo
        setUserInfo(response);
      })();
    }, []) // Solo se vuelve a ejecutar si [] cambia
  );

  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      {!userInfo ? (
        <ScreenLoading size="large" />
      ) : (
        <>
          <ScrollView>
            <UserInfo userInfo={userInfo}></UserInfo>
            <Divider style={layoutStyle.lineDivisor} />
            <Menu></Menu>
          </ScrollView>
        </>
      )}
    </>
  );
}
