import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import * as ImagePicker from "expo-image-picker";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import Actionsheet from "../../components/ActionSheet/ActionSheet";
import Button from "../../components/Button/Button";
import images from "../../assets/images";
import ModalContainer from "../../components/Modal/Modal";
import InputBox from "../../components/InputBox/InputBox";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Alert,
  TextStyle,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
import { setUserLogout } from "../../actions/user";
import { Dispatch } from "redux";
import { Colors, Spacing, Typography } from "../../styles";
import LinearGradientLayout from "../../components/LinearGradientLayout";

const personalprofilePage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const dispatch: Dispatch<any> = useDispatch();
  const {isLoggedIn}: any = useSelector(
    (state: any) => state.user,
    shallowEqual
  );
  const [actionsheet, openActionsheet] = React.useState(false);
  const [usernameModal, setUsernameModal] = React.useState(false);
  const [logoutModal, setLogoutModal] = React.useState(false);
  const [pickedImagePath, setPickedImagePath] = React.useState("");
  const options = ["移除目前的相片", "相機", "從相簿"];

  useEffect(() => {
    if(!isLoggedIn){
      navigation.push('settingPage')
    }
  }, [isLoggedIn])

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

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
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

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
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
              OnChangeText={(str: string) => {}}
              customStyle={{
                width: 240,
                height: 40,
                marginBottom: 35,
              }}
              placeHolder={"輸入姓名"}
              placeHolderTextColor={Colors.primary_light}
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
          onConfirm={() => {
            dispatch(setUserLogout())
            setLogoutModal(!logoutModal)
          }}
          confirmString={"確定"}
        />
      </Modal>
      <LinearGradientLayout>
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
              style={ Typography.pageTitle as TextStyle }
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
            fontStyle={{
              ...Typography.base_secondary
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
                        styles.info
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
                    { borderBottomColor: Colors.primary_light, borderBottomWidth: 1 },
                  ]}
                >
                  <Text style={styles.sectionText}>{"電子信箱"}</Text>
                  <Text
                    style={[
                      styles.sectionText,
                      styles.info
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
                        styles.info
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
                    { borderBottomColor: Colors.primary_light, borderBottomWidth: 1 },
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
                    color: Colors.light_red,
                    ...Typography.base_bold
                  }}
                >
                  登出
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </SafeAreaView>
      </LinearGradientLayout>
    </>
  );
};
const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: "row",
    height: 60,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.space_l,
    width: DEVICE_WIDTH,
    borderTopColor: Colors.primary_light,
    borderTopWidth: 1,
    backgroundColor: Colors.white,
  },
  sectionText: {},
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
    borderTopColor: Colors.primary_light,
    borderTopWidth: 1,
    backgroundColor: Colors.white,
    borderBottomColor: Colors.primary_light,
    borderBottomWidth: 1,
  },
  info: {
    ...Typography.base,
    color: Colors.info,
    marginRight: 11,
  }
});

export default personalprofilePage;
