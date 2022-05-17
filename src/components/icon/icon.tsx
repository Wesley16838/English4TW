import React from "react";
import { Image } from "react-native";
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
export default Icon;
