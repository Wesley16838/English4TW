import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Text,
  Modal,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "./../../components/button/button";
import InputBox from "./../../components/inputbox/inputbox";
import CheckBox from "./../../components/checkbox/checkbox";
import ProfileImage from "./../../components/profileimage/profileimage";
import Actionsheet from "./../../components/actionsheet/actionsheet";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { apiConfig } from "./../../config/api";

const createaccountPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const { title } = route.params;
  const [account, setAccount] = React.useState({
    fullname: "",
    email: "",
    password: "",
    secondpassword: "",
    tos: false,
  });
  const [checked, onCheck] = React.useState(false);
  const [step, setStep] = React.useState(1);
  const [actionsheet, openActionsheet] = React.useState(false);
  const [pickedImagePath, setPickedImagePath] = React.useState("");
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const options = ["移除目前的相片", "相機", "從相簿"];
  const handleOnFacebookLogin = () => {};
  const handleOnLogin = () => {};
  const onCreateAccountNext = async () => {
    try {
      let formData = new FormData();
      formData.append("data", JSON.stringify(account));
      await apiConfig.post("/registration", {
        formData,
      });
      setStep(2);
    } catch (err) {
      console.log("err,", err);
    }
  };
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
    navigation.navigate("loginPage");
  };
  const handleBack = () => {
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
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
        />
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <View style={styles.sectionRow}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                {step === 1 && (
                  <Button
                    title=""
                    image={images.icons.leftarrow_icon}
                    customStyle={{}}
                    imageSize={{ height: 20, width: 12, marginRight: 0 }}
                    type=""
                    onPress={() => handleBack()}
                  />
                )}
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
                {title}
              </Text>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Button
                  title=""
                  image={images.icons.close_icon}
                  customStyle={{}}
                  imageSize={{ height: 30, width: 30, marginRight: 0 }}
                  type=""
                  onPress={() => handleClose()}
                />
              </View>
            </View>
            <View style={styles.sectionContainer}>
              {step === 2 && (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 66,
                  }}
                >
                  <Image
                    source={images.icons.success_icon}
                    style={{ width: 205, height: 205, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      color: theme.SECONDARY_COLOR_DEFAULT,
                      fontSize: theme.FONT_SIZE_MEDIUM,
                    }}
                  >
                    請至電子郵件收發帳戶認證信件, 方能完成註冊程序.
                  </Text>
                </View>
              )}
              {step === 1 && (
                <View style={{ alignItems: "center" }}>
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
                      marginTop: 25,
                      marginBottom: 20,
                      borderRadius: 65,
                    }}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => openActionsheet(!actionsheet)}
                  >
                    <Text
                      style={{
                        color: theme.SECONDARY_COLOR_DEFAULT,
                        fontSize: theme.FONT_SIZE_MEDIUM,
                        marginBottom: 34,
                      }}
                    >
                      變更頭像
                    </Text>
                  </TouchableWithoutFeedback>
                  <InputBox
                    OnChangeText={(str: string) =>
                      setAccount({
                        ...account,
                        fullname: str,
                      })
                    }
                    customStyle={{
                      width: DEVICE_WIDTH - 40,
                      height: 40,
                      marginTop: 6,
                      marginBottom: 20,
                    }}
                    placeHolder={"例如：王小明"}
                    placeHolderTextColor={"#96CACA"}
                    value={account.email}
                    title={"姓名"}
                  />
                  <InputBox
                    OnChangeText={(str: string) =>
                      setAccount({
                        ...account,
                        email: str,
                      })
                    }
                    customStyle={{
                      width: DEVICE_WIDTH - 40,
                      height: 40,
                      marginTop: 6,
                      marginBottom: 20,
                    }}
                    placeHolder={"例如：XXXXXX@gmail.com"}
                    placeHolderTextColor={"#96CACA"}
                    value={account.email}
                    title={"電子信箱"}
                  />
                  <InputBox
                    OnChangeText={(str: string) =>
                      setAccount({
                        ...account,
                        password: str,
                      })
                    }
                    customStyle={{
                      width: DEVICE_WIDTH - 40,
                      height: 40,
                      marginTop: 6,
                      marginBottom: 20,
                    }}
                    placeHolder={"需有大小寫字母加數字"}
                    placeHolderTextColor={"#96CACA"}
                    value={account.email}
                    title={"密碼"}
                  />
                  <InputBox
                    OnChangeText={(str: string) =>
                      setAccount({
                        ...account,
                        secondpassword: str,
                      })
                    }
                    customStyle={{
                      width: DEVICE_WIDTH - 40,
                      height: 40,
                      marginTop: 6,
                      marginBottom: 20,
                    }}
                    placeHolder={"再一次輸入密碼"}
                    placeHolderTextColor={"#96CACA"}
                    value={account.email}
                    title={"確認密碼"}
                  />
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: DEVICE_WIDTH - 40,
                    }}
                  >
                    <CheckBox
                      checked={checked}
                      OnClick={(boo: boolean) =>
                        setAccount({
                          ...account,
                          tos: !account.tos,
                        })
                      }
                      customStyle={{
                        width: 20,
                        height: 20,
                      }}
                      title={"我已閱讀並同意English4Tw的隱私政策"}
                    />
                  </View>
                </View>
              )}
            </View>
            <Button
              title={step === 1 ? "下一步" : "完成"}
              onPress={
                step === 1
                  ? onCreateAccountNext
                  : () => {
                      navigation.navigate("loginPage");
                    }
              }
              customStyle={{
                width: DEVICE_WIDTH - 40,
                height: 50,
                borderRadius: 25,
                position: "absolute",
                bottom: 34,
                left: 20,
              }}
              imageSize={{}}
              type="2"
              image={""}
              fontStyle={{}}
            />
          </Animated.View>
        </View>
      </View>
    </>
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
  popup: {
    backgroundColor: theme.COLOR_WHITE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: Dimensions.get("window").height - 54,

    paddingTop: 26,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.FONT_COLOR_GRAY4,
  },
  sectionContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 20,
    height: DEVICE_HEIGHT - 54 - 77,
  },
  actionsheet: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default createaccountPage;
