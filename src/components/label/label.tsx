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
  customStyle?: any;
};
const Label: React.FC<Props> = ({ title, customStyle }) => {
  const [press, setPress] = React.useState(false);
  const [pressIn, setPressIn] = React.useState(false);
  const [status, setStatus] = React.useState({
    hover: false,
    press: false,
  });

  return (
    <View style={[customStyle, styles.container]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 3,
    color: theme.PRIMARY_COLOR_DEFAULT,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
    borderWidth: 1,
    borderRadius: 13.5,
  },
  title: {
    color: theme.PRIMARY_COLOR_DEFAULT,
    fontWeight: "500",
    fontSize: theme.FONT_SIZE_SMALL,
    lineHeight: 18,
  },
});
export default Label;
