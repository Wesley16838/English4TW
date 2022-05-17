import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TextStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../../components/Button/Button";
import ModalContainer from "../../components/Modal/Modal";
import images from "../../assets/images";

import Card from "../../components/Card/Card";
import { DEVICE_WIDTH } from "../splashpage";
import { SItem } from "../../types/pages/note";
import { Colors, Typography } from "../../styles";
import LinearGradientLayout from "../../components/LinearGradientLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SavedItem: React.FC<SItem> = ({ title, detail, speech, buttons, subtitle, OnClick, OnCompare }) => {
  return (
    <Card
      title={title}
      OnClick={OnClick}
      customStyle={{ marginBottom: 20 }}
      speech={speech}
      subtitle={subtitle}
      detail={detail}
      buttons={buttons}
      manualCompare={true}
    />
  );
};
const savedwordPage = ({ navigation }: { navigation: any }) => {
  const choices = ["最近", "最早", "A - Z", "Z - A", "詞性"]
  const [selected, setSelected] = useState((choices && choices[0]) || "");
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [savedword, setSavedWord] = useState([]);
  const insets = useSafeAreaInsets();
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };

  const handleOnWordPlay = (str: string) => {}
  const handleOnWordFavorite = (str: string) => {}
  const handleOnWordCompare = (str: string) => {
    navigation.push("wordcomparePage", {
      first: str
    });
  };

  const handleOnWordClick = async(str: string) => {
    const result = await AsyncStorage.getItem('@word_history')
      navigation.push("wordDetailPage", {
        word: str,
        history: result ? result : '[]'
      });
  }

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
      <LinearGradientLayout>
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
              paddingHorizontal: 20
            }}
          >
            <View
              style={{ flex: 1, alignItems: "flex-start" }}
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
              style={ Typography.pageTitle as TextStyle }
            >
              儲存字彙
            </Text>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
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
              <Text style={{ color: Colors.gray_4 }}>
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
                    { word: "test1", detail: "A test1", speech: "v. 動詞", subtitle: "可數與不可數 --" },
                    { word: "test2", detail: "A test2", speech: "v. 動詞", subtitle: "可數與不可數 --" },
                    { word: "test3", detail: "A test3", speech: "v. 動詞", subtitle: "可數與不可數 --"},
                    { word: "test4", detail: "A test4", speech: "v. 動詞", subtitle: "可數與不可數 --" },
                    { word: "test5", detail: "A test5", speech: "v. 動詞", subtitle: "可數與不可數 --" },
                    { word: "test6", detail: "A test6", speech: "v. 動詞", subtitle: "可數與不可數 --" },
                  ]}
                  renderItem={({ item, index }) => (
                    <SavedItem
                      key={index}
                      title={item.word}
                      subtitle={item.subtitle}
                      detail={item.detail}
                      speech={item.speech}
                      buttons={[
                        {
                          name: 'volumn',
                          path: images.icons.volume_icon,
                          onClick: () => handleOnWordPlay(item.word)
                        },
                        {
                          name: 'favorite',
                          path: images.icons.favorited_icon,
                          onClick: () => handleOnWordFavorite(item.word)
                        },
                        {
                          name: 'compare',
                          path: images.icons.compare_icon,
                          onClick: () =>  handleOnWordCompare(item.word)
                        },
                        
                        
                      ]}
                      OnClick={() => handleOnWordClick(item.word)}
                      OnCompare={() => handleOnWordCompare(item.word)}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            )}
        </SafeAreaView>
      </LinearGradientLayout>
    </>
  );
};
const styles = StyleSheet.create({
  sectionRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingHorizontal: 20,
    backgroundColor: Colors.white,
    shadowColor: Colors.black,
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
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
  },
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
