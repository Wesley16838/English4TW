import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors, Typography } from "../../styles";
import ILabel from "../../types/components/label";
/*
[Label] is un-touchable component
*/
const Label: React.FC<ILabel> = ({ title, customStyle }) => {
  return (
    <View style={[customStyle, styles.container]}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 3,
    color: Colors.primary,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 13.5,
  },
  title: {
    ...Typography.sm_primary,
    lineHeight: 18,
  },
});
export default Label;
