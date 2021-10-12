import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "./../icon/icon";
import theme from "./../../utilities/theme.style";

export type Props = {
  OnChangeText: any;
  customStyle: any;
  placeHolder: string;
  placeHolderTextColor: string;
  value: string;
  title?: string;
};
const InputBox: React.FC<Props> = ({
  OnChangeText,
  customStyle,
  placeHolder,
  placeHolderTextColor,
  value,
  title,
}) => {
  // const [text, onChangeText] = React.useState('')
  return (
    <View style={{ flexDirection: "column" }}>
      {title && <Text>{title}</Text>}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View>
          <TextInput
            multiline={false}
            numberOfLines={1}
            style={[styles.inputBox, customStyle]}
            placeholder={placeHolder}
            onChangeText={(string) => {
              OnChangeText(string);
            }}
            underlineColorAndroid="transparent"
            placeholderTextColor={placeHolderTextColor}
            value={value}
            autoCapitalize="none"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
const styles = StyleSheet.create({
  inputBox: {
    textAlignVertical: "center",
    borderRadius: 20,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
    borderWidth: 1,
    paddingHorizontal: 15,
  },
});
export default InputBox;
