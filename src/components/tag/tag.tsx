import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../styles";
import ITag from "../../types/components/tag";
/*
[Tag] is touchable component
disable means tag cannot be pressed if it's true. Ex:筆記內容頁
TodoList: pass callback function from parent 
*/
const Tag: React.FC<ITag> = ({ title, OnClick, customStyle, disable }) => {
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
          status.hover ? 
            styles.isHover : 
            status.press ? 
              styles.isPress : 
              styles.isDefault,
        ]}
      >
        <Text
          style={[
            status.hover ? 
              styles.whiteText: 
              status.press ? 
                styles.whiteText : 
                styles.isDefaultText
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
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 20,
  },
  isHover: {
    backgroundColor: Colors.button_primary_press,
    borderColor: Colors.button_primary_press,
    borderWidth: 1,
    borderRadius: 20,
  },
  isDefault: {
    backgroundColor: Colors.white,
    borderColor: Colors.secondary,
    borderWidth: 1,
    borderRadius: 20,
  },
  isDefaultText: {
    color: Colors.secondary,
  },
  whiteText: {
    color: Colors.white,
  },
});
export default Tag;
