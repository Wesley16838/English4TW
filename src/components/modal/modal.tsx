import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Images from "../../assets/images";
import { BlurView } from "expo-blur";
import { Colors, Typography } from "../../styles";
import IModal from "../../types/components/modal";

const Modal: React.FC<IModal> = ({
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
            style={styles.listItem}
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
  };
  return (
    <BlurView
      tint="dark"
      intensity={100}
      style={[StyleSheet.absoluteFill, styles.nonBlurredContent]}
    >
      <View style={styles.modalContainer}>
        <Text
          style={styles.modalContent}
        >
          {title}
        </Text>
        {children ? <View>{children}</View> : <View>{renderOption()}</View>}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity
            onPress={() => handleOnCancel()}
            style={styles.button}
          >
            <Text style={Typography.base_primary}>取消</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOnConfirm()}
            style={styles.button}
          >
            <Text style={Typography.base_primary}>
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
    width: "100%",
    height: "100%",
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 20,
  },
  modalContainer: {
    width: 270,
    backgroundColor: Colors.white,
    alignItems: "center",
    paddingTop: 19,
    borderRadius: 14,
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
  modalContent: {
    textAlign: "center",
    marginBottom: 19,
    color: Colors.secondary,
  },
  button: {
    width: 135,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 11,
    borderTopWidth: 0.5,
    borderTopColor: Colors.modal_line,
  },
  buttonWrapper: {
    width: "100%", 
    flexDirection: "row"
  },
  listItem: {
    width: 270,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 17,
    paddingHorizontal: 16,
  },
});
export default Modal;
