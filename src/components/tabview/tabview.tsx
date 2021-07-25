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
import theme from "./../../utilities/theme.style";
export type Props = {
  titles: string[];
  children?: any[];
  customStyle?: any;
};
const TabView: React.FC<Props> = ({ titles, customStyle, children }) => {
  console.log(titles);
  const [index, setIndex] = React.useState(0);
  const renderTab = () => {
    return (
      Array.isArray(titles) &&
      titles.map((item, idx) => {
        return (
          <View
            style={{
              width: "50%",
              borderBottomColor:
                index === idx
                  ? theme.PRIMARY_COLOR_DEFAULT
                  : theme.FONT_COLOR_GRAY4,
              borderBottomWidth: index === idx ? 4 : 0.5,
            }}
            onTouchEnd={() => setIndex(idx)}
          >
            <Text
              style={{
                textAlign: "center",
                fontSize: 17,
                lineHeight: 25,
                color:
                  index === idx
                    ? theme.PRIMARY_COLOR_DEFAULT
                    : theme.FONT_COLOR_GRAY4,
              }}
            >
              {item}
            </Text>
          </View>
        );
      })
    );
  };
  const renderBody = () => {
    return children?.map((item, idx) => {
      return index === idx && item;
    });
  };
  return (
    <View style={[customStyle]}>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        {renderTab()}
      </View>
      <View>{renderBody()}</View>
    </View>
  );
};

export default TabView;
