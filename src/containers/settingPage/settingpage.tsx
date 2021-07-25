import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import ProfileImage from "./../../components/profileimage/profileimage";
import Button from "./../../components/button/button";
import theme from "./../../utilities/theme.style";
import images from "../../assets/images";

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
const settingPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const handleOnClick = () => { };
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
        <ProfileImage
          name={images.icons.default_profileimage}
          size={130}
          customStyle={{
            height: 130,
            width: 130,
            marginTop: 25,
            marginBottom: 20,
            borderRadius: 65,
          }}
        />
        <Button
          title="登入"
          onPress={() => navigation.push('loginPage')}
          customStyle={{
            width: 150,
            height: 36,
            borderRadius: 20,
            flexDirection: "row",
            marginBottom: 44,
          }}
          imageSize={{
            width: 16,
            height: 16,
            marginRight: 7,
          }}
          type="1"
          image={""}
        />
        <View>
          <TouchableWithoutFeedback
            accessible={true}
            accessibilityLabel={"特色介紹"}
            accessibilityHint={"特色介紹"}
            onPressIn={() => { }}
            onPressOut={() => { }}
          >
            <View style={styles.sectionRow}>
              <Text style={styles.sectionText}>{"特色介紹"}</Text>
              <Image
                style={styles.sectionArrow}
                source={images.icons.rightarrow_icon}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            accessible={true}
            accessibilityLabel={"意見回饋"}
            accessibilityHint={"意見回饋"}
            onPressIn={() => { }}
            onPressOut={() => { }}
          >
            <View style={styles.sectionRow}>
              <Text style={styles.sectionText}>{"意見回饋"}</Text>
              <Image
                style={styles.sectionArrow}
                source={images.icons.rightarrow_icon}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            accessible={true}
            accessibilityLabel={"開發版號"}
            accessibilityHint={"開發版號"}
            onPressIn={() => { }}
            onPressOut={() => { }}
          >
            <View
              style={[
                styles.sectionRow,
                { borderBottomColor: "#96CACA", borderBottomWidth: 1 },
              ]}
            >
              <Text style={styles.sectionText}>{"開發版號"}</Text>
              <Text style={styles.version}>{"0.2.1"}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
});

export default settingPage;
