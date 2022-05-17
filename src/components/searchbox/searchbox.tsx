import React from "react";
import { View, StyleSheet, TextInput, Keyboard } from "react-native";
import Icon from "../Icon/Icon";
import Images from "../../assets/images";
import { Colors } from "../../styles";
export type Props = {
  OnChange: (str: string) => void,
  OnClick: () => void;
  customStyle: any;
  placeHolder: string;
  placeHolderTextColor: string;
  value: string;
};
const SearchBox: React.FC<Props> = ({
  OnChange,
  OnClick,
  customStyle,
  placeHolder,
  placeHolderTextColor,
  value
}) => {
  return (
    <View style={[styles.searchSection, customStyle]}>
      <Icon
        name={Images.icons.search_icon}
        size={15}
        color={Colors.secondary}
      />
      <TextInput
        multiline={false}
        numberOfLines={1}
        style={[styles.input, { width: customStyle.width - 49 }]}
        placeholder={placeHolder}
        onChangeText={(searchString) => {
          OnChange(searchString)
        }}
        underlineColorAndroid="transparent"
        placeholderTextColor={placeHolderTextColor}
        defaultValue={value}
        onSubmitEditing={()=> {
          OnClick()
          Keyboard.dismiss()
        }}
        onBlur={Keyboard.dismiss}
      />
      <Icon
        name={Images.icons.micro_icon}
        size={15}
        color={Colors.secondary}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    height: 36,
    paddingHorizontal: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderColor: Colors.secondary,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  input: {
    height: 36,
    paddingHorizontal: 9,
    paddingTop: 0,
    textAlignVertical: "center",
    
  },
});
export default SearchBox;
