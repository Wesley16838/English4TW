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
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import CheckBox from "../../components/Checkbox/Checkbox";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const resetPasswordPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const { title } = route.params;
  const [step, setStep] = React.useState(1);
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
  const handleBack = () => {
    if (step === 1) {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      navigation.goBack();
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };
  const renderStepImage = () => {
    switch (step) {
      case 1:
        return (
          <Image
            source={images.icons.progressbar_1_icon}
            style={{
              width: 105,
              height: 15,
              marginVertical: 30,
            }}
          />
        );
      case 2:
        return (
          <Image
            source={images.icons.progressbar_2_icon}
            style={{
              width: 105,
              height: 15,
              marginVertical: 30,
            }}
          />
        );
      case 3:
        return (
          <Image
            source={images.icons.progressbar_3_icon}
            style={{
              width: 105,
              height: 15,
              marginVertical: 30,
            }}
          />
        );
      case 4:
        break;
      default:
        break;
    }
  };
  const renderStepText = () => {
    switch (step) {
      case 1:
        return (
          <Text
            style={{
              fontSize: theme.FONT_SIZE_SMALL,
              color: theme.FONT_COLOR_GRAY,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            如需變更密碼, 請輸入之前設定的電子郵件帳號.
            系統將寄送認證碼至該郵件帳號內.
          </Text>
        );
      case 2:
        return (
          <Text
            style={{
              fontSize: theme.FONT_SIZE_SMALL,
              color: theme.FONT_COLOR_GRAY,
              textAlign: "center",
              marginBottom: 30,
            }}
          >
            請貼上郵件內含的認證碼, 或直接開啟郵件內連結進行操作.
          </Text>
        );
      case 3:
        break;
      case 4:
        break;
      default:
        break;
    }
  };
  const renderInputSection = () => {
    switch (step) {
      case 1:
        return (
          <InputBox
            OnChangeText={(str: string) => {}}
            customStyle={{
              width: DEVICE_WIDTH - 40,
              height: 40,
              marginBottom: 10,
            }}
            placeHolder={"輸入電子郵件帳號"}
            placeHolderTextColor={"#96CACA"}
            value={""}
          />
        );
      case 2:
        return (
          <InputBox
            OnChangeText={(str: string) => {}}
            customStyle={{
              width: DEVICE_WIDTH - 40,
              height: 40,
              marginBottom: 10,
            }}
            placeHolder={"請輸入驗證碼"}
            placeHolderTextColor={"#96CACA"}
            value={""}
          />
        );
      case 3:
        return (
          <>
            <InputBox
              OnChangeText={(str: string) => {}}
              customStyle={{
                width: DEVICE_WIDTH - 40,
                height: 40,
                marginBottom: 20,
                marginTop: 5,
              }}
              placeHolder={"密碼需有大小寫字母加數字"}
              placeHolderTextColor={"#96CACA"}
              value={""}
              title={"輸入新密碼"}
            />
            <InputBox
              OnChangeText={(str: string) => {}}
              customStyle={{
                width: DEVICE_WIDTH - 40,
                height: 40,
                marginBottom: 10,
                marginTop: 5,
              }}
              placeHolder={"再一次輸入新密碼"}
              placeHolderTextColor={"#96CACA"}
              value={""}
              title={"確認新密碼"}
            />
          </>
        );
      case 4:
        break;
      default:
        break;
    }
  };
  const buttonText = () => {
    switch (step) {
      case 1:
      case 2:
        return "下一步";
      case 3:
        return "確認";
      case 4:
        return "重新登入";
    }
  };
  return (
    <>
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
        />
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <View style={styles.sectionRow}>
              <View style={{ flex: 1, alignItems: "flex-start" }}>
                {step !== 4 && (
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
              <View style={{ alignItems: "center" }}>
                {step === 4 && (
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
                      密碼設定成功
                    </Text>
                  </View>
                )}
                {renderStepImage()}
                {renderStepText()}
                {renderInputSection()}
                {(step === 1 || step === 2) && (
                  <View
                    style={{
                      width: DEVICE_WIDTH - 40,
                      justifyContent: "flex-end",
                      flexDirection: "row",
                    }}
                  >
                    <Button
                      title={step === 1 ? "寄送確認碼" : "驗證"}
                      onPress={() => {
                        if (step === 1) {
                        } else if (step === 2) {
                        }
                      }}
                      customStyle={{
                        width: 115,
                        height: 30,
                        borderRadius: 16,
                      }}
                      imageSize={{}}
                      type="2"
                      image={""}
                      fontStyle={{}}
                    />
                  </View>
                )}
              </View>
            </View>
            <Button
              title={buttonText()}
              onPress={() => {
                if (step === 1) {
                  setStep(2);
                } else if (step === 2) {
                  setStep(3);
                } else if (step === 3) {
                  setStep(4);
                } else if (step === 4) {
                  navigation.navigate("loginPage");
                }
              }}
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
    position: "relative",
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

export default resetPasswordPage;
