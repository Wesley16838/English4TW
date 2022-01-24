import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Image,
  View,
} from "react-native";
import theme from "../../utilities/theme.style";
export type Props = {
  title: any;
  onPress: any;
  customStyle: any;
  type: string;
  image: any;
  imageSize: any;
  fontStyle?: any;
};
export const getButtonStyle = (type: string, status: any) => {
  switch (type) {
    case "1":
      if (status) {
        return {
          backgroundColor: theme.SECONDARY_COLOR_PRESS,
          borderColor: theme.SECONDARY_COLOR_PRESS,
        };
      } else {
        return {
          backgroundColor: theme.SECONDARY_COLOR_DEFAULT,
          borderColor: theme.SECONDARY_COLOR_DEFAULT,
        };
      }
    case "2":
      if (status) {
        return {
          backgroundColor: theme.PRIMARY_COLOR_PRESS,
          borderColor: theme.PRIMARY_COLOR_PRESS,
        };
      } else {
        return {
          backgroundColor: theme.PRIMARY_COLOR_DEFAULT,
          borderColor: theme.PRIMARY_COLOR_DEFAULT,
        };
      }
    case "facebook":
      if (status) {
        return {
          backgroundColor: theme.FACEBOOK_COLOR_PRESS,
          borderColor: theme.FACEBOOK_COLOR_PRESS,
        };
      } else {
        return {
          backgroundColor: theme.FACEBOOK_COLOR,
          borderColor: theme.FACEBOOK_COLOR,
        };
      }
    case "text":
      return null
    default:
      return {
        backgroundColor: "transparent",
      };
  }
};
const Button: React.FC<Props> = ({
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
      onPressOut={() => {
        setStatus({ hover: false });
      }}
    >
      <View
        style={[getButtonStyle(type, status.hover), customStyle, styles.button]}
      >
        {typeof image !== "string" ? (
          <Image
            style={{
              width: imageSize.width,
              height: imageSize.height,
              marginRight: imageSize.marginRight || 0,
              resizeMode: "contain",
            }}
            source={image}
          />
        ) : null}
        {title.length !== 0 ? (
          <Text style={[styles.buttonText, fontStyle]}>{title}</Text>
        ) : null}
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
    color: theme.COLOR_WHITE,
  },
  isDisable: {
    backgroundColor: theme.PRIMARY_COLOR_DEFAULT,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
  },
  isHover: {
    backgroundColor: theme.SECONDARY_COLOR_PRESS,
    borderColor: theme.SECONDARY_COLOR_PRESS,
  },
  isDefault: {
    backgroundColor: theme.SECONDARY_COLOR_DEFAULT,
    borderColor: theme.SECONDARY_COLOR_DEFAULT,
  },
});
export default Button;
