import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import Icon from "./../icon/icon";
import Images from "./../../assets/images";
import theme from "./../../utilities/theme.style";

export type Props = {
  OnClick: any;
  customStyle: any;
  placeHolder: string;
  placeHolderTextColor: string;
};
const SearchBox: React.FC<Props> = ({
  OnClick,
  customStyle,
  placeHolder,
  placeHolderTextColor,
}) => {
  return (
    <View style={[styles.searchSection, customStyle]}>
      <Icon
        name={Images.icons.search_icon}
        size={15}
        color={theme.SECONDARY_COLOR_DEFAULT}
      />
      <TextInput
        multiline={false}
        numberOfLines={1}
        style={[styles.input, { width: customStyle.width - 49 }]}
        placeholder={placeHolder}
        onChangeText={(searchString) => {}}
        underlineColorAndroid="transparent"
        placeholderTextColor={placeHolderTextColor}
      />
      <Icon
        name={Images.icons.micro_icon}
        size={15}
        color={theme.SECONDARY_COLOR_DEFAULT}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    height: 36,
    flexDirection: "row",
    paddingHorizontal: 8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderColor: theme.SECONDARY_COLOR_DEFAULT,
    borderWidth: 1,
  },
  input: {
    height: 36,
    paddingHorizontal: 9,
    paddingTop: 0,
    textAlignVertical: "center",
  },
});
export default SearchBox;
