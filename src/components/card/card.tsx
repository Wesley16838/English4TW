import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Label from "../Label/Label";
import theme from "../../utilities/theme.style";
import Button from "../Button/Button";
import images from "../../assets/images";

export type Props = {
  OnClick: any;
  customStyle: any;
  title: string;
  speech: string;//詞性
  status: string;//可數, 不可數, 單複數
  detail: any;
  buttons: any;
  manualCompare?: boolean;
};
const Card: React.FC<Props> = ({
  OnClick,
  customStyle,
  title,
  speech,
  status,
  detail,
  buttons,
  manualCompare,
}) => {
  const printImage = (array: any) => {
    return array.map((images: any, index: any) => {
      if (manualCompare && index === 2) {
        return (
          <Image
            key={index}
            source={images}
            style={{ width: 30, height: 30, marginLeft: 10 }}
          />
        );
      }
      return (
        <Image
          key={index}
          source={images}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />
      );
    });
  };
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.cardContainer, customStyle]}>
        <View style={styles.cardRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.cardInnerRow}>{printImage(buttons)}</View>
        </View>
        <View style={styles.cardColumn}>
          <Label title={speech} customStyle={{marginTop: 10, marginBottom:5}}/>
          <Text style={styles.status}>{status}-</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.detail}>{detail}</Text>
          <Button
                title=""
                image={images.icons.rightarrow_icon_b}
                customStyle={{}}
                imageSize={{ height: 20, width: 12, marginRight: 0 }}
                type=""
                onPress={() => OnClick(title)}
              />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  cardContainer: {
    height: "auto",
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
    borderWidth: 1,
    backgroundColor: theme.BACKGROUND_COLOR_1,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  cardInnerRow: {
    flexDirection: "row",
  },
  cardColumn: {
    width: "100%",
    flexDirection: "column",
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: 30,
  },
  status: {
    fontSize: 15,
    color: theme.PRIMARY_COLOR_DEFAULT,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: "#828282",
  },
});
export default Card;
