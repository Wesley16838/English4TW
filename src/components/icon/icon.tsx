import React from "react";
import { StyleSheet, Image } from "react-native";
export type Props = {
  name: any;
  size: any;
  color: any;
};
const Icon: React.FC<Props> = ({ name, size, color }) => {
  const customStyle: Object = {
    resizeMode: "contain",
    height: size,
    width: size,
  };
  return <Image style={[customStyle]} source={name} />;
};
const styles = StyleSheet.create({});
export default Icon;
