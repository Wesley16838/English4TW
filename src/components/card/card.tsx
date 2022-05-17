import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Label from "../Label/Label";
import { Colors, Typography } from "../../styles";
import Button from "../Button/Button";
import images from "../../assets/images";
import { ICard, ICardButton } from "../../types/components/card";

const printImage = (array: ICardButton[]) => {
  return array.map((item: ICardButton, index: number) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          item.onClick()
        }}
        key={index}
      >
        <Image
          key={index}
          source={item.path}
          style={{ width: 30, height: 30, marginLeft: 10 }}
        />  
      </TouchableWithoutFeedback>
      
    );
  });
};

const Card: React.FC<ICard> = ({
  OnClick,
  customStyle,
  title,
  speech,
  subtitle,
  detail,
  buttons,
}) => {
  return (
    <TouchableWithoutFeedback>
      <View style={[styles.cardContainer, customStyle]}>
        <View style={styles.cardRow}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.cardInnerRow}>{printImage(buttons)}</View>
        </View>
        <View style={styles.cardColumn}>
          <Label title={speech} customStyle={{marginTop: 10, marginBottom:5}}/>
          <Text style={styles.status}>{subtitle}</Text>
        </View>
        <View style={styles.cardRow}>
          <Text style={styles.detail}>{detail}</Text>
          <Button
            title=""
            image={images.icons.rightarrow_icon_b}
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
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 18,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.white,
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
    ...Typography.title,
    lineHeight: 30,
  },
  status: {
    fontSize: 15,
    color: Colors.primary,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    color: Colors.gray_3,
  },
});
export default Card;
