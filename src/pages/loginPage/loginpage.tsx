import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Image,
  Text,
} from "react-native";
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import CheckBox from "../../components/Checkbox/Checkbox";
import images from "../../assets/images";
import { setUserLogin } from "../../actions/user";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { Colors, Spacing, Typography } from "../../styles";

const loginPage = ({ navigation, route }: { navigation: any; route: any }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const isLoggedIn: any = useSelector(
    (state: any) => state.user.isLoggedIn,
    shallowEqual
  );
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [account, setAccount] = useState({
    email: "",
    password: "",
  });
  const [checked, onCheck] = useState(false);
  const screenHeight = Dimensions.get("window").height;
  useEffect(()=>{
    if(isLoggedIn){
      navigation.push('settingPage')
    }
  }, [isLoggedIn])
  const handleOnFacebookLogin = () => {};
  const handleOnLogin = async () => {
    try {
      dispatch(setUserLogin({
        email: account.email,
        password: account.password
      }));
    } catch (err) {
      console.error("err", err);
    }
  };
  const onCreateAccount = () => {
    navigation.push("createaccountPage");
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
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
        />
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
            <View style={styles.sectionRow}>
              <Button
                title=""
                image={images.icons.close_icon}
                imageSize={{ height: 30, width: 30, marginRight: 0 }}
                type=""
                onPress={() => handleClose()}
              />
            </View>
            <View style={styles.sectionContainer}>
              <Image
                source={images.icons.launch_icon}
                style={{ width: 85, height: 85 }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.gray_3,
                  textAlign: "center",
                  marginTop: 30,
                  marginBottom: 15,
                }}
              >
                為使本產品達到最佳使用體驗,
                建議用戶使用上方Facebook登入綁定會員帳戶.
              </Text>
              <Button
                title="使用 Facebook 帳號登入"
                image={images.icons.facebook_icon}
                customStyle={{
                  flexDirection: "row",
                  borderRadius: 25,
                  height: 50,
                  width: DEVICE_WIDTH - 40,
                }}
                imageSize={{ width: 30, height: 30, marginRight: 7.5 }}
                fontStyle={{ fontWeight: "bold" }}
                type="facebook"
                onPress={handleOnFacebookLogin}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 30,
                }}
              >
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.gray_4,
                    width: DEVICE_WIDTH - 246,
                  }}
                />
                <Text style={{ marginHorizontal: 10 }}>或</Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: Colors.gray_4,
                    width: DEVICE_WIDTH - 246,
                  }}
                />
              </View>
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
                placeHolderTextColor={Colors.primary_light}
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
                placeHolderTextColor={Colors.primary_light}
                value={account.password}
                title={"密碼"}
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
                  OnClick={(boo: boolean) => onCheck(boo)}
                  customStyle={{
                    width: 20,
                    height: 20,
                  }}
                  title={"保持登入"}
                />
                <TouchableWithoutFeedback
                  onPress={() => navigation.push("resetpasswordPage")}
                >
                  <Text
                    style={{
                      color: Colors.gray_3,
                      ...Typography.base,
                    }}
                  >
                    重設密碼
                  </Text>
                </TouchableWithoutFeedback>
              </View>
              <Button
                title="登入"
                onPress={() => handleOnLogin()}
                customStyle={{
                  width: DEVICE_WIDTH - 40,
                  height: 50,
                  borderRadius: 25,
                  marginVertical: Spacing.space_l,
                }}
                type="2"
              />
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={{
                    color: Colors.gray_3,
                    ...Typography.base,
                  }}
                >
                  還沒創建帳戶嗎？
                </Text>
                <TouchableWithoutFeedback onPress={() => onCreateAccount()}>
                  <Text
                    style={{
                      color: Colors.gray_3,
                      ...Typography.base_bold,
                    }}
                  >
                    點擊創建新帳戶
                  </Text>
                </TouchableWithoutFeedback>
              </View>
            </View>
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
    backgroundColor: Colors.page_modal_background,
  },
  sheet: {
    height: "100%",
    justifyContent: "flex-end",
    position: "absolute",
    top: DEVICE_HEIGHT,
    left: 0,
    right: 0,    
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
    paddingHorizontal: Spacing.space_l,
    paddingBottom: Spacing.space_l,
  },
  sectionContainer: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: Spacing.space_l,
  },
  actionsheet: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default loginPage;
