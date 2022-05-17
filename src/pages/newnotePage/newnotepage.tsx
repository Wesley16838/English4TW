import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Modal,
  Alert,
} from "react-native";
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import TextArea from "../../components/TextArea/TextArea";
import ModalContainer from "../../components/Modal/Modal";
import Images from "./../../assets/images";
import Tag from "../../components/Tag/Tag";
import { Colors, Spacing, Typography } from "../../styles";
import images from "../../assets/images";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp, NavigationProp, ParamListBase } from '@react-navigation/native';
const newNotePage = () => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route: RouteProp<{ params: { title: string } }, 'params'> = useRoute();
  const { title } = route.params;
  const tags = [
    "經典生活引語",
    "科技",
    "文法基礎",
    "心理",
    "運動",
    "建築",
  ];
  const [note, setNote] = useState({
    title: title,
    content: "",
  });
  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [DEVICE_HEIGHT, 0],
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
          outputRange: [0, -1 * DEVICE_HEIGHT],
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
              OnChangeText={(str: string) => {}}
              customStyle={{
                width: 240,
                height: 40,
                marginBottom: 35,
              }}
              placeHolder={"輸入標籤"}
              placeHolderTextColor={Colors.primary_light}
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
                  marginTop: Spacing.space_l,
                  marginBottom: Spacing.space_l,
                }}
                placeHolder={"輸入標題"}
                placeHolderTextColor={Colors.primary_light}
                value={note.title}
              />
              <TextArea
                OnClick={(str: string) => setNote({ ...note, content: str })}
                source={Images.icons.microCircle_icon}
                placeHolder={"輸入內容"}
                customStyle={{
                  width: DEVICE_WIDTH - 40,
                  height: 270,
                  marginBottom: Spacing.space_l,
                }}
                placeHolderTextColor={Colors.primary_light}
                limit={1000}
              />
              <View style={styles.sectionContainer}>
                <Button
                  title="+"
                  customStyle={{
                    width: 38,
                    height: 24,
                    borderRadius: 25,
                    marginRight: 5,
                  }}
                  type="2"
                  onPress={() => setModalVisible(true)}
                />
                {Array.isArray(tags) &&
                  tags.map((tag, index) => {
                    return (
                      <Tag
                        key={index}
                        title={tag}
                        OnClick={() => {}}
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
              <View style={{ paddingHorizontal: Spacing.space_l }}>
                <View style={styles.row}>
                  <View style={styles.bullet}>
                    <Text>{"\u2022" + " "}</Text>
                  </View>
                  <View style={styles.bulletText}>
                    <Text
                      style={styles.info}
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
                      style={styles.info}
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
                      style={styles.info}
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
                      style={styles.info}
                    >
                      長按標籤即可進行編輯/刪除
                    </Text>
                  </View>
                </View>
              </View>
              <Button
                title="完成"
                customStyle={{
                  width: 335,
                  height: 50,
                  borderRadius: 25,
                  marginTop: 25,
                }}
                fontStyle={{
                  ...Typography.base_bold
                }}
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
    backgroundColor: Colors.page_modal_background,
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
    ...Typography.base_bold,
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
    backgroundColor: Colors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: Dimensions.get("window").height - 54,

    paddingTop: 26,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.gray_4,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  sectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
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
  info: {
    ...Typography.sm,
      color: Colors.gray_3,
      lineHeight: 12,
  }
});

export default newNotePage;
