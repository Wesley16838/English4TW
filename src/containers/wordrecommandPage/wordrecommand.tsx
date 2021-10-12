import React, { useState } from "react";
import axios from "axios";
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
import Button from "../../components/button/button";
import Images from "../../assets/images";
import Label from "../../components/label/label";
import TabView from "../../components/tabview/tabview";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH } from "../splashpage";
import { apiConfig } from "../../config/api";
const wordRecommandPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { word } = route.params;
  React.useEffect(() => {
    const fetchDailyWords = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "babylon");
        formData.append("text", word);
        const result = await axios({
          method: "post",
          url: "https://www.english4tw.com/blog/post/translate",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        fetch("https://www.english4tw.com/blog/post/translate", {
          method: "post",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => res.json())
          .then((response) => console.log("fetch response", response))
          .catch((err) => console.log("err", err));
      } catch (err) {
        console.log("err,", err.message);
      }
    };
    fetchDailyWords();
  }, []);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;

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
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  const handleNext = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.push("wordanalysisPage");
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
            <Text style={styles.recommandWord}>bacterium</Text>
            <Text style={styles.recommandWordKK}>/bacterium/</Text>
            <View style={styles.labelContainer}>
              <Label title={"n. 單數名詞"} customStyle={{}} />
            </View>
            <Text style={styles.recommandWordDes}>bacterium</Text>
          </View>
          <View
            style={{
              width: screenWidth - 40,
              marginHorizontal: 20,
              marginBottom: 30,
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              paddingTop: 33,
              paddingBottom: 23,
              borderBottomWidth: 1,
              borderBottomColor: theme.BORDER_COLOR,
            }}
          >
            <Button
              title=""
              image={images.icons.share_icon}
              customStyle={{}}
              imageSize={{ height: 30, width: 30, marginRight: 0 }}
              type=""
              onPress={() => handleClose()}
            />
            <Button
              title=""
              image={images.icons.volume_icon}
              customStyle={{}}
              imageSize={{ height: 30, width: 30, marginRight: 0 }}
              type=""
              onPress={() => handleClose()}
            />
            <Button
              title=""
              image={images.icons.saved_icon}
              customStyle={{}}
              imageSize={{ height: 30, width: 30, marginRight: 0 }}
              type=""
              onPress={() => handleClose()}
            />
            <Button
              title=""
              image={images.icons.speed_secondary_icon}
              customStyle={{}}
              imageSize={{ height: 30, width: 30, marginRight: 0 }}
              type=""
              onPress={() => handleClose()}
            />
          </View>
          <TabView
            titles={["相關字彙", "例句"]}
            customStyle={{ width: screenWidth - 40, marginHorizontal: 20 }}
            children={[
              <View style={styles.labelTabContainer} key={1}>
                <Label title={"同義字"} customStyle={{ marginBottom: 20 }} />
                <Text>bacteria</Text>
              </View>,
              <View style={styles.labelTabContainer} key={2}>
                <View style={{ flexDirection: "row" }}>
                  <Label
                    title={"n. 單數名詞"}
                    customStyle={{ marginBottom: 20 }}
                  />
                  <TouchableOpacity onPress={() => setIsOpenModal(true)}>
                    <Image
                      style={styles.speedIcon}
                      source={Images.icons.speed_icon}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Image
                    style={styles.volumeIcon}
                    source={Images.icons.volume_icon}
                  />
                  <Text>
                    The strands were then injected into the bacterium.
                  </Text>
                </View>
              </View>,
            ]}
          />
        </Animated.View>
      </View>
    </View>
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
    paddingHorizontal: 20,
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
  recommandWord: {
    fontSize: theme.FONT_SIZE_EXTREME_LARGE,
    fontWeight: "700",
  },
  recommandWordKK: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontWeight: "500",
    color: theme.FONT_COLOR_GRAY,
    marginTop: 5,
    marginBottom: 20,
  },
  recommandWordDes: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: "500",
    lineHeight: 25,
    marginTop: 8,
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  labelTabContainer: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  speedIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginLeft: 5,
  },
  volumeIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
});

export default wordRecommandPage;
