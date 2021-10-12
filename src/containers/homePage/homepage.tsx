import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Dimensions,
  Modal,
  TouchableHighlight,
  Alert,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import ModalContainer from "../../components/modal/modal";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Dispatch } from "redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { apiConfig } from "../../config/api";
import SearchBox from "../../components/searchbox/searchbox";
import TextArea from "../../components/textarea/textarea";
import InputBox from "../../components/inputbox/inputbox";
import Button from "../../components/button/button";
import Images from "../../assets/images";
import Card from "../../components/card/card";
import theme from "../../utilities/theme.style";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";

const homePage = ({ navigation, route }: { navigation: any; route: any }) => {
  const dispatch: Dispatch<any> = useDispatch();
  const [dailyWords, setDailyWords] = React.useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [compareWords, setCompareWords] = React.useState({
    first: "",
    second: "",
  });
  const [analysis, setAnalysis] = React.useState("");
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const insets = useSafeAreaInsets();
  const isLoggedIn: any = useSelector(
    (state: any) => state.user.isLoggedIn,
    shallowEqual
  );
  const dailyword: string = useSelector(
    (state: any) => state.word.dailyword,
    shallowEqual
  );
  React.useEffect(() => {
    let formData = new FormData();
    formData.append("type", "babylon");
    formData.append("text", "universal");
    fetch("https://www.english4tw.com/blog/post/translate", {
      method: "post",
      body: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => res.json())
      .then((response) => console.log("response", response))
      .catch((err) => console.log("err", err));
  }, []);

  const handleOnSearch = () => {};
  const handleOnCompare = () => {
    navigation.push("wordcomparePage", {
      first: compareWords.first,
      second: compareWords.second,
    });
    setCompareWords({
      first: "",
      second: "",
    });
  };
  const handleOnAnalyze = (str: string) => {
    navigation.push("wordanalysisPage");
  };
  const handleOnWordRecommand = (str: string) => {
    navigation.push("wordrecommandPage", {
      word: str,
    });
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
          content={["初級", "初中級", "中級", "中高級", "高級"]}
          title={"字彙難度"}
          onCancel={() => setModalVisible(!modalVisible)}
        />
      </Modal>

      <LinearGradient
        colors={[theme.BACKGROUND_COLOR_1, theme.BACKGROUND_COLOR_2]}
        style={styles.container}
      >
        <SafeAreaView style={{ marginTop: 10 }}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: insets.bottom }}
          >
            <SearchBox
              customStyle={{ marginBottom: 5, width: DEVICE_WIDTH - 40 }}
              OnClick={() => handleOnSearch()}
              placeHolder={"點擊收尋字會或片語"}
              placeHolderTextColor={"rgba(196, 129, 72, 0.5)"}
            />
            <View style={styles.section}>
              <View style={styles.topic}>
                <Image
                  style={styles.topicIcon}
                  source={Images.icons.arrow_icon}
                />
                <Text style={styles.topicTitle}>詞句分析</Text>
              </View>
              <TextArea
                OnClick={(str: string) => handleOnAnalyze(str)}
                source={Images.icons.microCircle_icon}
                placeHolder={"輸入內容"}
                customStyle={{ width: DEVICE_WIDTH - 40, height: 150 }}
                placeHolderTextColor={"#96CACA"}
                limit={100}
              />
            </View>
            <View style={styles.section}>
              <View style={styles.topic}>
                <Image
                  style={styles.topicIcon}
                  source={Images.icons.arrow_icon}
                />
                <Text style={styles.topicTitle}>推薦字彙</Text>
              </View>
              <Card
                title={"Quarantine"}
                OnClick={(str: string) => handleOnWordRecommand(str)}
                customStyle={{ width: DEVICE_WIDTH - 40 }}
                kk={"/eerrkkr/"}
                detail={"stay at home"}
                buttons={[Images.icons.volume_icon, Images.icons.favorite_icon]}
              />
            </View>
            <View style={styles.section}>
              <View style={styles.topicOther}>
                <View style={{ flexDirection: "row" }}>
                  <Image
                    style={styles.topicIcon}
                    source={Images.icons.arrow_icon}
                  />
                  <Text style={styles.topicTitle}>每日字彙</Text>
                </View>

                <TouchableOpacity
                  onPress={() => {
                    // setIsOpenModal(true);
                    setModalVisible(true);
                  }}
                >
                  <Image
                    style={styles.filterIcon}
                    source={Images.icons.filter_icon}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.daily}>
                {dailyWords.length > 0 ? (
                  <Card
                    title={dailyword}
                    OnClick={() => handleOnWordRecommand(dailyword)}
                    customStyle={{ width: DEVICE_WIDTH - 40 }}
                    kk={"KK Content"}
                    detail={dailyWords[0].url}
                    buttons={[
                      Images.icons.volume_icon,
                      Images.icons.favorite_icon,
                    ]}
                  />
                ) : null}
              </View>
            </View>
            <View style={styles.section}>
              <View style={styles.topic}>
                <Image
                  style={styles.topicIcon}
                  source={Images.icons.arrow_icon}
                />
                <Text style={styles.topicTitle}>字彙比較</Text>
              </View>
              <View style={styles.sectionRow}>
                <View style={styles.sectioninnerRow}>
                  <InputBox
                    OnChangeText={(str: string) =>
                      setCompareWords({ ...compareWords, first: str })
                    }
                    customStyle={{
                      width: 105,
                      height: 40,
                    }}
                    placeHolder={"輸入內容"}
                    placeHolderTextColor={"#96CACA"}
                    value={compareWords.first}
                  />
                  <Text
                    style={{
                      height: 40,
                      lineHeight: 40,
                      textAlignVertical: "center",
                      marginHorizontal: 10,
                      fontWeight: "bold",
                      color: "rgba(0, 0, 0, 0.4)",
                    }}
                  >
                    vs
                  </Text>
                  <InputBox
                    OnChangeText={(str: string) =>
                      setCompareWords({ ...compareWords, second: str })
                    }
                    customStyle={{
                      width: 105,
                      height: 40,
                    }}
                    placeHolder={"輸入內容"}
                    placeHolderTextColor={"#96CACA"}
                    value={compareWords.second}
                  />
                </View>
                <Button
                  title="比較"
                  onPress={() => handleOnCompare()}
                  customStyle={{
                    width: 72,
                    height: 30,
                    borderRadius: 16,
                  }}
                  imageSize={{
                    width: 16,
                    height: 16,
                    marginRight: 7,
                  }}
                  type="2"
                  image={""}
                  fontStyle={{}}
                />
              </View>
            </View>
          </ScrollView>
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
    paddingHorizontal: 20,
  },
  section: {
    width: "100%",
    flexDirection: "column",
    marginTop: 20,
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  topicOther: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  sectionRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectioninnerRow: {
    flexDirection: "row",
  },
  daily: {
    flexDirection: "column",
  },
  filterIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "#000000",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 50,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default homePage;
