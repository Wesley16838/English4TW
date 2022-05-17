import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import theme from "../../utils/theme.style";
import images from "../../assets/images";
export type Props = {
  customStyle: any;
  menu: any;
  value: any;
  outside: boolean;
  onPressOutside: any;
};
const SelectableText: React.FC<Props> = ({
  customStyle,
  menu,
  value,
  outside,
  onPressOutside,
}) => {
  const screenWidth = Dimensions.get("window").width;
  const [menuPosition, setMenuPosition] = React.useState({
    tmpLocationX: 0,
    tmpLocationY: 0,
    locationX: 0,
    locationY: 0,
    px: 0,
    py: 0,
    height: 0,
    notchHeight: 0,
  });
  const [selected, setSelected] = React.useState({ start: 0, end: 0 });
  const [isMoving, setIsMoving] = React.useState(false);

  React.useEffect(() => {
    if (outside) {
      setMenuPosition({ ...menuPosition, height: 0, notchHeight: 0 });
      setSelected({ start: 0, end: 0 });
    }
  }, [outside]);

  return (
    <View
      style={{ position: "relative" }}
      onResponderGrant={(e) => {
        // const n = Math.floor(menuPosition.locationY / 27.5);
        // onPressOutside();
        // setMenuPosition({
        //   ...menuPosition,
        //   locationX: e.nativeEvent.locationX,
        //   locationY: e.nativeEvent.locationY,
        //   // e.nativeEvent.locationY - 27.5 * n > 0
        //   //   ? menuPosition.locationY
        //   //   : e.nativeEvent.locationY,
        //   height: 0,
        //   notchHeight: 0,
        // });
      }}
      //   onTouchMove={(e) => {
      //     setIsMoving(true);
      //     setMenuPosition({
      //       ...menuPosition,
      //       height: 0,
      //       notchHeight: 0,
      //       locationX: e.nativeEvent.locationX,
      //     });
      //   }}
      //   onTouchEnd={(e) => {
      //     if (menuPosition.height === 0) {
      //       const n = Math.floor(menuPosition.locationY / 27.5);
      //       setMenuPosition({
      //         ...menuPosition,
      //         height: 38,
      //         notchHeight: 7,
      //         py: -38 + 27.5 * n,
      //         px: menuPosition.locationX - 90,
      //       });
      //     }
      //     setIsMoving(false);
      //   }}
    >
      <View
        style={{
          height: menuPosition.height,
          position: "absolute",
          zIndex: 20,
          backgroundColor: "#3A3A3C",
          flexDirection: "row",
          borderRadius: 8,
          top: menuPosition.py,
          left: menuPosition.px,
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 17,
          }}
        >
          <Text style={{ color: theme.COLOR_WHITE }}>字彙查詢</Text>
        </TouchableOpacity>
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: Colors.gray_4,
          }}
        />
        <Image
          style={{
            width: 14,
            height: menuPosition.notchHeight,
            position: "absolute",
            left: 85,
            top: 38,
          }}
          source={images.icons.notch_icon}
        />
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 17,
          }}
        >
          <Text style={{ color: theme.COLOR_WHITE }}>字彙比較</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={{
          fontSize: theme.FONT_SIZE_MEDIUM,
          fontWeight: "400",
          marginBottom: 6,
          lineHeight: 25,
        }}
        editable={false}
        contextMenuHidden={true}
        caretHidden={true}
        value={value}
        multiline={true}
        selection={{ start: selected.start, end: selected.end }}
        spellCheck={false}
        autoCorrect={false}
        onSelectionChange={(evt) => {
          setSelected({
            start: evt.nativeEvent.selection.start,
            end: evt.nativeEvent.selection.end,
          });

          if (
            evt.nativeEvent.selection.end - evt.nativeEvent.selection.start ===
            0
          ) {
            setMenuPosition({ ...menuPosition, height: 0, notchHeight: 0 });
            // setSelected({ start: 0, end: 0 });
          } else {
            const n = Math.floor(menuPosition.locationY / 27.5);
            setMenuPosition({
              ...menuPosition,
              py: -38 + 27.5 * n,
              px: menuPosition.locationX - 90,
            });

            // setSelected({
            //   start: evt.nativeEvent.selection.start,
            //   end: evt.nativeEvent.selection.end,
            // });
          }
        }}
      />
    </View>
  );
};

export default SelectableText;
