import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ProfileImage from "./../../components/profileimage/profileimage";
import Actionsheet from "./../../components/actionsheet/actionsheet";
import Button from "./../../components/button/button";
import theme from "./../../utilities/theme.style";
import images from "../../assets/images";
import ModalContainer from "./../../components/modal/modal";
import InputBox from "./../../components/inputbox/inputbox";

import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Alert,
  TouchableOpacity,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
const personalprofilePage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [actionsheet, openActionsheet] = React.useState(false);
  const [usernameModal, setUsernameModal] = React.useState(false);
  const [logoutModal, setLogoutModal] = React.useState(false);
  const [pickedImagePath, setPickedImagePath] = React.useState("");
  const options = ["移除目前的相片", "相機", "從相簿"];
  const handleBack = () => {
    navigation.goBack();
  };
  // This function is triggered when the "Select an image" button pressed
  const showImagePicker = async () => {
    // Ask the user for the permission to access the media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your photos!");
      return;
    }
    openActionsheet(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };
  // This function is triggered when the "Open camera" button pressed
  const openCamera = async () => {
    // Ask the user for the permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this appp to access your camera!");
      return;
    }
    openActionsheet(false);
    const result = await ImagePicker.launchCameraAsync();

    // Explore the result
    console.log(result);

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      console.log(result.uri);
    }
  };
  const handleOnAction = (str: string) => {
    switch (str) {
      case "移除目前的相片":
        setPickedImagePath("");
        break;
      case "相機":
        openCamera();
        break;
      case "從相簿":
        showImagePicker();
        break;
    }
  };
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={actionsheet}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <Actionsheet
          OnCancel={() => openActionsheet(false)}
          OnClick={(action: string) => handleOnAction(action)}
          options={options}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={usernameModal}
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
              placeHolder={"輸入姓名"}
              placeHolderTextColor={"#96CACA"}
              value={""}
            />
          }
          title={"更改姓名"}
          onCancel={() => setUsernameModal(!usernameModal)}
          onConfirm={() => setUsernameModal(!usernameModal)}
          confirmString={"確定"}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModal}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ModalContainer
          title={"確定要登出？"}
          onCancel={() => setLogoutModal(!logoutModal)}
          onConfirm={() => setLogoutModal(!logoutModal)}
          confirmString={"確定"}
        />
      </Modal>
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
              個人資訊
            </Text>
            <View style={{ flex: 1, alignItems: "flex-end" }} />
          </View>
          <ProfileImage
            name={
              pickedImagePath !== ""
                ? pickedImagePath
                : images.icons.default_profileimage
            }
            size={130}
            customStyle={{
              height: 130,
              width: 130,
              marginTop: 43,
              marginBottom: 20,
              borderRadius: 65,
            }}
          />
          <Button
            title="變更頭像"
            onPress={() => openActionsheet(!actionsheet)}
            customStyle={{
              flexDirection: "row",
              marginBottom: 40,
            }}
            imageSize={{
              width: 16,
              height: 16,
              marginRight: 7,
            }}
            type="text"
            image={""}
            fontStyle={{
              color: theme.SECONDARY_COLOR_DEFAULT,
            }}
          />
          <View>
            <View style={{ marginBottom: 40 }}>
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"姓名"}
                accessibilityHint={"姓名"}
                onPress={() => setUsernameModal(true)}
              >
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionText}>{"姓名"}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.sectionText,
                        {
                          marginRight: 11,
                          fontSize: theme.FONT_SIZE_MEDIUM,
                          color: "rgba(60, 60, 67, 0.6)",
                        },
                      ]}
                    >
                      {"Samalia Juda"}
                    </Text>
                    <Image
                      style={styles.sectionArrow}
                      source={images.icons.rightarrow_icon}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"電子信箱"}
                accessibilityHint={"電子信箱"}
                onPress={() => navigation.push("personalprofilePage")}
              >
                <View
                  style={[
                    styles.sectionRow,
                    { borderBottomColor: "#96CACA", borderBottomWidth: 1 },
                  ]}
                >
                  <Text style={styles.sectionText}>{"電子信箱"}</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      {
                        marginRight: 11,
                        fontSize: theme.FONT_SIZE_MEDIUM,
                        color: "rgba(60, 60, 67, 0.6)",
                      },
                    ]}
                  >
                    {"mercucu@gmail.com"}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{ marginBottom: 40 }}>
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"進階功能"}
                accessibilityHint={"進階功能"}
                onPress={() => navigation.push("subscriptPage")}
              >
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionText}>{"進階功能"}</Text>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.sectionText,
                        {
                          marginRight: 11,
                          fontSize: theme.FONT_SIZE_MEDIUM,
                          color: "rgba(60, 60, 67, 0.6)",
                        },
                      ]}
                    >
                      {"30天方案"}
                    </Text>
                    <Image
                      style={styles.sectionArrow}
                      source={images.icons.rightarrow_icon}
                    />
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"訂單記錄"}
                accessibilityHint={"訂單記錄"}
                onPress={() => navigation.push("orderhistoryPage")}
              >
                <View
                  style={[
                    styles.sectionRow,
                    { borderBottomColor: "#96CACA", borderBottomWidth: 1 },
                  ]}
                >
                  <Text style={styles.sectionText}>{"訂單記錄"}</Text>
                  <Image
                    style={styles.sectionArrow}
                    source={images.icons.rightarrow_icon}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>

            <TouchableWithoutFeedback onPress={() => setLogoutModal(true)}>
              <View style={styles.sectionButton}>
                <Text
                  style={{
                    textAlign: "center",
                    color: "#FF3B30",
                    fontSize: theme.FONT_SIZE_MEDIUM,
                    fontWeight: "bold",
                  }}
                >
                  登出
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
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
    backgroundColor: theme.COLOR_WHITE,
  },
  sectionText: {},
  version: {
    color: "rgba(60, 60, 67, 0.6)",
  },
  sectionArrow: {
    width: 7,
    height: 12,
  },
  sectionButton: {
    flexDirection: "row",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    width: DEVICE_WIDTH,
    borderTopColor: "#96CACA",
    borderTopWidth: 1,
    backgroundColor: theme.COLOR_WHITE,
    borderBottomColor: "#96CACA",
    borderBottomWidth: 1,
  },
});

export default personalprofilePage;
