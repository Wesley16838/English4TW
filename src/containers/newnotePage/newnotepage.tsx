import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import Button from "./../../components/button/button";
import InputBox from "./../../components/inputbox/inputbox";
import TextArea from "./../../components/textarea/textarea";
import ModalContainer from "./../../components/modal/modal";
import Images from "./../../assets/images";
import Label from "./../../components/label/label";
import TabView from "./../../components/tabview/tabview";
import Tag from "./../../components/tag/tag";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH } from "../splashpage";
const newNotePage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [tags, setTags] = React.useState([
    "經典生活引語",
    "科技",
    "文法基礎",
    "心理",
    "運動",
    "建築",
  ]);
  const [note, setNote] = useState({
    title: "",
    content: "",
  });
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
  const handleRemove = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
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
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ModalContainer
          children={
            <InputBox
              OnChangeText={(str: string) => console.log(str)}
              customStyle={{
                width: 240,
                height: 40,
                marginBottom: 35,
              }}
              placeHolder={"輸入標籤"}
              placeHolderTextColor={"#96CACA"}
              value={""}
            />
          }
          title={"新增標籤"}
          onCancel={() => setModalVisible(!modalVisible)}
          onConfirm={() => setModalVisible(!modalVisible)}
        />
      </Modal>

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
                  image={images.icons.delete_icon}
                  customStyle={{}}
                  imageSize={{ height: 30, width: 30 }}
                  type=""
                  onPress={() => handleRemove()}
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
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <InputBox
                OnChangeText={(str: string) => setNote({ ...note, title: str })}
                customStyle={{
                  width: DEVICE_WIDTH - 40,
                  height: 40,
                  marginTop: 20,
                  marginBottom: 20,
                }}
                placeHolder={"輸入標題"}
                placeHolderTextColor={"#96CACA"}
                value={note.title}
              />
              <TextArea
                OnClick={(str: string) => setNote({ ...note, content: str })}
                source={Images.icons.microCircle_icon}
                placeHolder={"輸入內容"}
                customStyle={{
                  width: DEVICE_WIDTH - 40,
                  height: 270,
                  marginBottom: 20,
                }}
                placeHolderTextColor={"#96CACA"}
                limit={1000}
              />
              <View style={styles.sectionContainer}>
                <Button
                  title="+"
                  image={""}
                  customStyle={{
                    width: 38,
                    height: 24,
                    borderRadius: 25,
                    marginRight: 5,
                  }}
                  imageSize={{}}
                  type="2"
                  onPress={() => setModalVisible(true)}
                />
                {Array.isArray(tags) &&
                  tags.map((tag, index) => {
                    return (
                      <Tag
                        key={index}
                        title={tag}
                        OnClick={() => console.log("add")}
                        customStyle={{
                          paddingHorizontal: 15,
                          paddingVertical: 3,
                          marginRight: 5,
                          marginBottom: 5,
                          height: 24,
                        }}
                        disable={false}
                      />
                    );
                  })}
              </View>
              <View style={{ paddingHorizontal: 20 }}>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{"\u2022" + " "}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text
                      style={{
                        color: theme.FONT_COLOR_GRAY,
                        fontSize: theme.FONT_SIZE_SUPER_SMALL,
                        lineHeight: 12,
                      }}
                    >
                      你可以新增英文和中文到筆記裡,
                      英文可以使用發音和單字查詢功能, 中文則無.
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{"\u2022" + " "}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text
                      style={{
                        color: theme.FONT_COLOR_GRAY,
                        fontSize: theme.FONT_SIZE_SUPER_SMALL,
                        lineHeight: 12,
                      }}
                    >
                      為避免影響音擋播放功能,
                      點擊播放鍵後開始20秒內將無法操作其他功能.
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{"\u2022" + " "}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text
                      style={{
                        color: theme.FONT_COLOR_GRAY,
                        fontSize: theme.FONT_SIZE_SUPER_SMALL,
                        lineHeight: 12,
                      }}
                    >
                      若要改變音擋的播放段落, 將文章依需求段行即可
                    </Text>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{"\u2022" + " "}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text
                      style={{
                        color: theme.FONT_COLOR_GRAY,
                        fontSize: theme.FONT_SIZE_SUPER_SMALL,
                        lineHeight: 12,
                      }}
                    >
                      長按標籤即可進行編輯/刪除
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                title="完成"
                image={""}
                customStyle={{
                  width: 335,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 25,
                }}
                fontStyle={{
                  fontWeight: "bold",
                  fontSize: theme.FONT_SIZE_MEDIUM,
                }}
                imageSize={{}}
                type="2"
                onPress={() => handleClose()}
              />
            </View>
          </Animated.View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  bullet: {
    width: 10,
  },
  bulletText: {},
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
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
  sectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: theme.COLOR_WHITE,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 21,
  },
  actionsheet: {
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
  nonBlurredContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    borderRadius: 14,
    paddingTop: 19,
    backgroundColor: theme.COLOR_WHITE,
    width: 270,
    alignItems: "center",
  },
});

export default newNotePage;
