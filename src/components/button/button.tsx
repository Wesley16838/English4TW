import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
} from "react-native";
import { Colors } from "../../styles";
import IButton from "../../types/components/button";

export const getButtonStyle = (type: string, status: any) => {
  switch (type) {
    case "1":
      if (status) {
        return {
          backgroundColor: Colors.button_secondary_press,
          borderColor: Colors.button_secondary_press,
        };
      } else {
        return {
          backgroundColor: Colors.secondary,
          borderColor: Colors.secondary,
        };
      }
    case "2":
      if (status) {
        return {
          backgroundColor: Colors.button_primary_press,
          borderColor: Colors.button_primary_press,
        };
      } else {
        return {
          backgroundColor: Colors.primary,
          borderColor: Colors.primary,
        };
      }
    case "facebook":
      if (status) {
        return {
          backgroundColor: Colors.facebook_color_press,
          borderColor: Colors.facebook_color_press,
        };
      } else {
        return {
          backgroundColor: Colors.facebook_color,
          borderColor: Colors.facebook_color,
        };
      }
    case "text":
      return null
    default:
      return {
        backgroundColor: Colors.transparent,
      };
  }
};
const Button: React.FC<IButton> = ({
  title,
  onPress,
  customStyle,
  type,
  image,
  imageSize,
  fontStyle,
}) => {
  const [status, setStatus] = React.useState({
    hover: false,
  });
  return (
    <TouchableWithoutFeedback
      accessible={true}
      accessibilityLabel={title}
      accessibilityHint={title}
      onPress={onPress}
      onPressIn={() => setStatus({ hover: true })}
      onPressOut={() => setStatus({ hover: false })}
    >
      <View
        style={[getButtonStyle(type, status.hover), customStyle, styles.button]}
      >
        {(image && imageSize) && <Image
            style={{
              width: imageSize.width,
              height: imageSize.height,
              marginRight: imageSize.marginRight || 0,
              resizeMode: "contain",
            }}
            source={image}
          />}
        { !!title && <Text style={[styles.buttonText, fontStyle]}>{title}</Text> }
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: Colors.white,
  },
  isDisable: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  isHover: {
    backgroundColor: Colors.button_secondary_press,
    borderColor: Colors.button_secondary_press,
  },
  isDefault: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
});
export default Button;
