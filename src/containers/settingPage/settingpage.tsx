import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ProfileImage from "./../../components/profileimage/profileimage";
import Button from "./../../components/button/button";
import theme from "./../../utilities/theme.style";
import images from "../../assets/images";
import ModalContainer from "./../../components/modal/modal";
import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Image,
  Switch,
  Modal,
  Alert,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
const settingPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const handleOnClick = () => {};
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [modalVisible, setModalVisible] = useState(false);
  const isLoggedIn: any = useSelector(
    (state: any) => state.user.isLoggedIn,
    shallowEqual
  );
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
          content={["慢", "中", "快"]}
          title={"播放速度"}
          onCancel={() => setModalVisible(false)}
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
          <ProfileImage
            name={images.icons.default_profileimage}
            size={130}
            customStyle={{
              height: 130,
              width: 130,
              marginTop: 25,
              marginBottom: 20,
              borderRadius: 65,
            }}
          />
          <Button
            title="登入"
            onPress={() => navigation.push("loginPage")}
            customStyle={{
              width: 150,
              height: 36,
              borderRadius: 20,
              flexDirection: "row",
              marginBottom: 44,
            }}
            imageSize={{
              width: 16,
              height: 16,
              marginRight: 7,
            }}
            type="1"
            image={""}
          />
          <View>
            {true && (
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"個人資訊"}
                accessibilityHint={"個人資訊"}
                onPress={() => navigation.push("personalprofilePage")}
              >
                <View style={styles.sectionRow}>
                  <Text style={styles.sectionText}>{"個人資訊"}</Text>
                  <Image
                    style={styles.sectionArrow}
                    source={images.icons.rightarrow_icon}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            <TouchableWithoutFeedback
              accessible={true}
              accessibilityLabel={"特色介紹"}
              accessibilityHint={"特色介紹"}
              onPress={() => console.log("coming soon")}
            >
              <View style={styles.sectionRow}>
                <Text style={styles.sectionText}>{"特色介紹"}</Text>
                <Image
                  style={styles.sectionArrow}
                  source={images.icons.rightarrow_icon}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              accessible={true}
              accessibilityLabel={"意見回饋"}
              accessibilityHint={"意見回饋"}
              onPress={() => navigation.push("reviewPage")}
            >
              <View style={styles.sectionRow}>
                <Text style={styles.sectionText}>{"意見回饋"}</Text>
                <Image
                  style={styles.sectionArrow}
                  source={images.icons.rightarrow_icon}
                />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              accessible={true}
              accessibilityLabel={"開發版號"}
              accessibilityHint={"開發版號"}
              onPressIn={() => {}}
              onPressOut={() => {}}
            >
              <View style={[styles.sectionRow]}>
                <Text style={styles.sectionText}>{"開發版號"}</Text>
                <Text style={styles.version}>{"0.2.1"}</Text>
              </View>
            </TouchableWithoutFeedback>
            {true && (
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"離線模式"}
                accessibilityHint={"離線模式"}
                onPressIn={() => {}}
                onPressOut={() => {}}
              >
                <View style={[styles.sectionRow]}>
                  <Text style={styles.sectionText}>{"離線模式"}</Text>
                  <Switch
                    trackColor={{
                      false: "rgba(120, 120, 128, 0.16)",
                      true: theme.PRIMARY_COLOR_DEFAULT,
                    }}
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
            {true && (
              <TouchableWithoutFeedback
                accessible={true}
                accessibilityLabel={"播放速度"}
                accessibilityHint={"播放速度"}
                onPress={() => setModalVisible(true)}
              >
                <View
                  style={[
                    styles.sectionRow,
                    { borderBottomColor: "#96CACA", borderBottomWidth: 1 },
                  ]}
                >
                  <Text style={styles.sectionText}>{"播放速度"}</Text>
                  <Image
                    style={styles.sectionArrow}
                    source={images.icons.rightarrow_icon}
                  />
                </View>
              </TouchableWithoutFeedback>
            )}
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
});

export default settingPage;
