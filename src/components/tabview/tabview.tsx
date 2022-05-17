import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, Typography } from "../../styles";
import { ITabview } from "../../types/components/tabview";

const TabView: React.FC<ITabview> = ({ titles, customStyle, children }) => {
  const [index, setIndex] = React.useState(0);
  const renderTab = () => {
    return (
      Array.isArray(titles) &&
      titles.map((item, idx) => {
        return (
          <View
            key={item+idx}
            style={[styles.container, 
              {
                borderColor: index === idx ? Colors.primary : Colors.transparent,
                borderWidth: index === idx ? 0.5 : 0,
              }
            ]}
            onTouchEnd={() => setIndex(idx)}
          >
            <Text
              style={[styles.title,
                {
                  color: index === idx ? Colors.primary : Colors.primary_light,
                }
              ]}
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
    <>
      {
        children.length > 1 ? 
        <View style={[customStyle]}>
          <View style={{ flexDirection: "row", marginBottom: 20 }}>
            {renderTab()}
          </View>
          <View>{renderBody()}</View>
        </View> : 
        renderBody()
      }
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "50%",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 0.5,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 13,
    paddingRight: 13,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title:{
    ...Typography.base,
    textAlign: "center",
    lineHeight: 25,
  }
});

export default TabView;
