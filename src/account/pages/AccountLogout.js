import React from "react";
import { ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import StatusBarCustom from "../../shared/StatusBarCustom";
import UserInfo from "../components/UserInfo";
import Menu from "../components/Menu";
import { layoutStyle } from "../../styles/";

export default function AccountLogout() {
  return (
    <>
      <StatusBarCustom></StatusBarCustom>
      <ScrollView>
        <UserInfo></UserInfo>
        <Divider style={layoutStyle.lineDivisor} />
        <Menu></Menu>
      </ScrollView>
    </>
  );
}
