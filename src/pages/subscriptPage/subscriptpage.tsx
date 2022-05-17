import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button/Button";
import images from "../../assets/images";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TextStyle,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
import { Colors, Typography } from "../../styles";
import LinearGradientLayout from "../../components/LinearGradientLayout";
const subscriptPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [cases, setCases] = useState(0);
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <LinearGradientLayout>
      <SafeAreaView>
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
        >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginBottom: 30,
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
            style={ Typography.pageTitle as TextStyle }
          >
            進階功能
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end" }} />
        </View>
        <View
          style={{
            width: DEVICE_WIDTH - 40,
            alignSelf: "center"
          }}
        >
          <Text
            style={Typography.base_bold}
          >
            目前方案: {"30天方案"}
          </Text>
          <Text
            style={Typography.base_bold}
          >
            到期日: {"2020-12-20"}
          </Text>
        </View>

        <View
          style={{
            width: DEVICE_WIDTH - 40,
            paddingHorizontal: 30,
            marginTop: 15,
            marginBottom: 35,
            alignSelf: "center"
          }}
        >
          <Text style={{ color: "rgba(0, 0, 0, 0.5)", lineHeight: 20 }}>
            訂閱後:
          </Text>
          <Text style={{ color: "rgba(0, 0, 0, 0.5)", lineHeight: 20 }}>
            1. 每日查詢單字次數由100次升級至300次
          </Text>
          <Text style={{ color: "rgba(0, 0, 0, 0.5)", lineHeight: 20 }}>
            2. 字彙儲存數量從5個升級至100個
          </Text>
          <Text style={{ color: "rgba(0, 0, 0, 0.5)", lineHeight: 20 }}>
            3. 筆記儲存數量從5篇升級至
          </Text>
          <Text style={{ color: "rgba(0, 0, 0, 0.5)", lineHeight: 20 }}>
            4. 書籤數量從5個升級至100個
          </Text>
        </View>

        <Text
          style={{
            ...Typography.base_bold,
            width: DEVICE_WIDTH - 40,
            marginBottom: 15,
            alignSelf: "center"
          }}
        >
          付費方案
        </Text>
        <View style={{ width: DEVICE_WIDTH, marginBottom: 20 }}>
          <TouchableOpacity
            style={{
              width: DEVICE_WIDTH,
              height: 50,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0, 0, 0, 0.2)",
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => setCases(0)}
          >
            <Text>30天：NT $120</Text>
            {cases === 0 && (
              <Image
                source={images.icons.check_black_icon}
                style={{ width: 20, height: 14 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: DEVICE_WIDTH,
              height: 50,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0, 0, 0, 0.2)",
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => setCases(1)}
          >
            <Text>180天：NT $600</Text>
            {cases === 1 && (
              <Image
                source={images.icons.check_black_icon}
                style={{ width: 20, height: 14 }}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: DEVICE_WIDTH,
              height: 50,
              borderBottomWidth: 1,
              borderBottomColor: "rgba(0, 0, 0, 0.2)",
              backgroundColor: Colors.white,
              paddingHorizontal: 20,
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
            onPress={() => setCases(2)}
          >
            <Text>365天：NT $1000</Text>
            {cases === 2 && (
              <Image
                source={images.icons.check_black_icon}
                style={{ width: 20, height: 14 }}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={{ width: DEVICE_WIDTH - 50, marginBottom: 45, alignSelf: "center" }}>
          <Text style={{ marginBottom: 25 }}>請將訂單款項匯至下列帳號</Text>
          <View style={{ marginBottom: 25 }}>
            <Text style={{ marginBottom: 5 }}>銀行：台北富邦銀行</Text>
            <Text style={{ marginBottom: 5 }}>分行：嘉義分行</Text>
            <Text style={{ marginBottom: 5 }}>戶名：學語佳數位有限公司</Text>
            <Text style={{ marginBottom: 5 }}>銀行代碼：012</Text>
          </View>
          <Text style={{ marginBottom: 25 }}>
            完成後請在右下角輸入帳號後五碼，然後點擊送出鍵
          </Text>
          <Text style={{ marginBottom: 25 }}>
            或請來信contact@english4tw.com，註名帳單號碼與轉帳後五碼
          </Text>
          <Text>我們將快速為您處理開通您的進階功能</Text>
        </View>
        <Button
          title="確定"
          customStyle={{
            width: DEVICE_WIDTH - 40,
            height: 50,
            borderRadius: 25,
            alignSelf: "center",
          }}
          fontStyle={Typography.base_bold}
          type="2"
          onPress={() => {}}
        />
        </ScrollView>
      </SafeAreaView>
    </LinearGradientLayout>
  );
};
const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: DEVICE_WIDTH,
    borderTopColor: Colors.primary_light,
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
});

export default subscriptPage;
