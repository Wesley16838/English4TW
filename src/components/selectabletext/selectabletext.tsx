import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import theme from "../../utils/theme.style";
import images from "../../assets/images";
export type Props = {
  customStyle: any;
  menu: any;
  value: any;
  outside: boolean;
  onPressOutside: any;
};
const SelectableText: React.FC<Props> = ({
  customStyle,
  menu,
  value,
  outside,
  onPressOutside,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const [menuPosition, setMenuPosition] = React.useState({
    tmpLocationX: 0,
    tmpLocationY: 0,
    locationX: 0,
    locationY: 0,
    px: 0,
    py: 0,
    height: 0,
    notchHeight: 0,
  });
  const [selected, setSelected] = React.useState({ start: 0, end: 0 });
  const [isMoving, setIsMoving] = React.useState(false);

  React.useEffect(() => {
    if (outside) {
      setMenuPosition({ ...menuPosition, height: 0, notchHeight: 0 });
      setSelected({ start: 0, end: 0 });
    }
  }, [outside]);

  return (
    <View
      style={{ position: "relative" }}
      onTouchStart={(e) => {}}
      onTouchMove={(e) => {}}
      onTouchEnd={(e) => {}}
    >
      <Text
        style={{
          fontSize: theme.FONT_SIZE_MEDIUM,
          fontWeight: "400",
          marginBottom: 6,
          lineHeight: 25,
        }}
        selectable={true}
      >
        {value}
      </Text>
    </View>
  );
};

export default SelectableText;
