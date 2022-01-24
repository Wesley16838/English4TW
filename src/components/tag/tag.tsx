import React from "react";
import {
  StyleSheet,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import theme from "../../utilities/theme.style";
export type Props = {
  title: string;
  OnClick: any;
  customStyle: any;
  disable?: boolean;
};
const Tag: React.FC<Props> = ({ title, OnClick, customStyle, disable }) => {
  const [press, setPress] = React.useState(false);
  const [pressIn, setPressIn] = React.useState(false);
  const [status, setStatus] = React.useState({
    hover: false,
    press: false,
  });

  return (
    <TouchableWithoutFeedback
      accessible={true}
      accessibilityLabel={title}
      accessibilityHint={title}
      onPressIn={() => {
          if(!disable) setStatus({ ...status, hover: true })
        }
      }
      onPressOut={() => {
        if(!disable) setStatus({ hover: false, press: !status.press });
      }}
    >
      <View
        style={[
          customStyle,
          status.hover
            ? styles.isHover
            : status.press
            ? styles.isPress
            : styles.isDefault,
        ]}
      >
        <Text
          style={[
            status.hover
              ? styles.isHoverText
              : status.press
              ? styles.isPressText
              : styles.isDefaultText,
          ]}
        >
          {title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  isPress: {
    backgroundColor: theme.PRIMARY_COLOR_DEFAULT,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
    borderWidth: 1,
    borderRadius: 20,
  },
  isHover: {
    backgroundColor: theme.PRIMARY_COLOR_PRESS,
    borderColor: theme.PRIMARY_COLOR_PRESS,
    borderWidth: 1,
    borderRadius: 20,
  },
  isDefault: {
    backgroundColor: theme.COLOR_WHITE,
    borderColor: theme.SECONDARY_COLOR_DEFAULT,
    borderWidth: 1,
    borderRadius: 20,
  },
  isDefaultText: {
    color: theme.SECONDARY_COLOR_DEFAULT,
  },
  isPressText: {
    color: theme.COLOR_WHITE,
  },
  isHoverText: {
    color: theme.COLOR_WHITE,
  },
});
export default Tag;
