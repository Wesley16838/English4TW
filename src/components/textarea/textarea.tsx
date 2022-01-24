import React from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  Platform,
} from "react-native";
import Icon from "../Icon/Icon";
import theme from "../../utilities/theme.style";
import Button from "../Button/Button";

export type Props = {
  OnClick: any;
  customStyle: any;
  source?: any;
  placeHolder: string;
  placeHolderTextColor: string;
  limit: number;
  button?: string;
  buttonStyle?: any;
};
const TextArea: React.FC<Props> = ({
  OnClick,
  customStyle,
  source,
  placeHolder,
  placeHolderTextColor,
  limit,
  button,
  buttonStyle
}) => {
  const [textNumber, setTextNumber] = React.useState(0);
  const [string, setString] = React.useState("");
  const onSubmitEditing = () => {
    if (!button && OnClick) {
      setString("");
      OnClick(string)
    }
  };
  const heightTop = customStyle.height - 46;
  return (
    <View style={[styles.textAreaSection, customStyle]}>
      <TextInput
        // returnKeyType="done"
        // multiline={true}
        blurOnSubmit={true}
        multiline={true}
        textAlignVertical="top"
        numberOfLines={5}
        style={{
          height: heightTop,
          width: "100%",
          paddingTop: 10,
          paddingHorizontal: 15,
        }}
        placeholder={placeHolder}
        onChangeText={(searchString) => {
          if (searchString.length > limit) return false;
          setString(searchString);
          setTextNumber(searchString.length);
        }}
        onSubmitEditing={() => onSubmitEditing()}
        underlineColorAndroid="transparent"
        placeholderTextColor={placeHolderTextColor}
        keyboardType="default"
        returnKeyType="done"
        value={string}
        autoCorrect={false}
      />
      <View style={styles.textAreaBottom}>
        <Text style={styles.textAreaText}>
          {textNumber}/{limit}
        </Text>
        {source && <Image source={source} style={styles.textAreaBottomImage} />}
        {button && <Button
          title={button}
          onPress={() => {
            if (OnClick) OnClick(string)
          }}
          customStyle={
            buttonStyle
          }
          imageSize={{}}
          type="2"
          image={""}
          fontStyle={{}}
        />}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  textAreaSection: {
    height: 150,
    // width: 335,
    flexDirection: "column",
    borderRadius: 20,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
    borderWidth: 1,
    justifyContent: "space-between",
    backgroundColor: theme.COLOR_WHITE,
  },
  input: {
    width: "100%",
    paddingTop: 10,
    paddingHorizontal: 15,
  },
  textAreaBottom: {
    height: 46,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 15,
    justifyContent: "space-between",
    alignItems: "center",
    borderTopColor: "rgba(0, 0, 0, 0.1)",
    borderTopWidth: 1,
  },
  textAreaBottomImage: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  textAreaText: {
    marginTop: 2,
    color: "#828282",
  },
});
export default TextArea;
