import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  TextStyle,
} from "react-native";
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import images from "../../assets/images";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";
import { Colors, Typography } from "../../styles";

// TodoList: input onchange function
const resetPasswordPage = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route: RouteProp<{ params: { title: string } }, 'params'> = useRoute();
  const { title } = route.params;
  const [step, setStep] = useState(1);

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
            style={styles.content}
          >
            如需變更密碼, 請輸入之前設定的電子郵件帳號.
            系統將寄送認證碼至該郵件帳號內.
          </Text>
        );
      case 2:
        return (
          <Text
            style={styles.content}
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
            customStyle={{...styles.input, marginBottom: 10}}
            placeHolder={"輸入電子郵件帳號"}
            placeHolderTextColor={Colors.primary_light}
            value={""}
          />
        );
      case 2:
        return (
          <InputBox
            OnChangeText={(str: string) => {}}
            customStyle={{...styles.input, marginBottom: 10}}
            placeHolder={"請輸入驗證碼"}
            placeHolderTextColor={Colors.primary_light}
            value={""}
          />
        );
      case 3:
        return (
          <>
            <InputBox
              OnChangeText={(str: string) => {}}
              customStyle={{
                ...styles.input,
                marginBottom: 20,
                marginTop: 5,
              }}
              placeHolder={"密碼需有大小寫字母加數字"}
              placeHolderTextColor={Colors.primary_light}
              value={""}
              title={"輸入新密碼"}
            />
            <InputBox
              OnChangeText={(str: string) => {}}
              customStyle={{
                ...styles.input,
                marginBottom: 10,
                marginTop: 5,
              }}
              placeHolder={"再一次輸入新密碼"}
              placeHolderTextColor={Colors.primary_light}
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
                style={ Typography.pageTitle as TextStyle }
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
                      style={Typography.base_secondary}
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
                      type="2"
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
              type="2"
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
    backgroundColor: Colors.page_modal_background,
  },
  sheet: {
    position: "absolute",
    top: DEVICE_HEIGHT,
    left: 0,
    right: 0,
    height: "100%",
    justifyContent: "flex-end",
  },
  popup: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: DEVICE_HEIGHT - 54,

    paddingTop: 26,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.gray_4,
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
  content: {
    ...Typography.sm,
    color: Colors.gray_3,
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    width: DEVICE_WIDTH - 40,
    height: 40,
  }
});

export default resetPasswordPage;
