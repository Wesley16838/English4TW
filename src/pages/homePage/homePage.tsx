import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import ModalContainer from "../../components/Modal/Modal";
import { useSelector, shallowEqual } from "react-redux";
import SearchBox from "../../components/SearchBox/SearchBox";
import TextArea from "../../components/TextArea/TextArea";
import InputBox from "../../components/InputBox/InputBox";
import Button from "../../components/Button/Button";
import Images from "../../assets/images";
import Card from "../../components/Card/Card";
import { Colors, Spacing, Typography } from "../../styles";
import { DEVICE_WIDTH } from "../splashpage";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from "@react-navigation/stack";
import LinearGradientLayout from "../../components/LinearGradientLayout";
import AsyncStorage from "@react-native-async-storage/async-storage";
import words from "../../assets/words/words.json";
import WordList from "../../components/WordList";

const homePage = () => {
  const [searchWord, setSearchWord] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [compareWords, setCompareWords] = useState({
    first: "",
    second: "",
  });
  const navigation = useNavigation<StackNavigationProp<any>>();
  const isLoggedIn: any = useSelector(
    (state: any) => state.user.isLoggedIn,
    shallowEqual
  );
  const dailyword: string = useSelector(
    (state: any) => state.word.dailyword,
    shallowEqual
  );
  const filterData = words.filter(word=> searchWord && word.indexOf(searchWord.toUpperCase()) === 0)

  React.useEffect(() => {
    // let formData = new FormData();
    // formData.append("type", "babylon");
    // formData.append("text", "universal");
    // fetch("https://www.english4tw.com/blog/post/translate", {
    //   method: "post",
    //   body: formData,
    //   headers: { "Content-Type": "multipart/form-data" },
    // })
    //   .then((res) => res.json())
    //   .then((response) => console.log("response", response))
    //   .catch((err) => console.log("err", err));
  }, []);

  const handleOnChange = (str: string) => {
    setSearchWord(str)
  };
  const handleOnSearch = async () => {
    try{
      const result = await AsyncStorage.getItem('@word_history')
      navigation.push("wordDetailPage", {
        word: searchWord,
        history: result ? result : '[]'
      });
    }catch(err){
      console.log('err,', err)
    }
  };
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
    navigation.push("sentenceAnalysisPage");
  };
  const handleOnwordDetailPage = (str: string) => {
    navigation.push("wordDetailPage", {
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

      <LinearGradientLayout>
        <SafeAreaView style={{marginTop: StatusBar.currentHeight}}>
          <SearchBox
              customStyle={{ width: DEVICE_WIDTH - 40, marginHorizontal: 20 }}
              OnChange={(str: string) => handleOnChange(str)}
              OnClick={() => handleOnSearch()}
              placeHolder={"點擊收尋字會或片語"}
              placeHolderTextColor={"rgba(196, 129, 72, 0.5)"}
              value={searchWord}
            />
            {
              searchWord.length ===0 ?
              <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
              >
                
                <View style={styles.section}>
                  <View style={styles.topic}>
                    <Image
                      style={styles.topicIcon}
                      source={Images.icons.arrow_icon}
                    />
                    <Text style={Typography.base_bold}>詞句分析</Text>
                  </View>
                  <TextArea
                    OnClick={(str: string) => handleOnAnalyze(str)}
                    // source={Images.icons.microCircle_icon}
                    placeHolder={"輸入內容"}
                    customStyle={{ width: DEVICE_WIDTH - 40, height: 150 }}
                    placeHolderTextColor={Colors.primary_light}
                    limit={100}
                  />
                </View>
                <View style={styles.section}>
                  <View style={styles.topic}>
                    <Image
                      style={styles.topicIcon}
                      source={Images.icons.arrow_icon}
                    />
                    <Text style={Typography.base_bold}>推薦字彙</Text>
                  </View>
                  <Card
                    title={"Quarantine"}
                    OnClick={(str: string) => handleOnwordDetailPage(str)}
                    customStyle={{ width: DEVICE_WIDTH - 40 }}
                    speech={'n. 名詞'}
                    subtitle={'複數-'}
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
                      <Text style={Typography.base_bold}>每日字彙</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => {
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
                    <Card
                        title={"Quarantine"}
                        OnClick={() => handleOnwordDetailPage(dailyword)}
                        customStyle={{ width: DEVICE_WIDTH - 40 }}
                        speech={'n. 名詞'}
                        subtitle={'複數-'}
                        detail={"stay at home"}
                        buttons={[
                          Images.icons.volume_icon,
                          Images.icons.favorite_icon,
                        ]}
                      />
                  </View>
                </View>
                <View style={styles.section}>
                  <View style={styles.topic}>
                    <Image
                      style={styles.topicIcon}
                      source={Images.icons.arrow_icon}
                    />
                    <Text style={Typography.base_bold}>字彙比較</Text>
                  </View>
                  <View style={[styles.sectionCol, {marginBottom: 30}]}>
                    <View style={[styles.sectionCol]}>
                      <InputBox
                        OnChangeText={(str: string) =>
                          setCompareWords({ ...compareWords, first: str })
                        }
                        customStyle={{
                          width: 'auto',
                          alignSelf: 'stretch',
                          height: 40,
                        }}
                        placeHolder={"輸入內容"}
                        placeHolderTextColor={Colors.primary_light}
                        value={compareWords.first}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          height: 30,
                          lineHeight: 30,
                          textAlignVertical: "center",
                          marginHorizontal: 10,
                          fontSize: 20,
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
                          width: 'auto',
                          alignSelf: 'stretch',
                          height: 40,
                        }}
                        placeHolder={"輸入內容"}
                        placeHolderTextColor={Colors.primary_light}
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
                        alignSelf: 'flex-end',
                        marginTop: 10,
                        marginBottom: 30,
                      }}
                      imageSize={{
                        width: 16,
                        height: 16,
                        marginRight: 7,
                      }}
                      type="2"
                    />
                  </View>
                </View>
              </ScrollView> : 
                 <WordList data={filterData}/>
            }
        </SafeAreaView>
      </LinearGradientLayout>
    </>
  );
};

const styles = StyleSheet.create({
  section: {
    width: "100%",
    flexDirection: "column",
    paddingHorizontal: Spacing.space_l,
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
  sectionCol: {
    flexDirection: "column",
  },
  daily: {
    flexDirection: "column",
  },
  filterIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  }
});

export default homePage;
