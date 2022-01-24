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
  titles: string[];
  children?: any[];
  customStyle?: any;
};
const TabView: React.FC<Props> = ({ titles, customStyle, children }) => {
  const [index, setIndex] = React.useState(0);
  const renderTab = () => {
    return (
      Array.isArray(titles) &&
      titles.map((item, idx) => {
        return (
          <View
            key={item+idx}
            style={{
              width: "50%",
              borderColor: index === idx ? theme.PRIMARY_COLOR_DEFAULT : theme.COLOR_TRANSPARENT,
              borderWidth: index === idx ? 0.5 : 0,
              borderBottomColor: theme.PRIMARY_COLOR_DEFAULT,
              borderBottomWidth: 0.5,
              paddingBottom: 10,
              paddingTop: 10,
              paddingLeft: 13,
              paddingRight: 13,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
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
                    : theme.PRIMARY_COLOR_UNSELECT,
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
