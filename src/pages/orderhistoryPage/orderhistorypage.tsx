import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import Button from "../../components/Button/Button";
import theme from "./../../utilities/theme.style";
import images from "../../assets/images";

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Switch,
  FlatList,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
import { IOrder } from "./../../types/orders";
const OrderItem: React.FC<IOrder> = ({ cases, date, price, status, index }) => {
  return (
    <View style={[styles.cardContainer, { marginTop: index === 1 ? 26 : 20 }]}>
      <View style={styles.cardRow}>
        <Text style={styles.name}>{cases}</Text>
        <Text style={styles.date}>{price}</Text>
      </View>
      <View style={styles.cardColumn}>
        <Text>{date}</Text>
        <Text>{status}</Text>
      </View>
    </View>
  );
};
const orderhistoryPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={[theme.BACKGROUND_COLOR_1, theme.BACKGROUND_COLOR_2]}
      style={styles.container}
    >
      <SafeAreaView
        style={{
          height: "100%",
          alignItems: "center",
          width: DEVICE_WIDTH,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start" }}>
            <Button
              title=""
              image={images.icons.leftarrow_icon}
              customStyle={{}}
              imageSize={{ height: 20, width: 12, marginRight: 0 }}
              type=""
              onPress={() => handleBack()}
            />
          </View>

          <Text
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: theme.FONT_SIZE_MEDIUM,
              lineHeight: 22,
              fontWeight: "bold",
            }}
          >
            訂單記錄
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }} />
        </View>
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            width: DEVICE_WIDTH - 40,
          }}
          showsVerticalScrollIndicator={false}
          data={[
            {
              cases: "30天方案",
              price: "NT $120",
              date: "2021-04-20  08:02 PM",
              status: "付款成功",
            },
            {
              cases: "30天方案",
              price: "NT $120",
              date: "2021-04-20  08:02 PM",
              status: "付款成功",
            },
            {
              cases: "30天方案",
              price: "NT $120",
              date: "2021-04-20  08:02 PM",
              status: "付款成功",
            },
            {
              cases: "30天方案",
              price: "NT $120",
              date: "2021-04-20  08:02 PM",
              status: "付款成功",
            },
            {
              cases: "30天方案",
              price: "NT $120",
              date: "2021-04-20  08:02 PM",
              status: "付款成功",
            },
            {
              cases: "30天方案",
              price: "NT $120",
              date: "2021-04-20  08:02 PM",
              status: "付款成功",
            },
          ]}
          renderItem={({ item, index }) => (
            <OrderItem
              key={index}
              cases={item.cases}
              date={item.date}
              price={item.price}
              status={item.status}
              index={index}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  sectionRow: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: DEVICE_WIDTH,
    borderTopColor: "#96CACA",
    borderTopWidth: 1,
  },
  sectionText: {},
  version: {
    color: "rgba(60, 60, 67, 0.6)",
  },
  sectionArrow: {
    width: 7,
    height: 12,
  },
  cardContainer: {
    height: "auto",
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderColor: theme.PRIMARY_COLOR_DEFAULT,
    borderWidth: 1,
    backgroundColor: theme.COLOR_WHITE,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  cardInnerRow: {
    flexDirection: "row",
  },
  cardColumn: {
    width: "100%",
    flexDirection: "column",
  },
  name: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    lineHeight: 17,
    color: theme.PRIMARY_COLOR_DEFAULT,
  },
  date: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: theme.SECONDARY_COLOR_DEFAULT,
  },
  content: {
    fontSize: 16,
    color: "#828282",
  },
});

export default orderhistoryPage;
