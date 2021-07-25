import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import Button from "./../../components/button/button";
import Images from "./../../assets/images";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH } from "../splashpage";

const wordAnalysisPage = ({ navigation }: { navigation: any }) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [analysis, setAnalysis] = React.useState([
    {
      sentence:
        "In this session, we will get acquainted with React Navigation, which is used for routing and transitionbetween screens.",
    },
    {
      sentence:
        "In this session, we will get acquainted with React Navigation, which is used for routing and transitionbetween screens.",
    },
  ]);
  const [isOutside, setIsOutside] = React.useState(true); // 一開始是不顯示, 所以outside
  const screenHeight = Dimensions.get("window").height;

  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  const handleNext = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.push("wordanalysisPage");
  };

  const renderAnalysisSection = () => {
    return analysis.map((anal, index) => {
      return (
        <View key={index}>
          {/* <SelectableText
            customStyle={{
              fontSize: theme.FONT_SIZE_MEDIUM,
              fontWeight: "400",
              marginBottom: 6,
              lineHeight: 25,
            }}
            value={anal.sentence}
            outside={isOutside}
            menu={["字彙查詢", "字彙比較", "詞句分析"]}
            onPressOutside={() => setIsOutside(false)}
          /> */}
          <Text style={styles.sentence_analysis}>{anal.sentence}</Text>
          <View style={{ flexDirection: "row", marginBottom: 6 }}>
            <Text
              style={{
                fontSize: theme.FONT_SIZE_LARGE,
                fontWeight: "700",
                marginBottom: 6,
                lineHeight: 23,
                color: "#C48148",
              }}
            >
              (人) put a spin on (事)
            </Text>
            <Text
              style={{
                fontWeight: "700",
                color: "#00B4B4",
                lineHeight: 25,
                fontSize: theme.FONT_SIZE_LARGE,
                marginLeft: 10,
              }}
              onPress={() =>
                navigation.push("sentenceanalysisPage", {
                  sentence: "put a spin on",
                })
              }
            >
              &#60; 看例句 &#62;
            </Text>
          </View>
          <Text
            style={{
              fontSize: theme.FONT_SIZE_LARGE,
              fontWeight: "700",
              marginBottom: 30,
              lineHeight: 23,
              color: "#C48148",
            }}
          >
            對...加油添醋
          </Text>
        </View>
      );
    });
  };
  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [0, -1 * screenHeight],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  return (
    <TouchableWithoutFeedback onPressIn={() => setIsOutside(true)}>
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
        />
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <View style={styles.sectionRow}>
              <View style={styles.actionsheet}>
                <Button
                  title=""
                  image={images.icons.leftarrow_icon}
                  customStyle={{}}
                  imageSize={{ height: 20, width: 12, marginRight: 0 }}
                  type=""
                  onPress={() => handleBack()}
                />
                <Button
                  title=""
                  image={images.icons.rightarrow_disable_icon}
                  customStyle={{}}
                  imageSize={{ height: 20, width: 12, marginRight: 0 }}
                  type=""
                  onPress={() => handleNext()}
                />
              </View>
              <Button
                title=""
                image={images.icons.close_icon}
                customStyle={{}}
                imageSize={{ height: 30, width: 30, marginRight: 0 }}
                type=""
                onPress={() => handleClose()}
              />
            </View>
            <View style={styles.content}>
              <View style={styles.topic}>
                <Image
                  style={styles.topicIcon}
                  source={Images.icons.arrow_icon}
                />
                <Text style={styles.topicTitle}> 原文 -</Text>
              </View>

              <Text
                style={{
                  fontSize: theme.FONT_SIZE_MEDIUM,
                  fontWeight: "400",
                  marginBottom: 30,
                  lineHeight: 25,
                }}
              >
                In this tutorial, you'll learn how to create a bottom sheet in
                react native app.
              </Text>
            </View>
            <View style={styles.content_analysis}>
              <View style={styles.topic}>
                <Image
                  style={styles.topicIcon}
                  source={Images.icons.arrow_icon}
                />
                <Text style={styles.topicTitle}> 解析 -</Text>
              </View>
              <View
                style={{
                  marginBottom: 30,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {renderAnalysisSection()}
              </View>
            </View>
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    backgroundColor: "rgba(0,0,0,.5)",
  },
  sheet: {
    position: "absolute",
    top: Dimensions.get("window").height,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: "700",
    marginBottom: 10,
  },
  topicTitle: {
    fontWeight: "bold",
  },
  topicIcon: {
    height: 16,
    width: 16,
    resizeMode: "contain",
    marginRight: 5,
  },
  popup: {
    backgroundColor: theme.COLOR_WHITE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: Dimensions.get("window").height - 54,

    paddingTop: 26,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  actionsheet: {
    width: 77,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  content: {
    paddingTop: 20,
    width: DEVICE_WIDTH - 40,
    flexDirection: "column",
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 0.5,
    marginHorizontal: 20,
  },
  content_analysis: {
    marginTop: 30,
    width: DEVICE_WIDTH - 40,
    marginHorizontal: 20,
    flexDirection: "column",
  },
  sentence_analysis: {
    fontSize: 17,
    lineHeight: 25.5,
    marginBottom: 6,
  },
});

export default wordAnalysisPage;
