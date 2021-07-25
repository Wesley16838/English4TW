import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Button from "./../../components/button/button";
import ModalContainer from "./../../components/modal/modal";
import images from "../../assets/images";
import theme from "./../../utilities/theme.style";
import Tag from "./../../components/tag/tag";
import Card from "./../../components/card/card";
import { DEVICE_WIDTH } from "../splashpage";
import { SItem } from "./../../types/note";

const SavedItem: React.FC<SItem> = ({ title, detail, kk, buttons }) => {
  const navigation = useNavigation(); // navigation hook
  const handleOnWordCompare = (str: string) => {
    navigation.push("wordcomparePage", {
      first: str
    });
  };
  return (
    <Card
      title={title}
      OnClick={() => handleOnWordCompare(title)}
      customStyle={{ marginBottom: 20 }}
      kk={kk}
      detail={detail}
      buttons={buttons}
      manualCompare={true}
    />
  );
};
const savedwordPage = ({ navigation }: { navigation: any }) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = React.useState(false);
  const [savedword, setSavedWord] = React.useState([]);
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const insets = useSafeAreaInsets();
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
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
          content={["最近", "最早", "A - Z", "Z - A", "詞性"]}
          title={"排序"}
          onCancel={() => setModalVisible(!modalVisible)}
        />
      </Modal>
      <LinearGradient
        colors={[theme.BACKGROUND_COLOR_1, theme.BACKGROUND_COLOR_2]}
        style={styles.container}
      >
        <SafeAreaView
          style={{
            marginTop: 10,
            height: "100%",
            alignItems: "center",
            width: DEVICE_WIDTH,
            paddingBottom: insets.bottom + 20,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{ flex: 1, alignItems: "flex-start", paddingLeft: 20 }}
            >
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
              儲存字彙
            </Text>
            <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 20 }}>
              <TouchableOpacity
                onPress={() => {
                  // setIsOpenModal(true);
                  setModalVisible(true);
                }}
              >
                <Image
                  style={styles.iconotestyle}
                  source={images.icons.filter_btn_icon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {savedword.length !== 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                paddingBottom: 83,
              }}
            >
              <Image
                style={styles.imagefavstyle}
                source={images.icons.non_favorite_icon}
              />
              <Text style={{ color: theme.FONT_COLOR_GRAY4 }}>
                尚未儲存字彙
              </Text>
            </View>
          ) : (
              <View
                style={{ width: "100%", paddingHorizontal: 20, marginTop: 30 }}
              >
                <FlatList
                  contentContainerStyle={{
                    flexGrow: 1,
                  }}
                  showsVerticalScrollIndicator={false}
                  data={[
                    { word: "test1", detail: "A test1", kk: "/sfege3ge/" },
                    { word: "test2", detail: "A test2", kk: "/sfege3ge/" },
                    { word: "test3", detail: "A test3", kk: "/sfege3ge/" },
                    { word: "test4", detail: "A test4", kk: "/sfege3ge/" },
                    { word: "test5", detail: "A test5", kk: "/sfege3ge/" },
                    { word: "test6", detail: "A test6", kk: "/sfege3ge/" },
                  ]}
                  renderItem={({ item, index }) => (
                    <SavedItem
                      key={index}
                      title={item.word}
                      detail={item.detail}
                      kk={item.kk}
                      buttons={[
                        images.icons.volume_icon,
                        images.icons.favorited_icon,
                        images.icons.compare_icon,
                      ]}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
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
    width: "100%",
  },
  sectionRow: {
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
  noteItem: {
    width: DEVICE_WIDTH,
    paddingHorizontal: 20,
    height: 60,
    justifyContent: "center",
    borderBottomColor: theme.PRIMARY_COLOR_DEFAULT,
    borderBottomWidth: 1,
    backgroundColor: theme.COLOR_WHITE,
  },
  noteWord: {},
  imagefavstyle: {
    resizeMode: "contain",
    width: 355,
    height: 255,
  },
  iconotestyle: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
});

export default savedwordPage;
