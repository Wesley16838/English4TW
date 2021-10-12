import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";
import React from "react";
import Images from "../../assets/images";
import { BlurView } from "expo-blur";
import theme from "../../utilities/theme.style";

export type Props = {
  title: string;
  customStyle?: any;
  onCancel?: any;
  onConfirm?: any;
  content?: any;
  confirmString?: string;
  children?: any;
};
const Modal: React.FC<Props> = ({
  title,
  customStyle,
  onCancel,
  onConfirm,
  content,
  confirmString,
  children,
}) => {
  const [selected, setSelected] = React.useState((content && content[0]) || "");
  const onCheck = (option: string) => {
    setSelected(option);
  };
  const renderOption = () => {
    return (
      Array.isArray(content) &&
      content.map((option, index) => {
        return (
          <TouchableOpacity
            onPress={() => onCheck(option)}
            style={{
              paddingVertical: 17,
              paddingHorizontal: 16,
              flexDirection: "row",
              justifyContent: "space-between",
              width: 270,
            }}
            key={index}
          >
            <Text>{option}</Text>
            {selected === option && (
              <Image source={Images.icons.check_icon} style={styles.checked} />
            )}
          </TouchableOpacity>
        );
      })
    );
  };
  const handleOnCancel = () => {
    if (onCancel) onCancel();
  };
  const handleOnConfirm = () => {
    if (onConfirm) onConfirm(selected);
    if (onCancel) onCancel();
  };
  return (
    <BlurView
      tint="dark"
      intensity={100}
      style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
    >
      <View style={styles.modalContainer}>
        <Text
          style={{
            textAlign: "center",
            marginBottom: 19,
            color: theme.SECONDARY_COLOR_DEFAULT,
          }}
        >
          {title}
        </Text>
        {children ? <View>{children}</View> : <View>{renderOption()}</View>}
        <View style={{ width: "100%", flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => handleOnCancel()}
            style={{
              width: 135,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 11,
              borderTopWidth: 0.5,
              borderTopColor: theme.LINE_COLOR,
              borderRightWidth: 0.5,
              borderRightColor: theme.LINE_COLOR,
            }}
          >
            <Text style={{ color: theme.PRIMARY_COLOR_DEFAULT }}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOnCancel()}
            style={{
              width: 135,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 11,
              borderTopWidth: 0.5,
              borderTopColor: theme.LINE_COLOR,
            }}
          >
            <Text style={{ color: theme.PRIMARY_COLOR_DEFAULT }}>
              {confirmString ? confirmString : "完成"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BlurView>
  );
};
const styles = StyleSheet.create({
  modalWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    flex: 1,
    zIndex: 20,
  },
  modalContainer: {
    borderRadius: 14,
    paddingTop: 19,
    backgroundColor: theme.COLOR_WHITE,
    width: 270,
    alignItems: "center",
  },
  checked: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
  nonBlurredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Modal;
