import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
} from "react-native";
import Images from "../../assets/images";
import { Colors, Typography } from "../../styles";
import ICheckbox from "../../types/components/checkbox";

const Checkbox: React.FC<ICheckbox> = ({
  title,
  checked,
  OnClick,
  customStyle,
}) => {
  const handleOnCheck = () => {
    if (OnClick) OnClick(!checked);
  };
  return (
    <View style={styles.container}>
      <Pressable style={[customStyle, styles.checkbox]} onPress={handleOnCheck}>
        {checked && (
          <Image
            source={Images.icons.checkbox_icon}
            style={styles.icon}
          />
        )}
      </Pressable>
      <Text
        style={[Typography.base, {color: Colors.primary}]}
      >
        {title}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 9,
  },
  icon: {
    width: 12,
    height: 10
  }
});
export default Checkbox;
