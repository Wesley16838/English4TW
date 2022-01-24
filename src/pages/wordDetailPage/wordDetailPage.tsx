import React, { useState } from "react";
import axios from "axios";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  ScrollView,
  SafeAreaView,
} from "react-native";
import Button from "../../components/Button/Button";
import Images from "../../assets/images";
import Label from "../../components/Label/Label";
import TabView from "../../components/TabView/TabView";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH } from "../splashpage";
import { apiConfig } from "../../config/api";
import wordData from '../../assets/words/word.json';

const wordDetailPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { word } = route.params;
  let tabBody = null;
  React.useEffect(() => {
    const fetchDailyWords = async () => {
      try {
        let formData = new FormData();
        formData.append("type", "babylon");
        formData.append("text", word);
        const result = await axios({
          method: "post",
          url: "https://www.english4tw.com/blog/post/translate",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        fetch("https://www.english4tw.com/blog/post/translate", {
          method: "post",
          body: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => res.json())
          .then((response) => console.log("fetch response", response))
          .catch((err) => console.log("err", err));
      } catch (err: any) {
        console.log("err,", err.message);
      }
    };
    fetchDailyWords();
  }, []);
  const screenWidth = Dimensions.get("window").width;

  const handleClose = () => {
    navigation.goBack();
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const handleNext = () => {
    navigation.push("sentenceAnalysisPage");
  };

  tabBody = wordData && wordData.map((item, index) => {
    const renderBasicInfo = () => {
      return item.detail.map((items, index) => {
        return(
          <View style={styles.flexColumn} key={'basicInfo' + index}>
            <View style={[styles.flexRow, {alignItems: 'center', marginTop: 30}]}>
              <Label title={items.speech}/>
              {
                items.section.map(obj => {
                  return (
                    <Text style={{
                      color: '#FF6379',
                      marginLeft: 10,
                    }}>
                      {obj}
                    </Text>
                  )
                })
              }
            </View>
            <View style={{paddingTop: 10}}>
              {
                items.tenses && items.tenses.map((tense, index) => {
                  return(
                    <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: index ===items.tenses.length - 1 ? 20 : 15}}>
                      <Button
                        title=""
                        image={images.icons.volume_icon}
                        customStyle={{}}
                        imageSize={{ height: 30, width: 30, marginRight: 10 }}
                        type=""
                        onPress={() => handleClose()}
                      />
                      <Text>{tense.tense}: {tense.word}</Text>
                    </View>
                  )
                })
              }
            </View>
            {
              items.group.map((obj, index) => {
                return (
                  <View style={{marginBottom: index === items.group.length - 1 ? 0 : 20}}>
                    <Text style={{
                      color: '#00B4B4',
                      lineHeight: 23
                    }}>
                      {obj.countability}
                    </Text>
                    <View style={[styles.flexColumn, {paddingLeft: 20}]}>
                      {
                        obj.description.map(obj => {
                          return(
                            <Text style={{lineHeight: 23}}>
                              {obj}
                            </Text>
                          )
                        })
                      }
                    </View>
                  </View>
                )
              })
            }
          </View>
        )
      })
    }

    const renderSynonymsInfo = () => {
      return(
        <>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>同義詞</Text>
          </View>
          <View style={[styles.tabCard, {marginTop: 10}]}>
            {
              item.synonyms.map(synonym => {
                return(
                  <>
                    <Label title={synonym.speech} customStyle={{marginBottom: 10}}/>
                    {synonym.words.map(word => {
                      return(
                        <Text style={{lineHeight: 25}}>&#8226; {
                          word.map((singleWord, index) => {
                            return (
                              <>
                                {singleWord}{index !== word.length - 1 && ', '}
                              </>
                            )
                          })
                          }</Text>
                      )
                    })}
                  </>
                )
              })
            }
          </View>
        </>
      )
    };

    const renderPhrasesInfo = () => {
      return(
        <>
          <View style={styles.subtitleContainer}>
            <Text style={styles.subtitle}>片語</Text>
          </View>
          <View style={{
              borderColor: '#00B4B4',
              borderWidth: .5,
              borderRadius: 20,
              padding: 15,
              marginTop: 10,
            }}
          >
            {
              item.phrases.map(phrase => {
                return(
                  <>
                    <Label title={phrase.speech}/>
                    {
                      phrase.countability && 
                      <Text style={{
                        color: '#00B4B4',
                        lineHeight: 23,
                        marginTop: 10,
                      }}>
                        {phrase.countability + ' -'}
                      </Text>
                    }
                    
                    {
                      phrase.examples.map((example, index) => {
                        let newExample = example
                        return(
                          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: index === phrase.examples.length - 1 ? 20 : 15, marginTop: index === 0 ? 10 : 0,}}>
                            {
                              phrase.speech === 'n. 名詞' &&
                              <Button
                                title=""
                                image={images.icons.volume_icon}
                                customStyle={{}}
                                imageSize={{ height: 30, width: 30, marginRight: 10 }}
                                type=""
                                onPress={() => handleClose()}
                            />
                            }
                            
                            <Text>{phrase.speech !== 'n. 名詞' && <>&#8226;</>} {example}</Text>
                          </View>
                        )
                      })
                    }
                  </>
                )
              })
            }
          </View>
        </>
      )
    }

    const renderSentenceInfo = () => {
      return(
        <>
          <View style={[styles.subtitleContainer, {backgroundColor: '#00B4B4'}]}>
            <Text style={styles.subtitle}>單字例句</Text>
          </View>
          <View style={[styles.tabCard, {marginTop: 10}]}>
            {
              item.sentences.map((sentence, index) => {
                return(
                  <View style={{marginTop: index === 0 ? 0 : 15}}>
                    <Label title={sentence.speech}/>
                    {
                      sentence.sentence.map((stn, index) => {
                        return(
                          <View style={{flexDirection: 'row', marginTop: index === 0 ? 10 : 15}}>
                            <Button
                                title=""
                                image={images.icons.volume_icon}
                                customStyle={{}}
                                imageSize={{ height: 30, width: 30, marginRight: 10 }}
                                type=""
                                onPress={() => handleClose()}
                            />
                            <Text>
                              {stn}
                            </Text>
                          </View>
                        )
                      })
                    }
                  </View>
                )
              })
            }
          </View>
        </>
      )
    }
   
    return(
      <View style={[styles.flexColumn]} key={index}>
        <View style={[styles.flexColumn, styles.tabCard]}>
            <View style={{marginTop: 8, flexDirection: 'row', alignItems: 'flex-end'}}>
              <Text style={[styles.wordName]}>{item.name}</Text>
              <Text style={[styles.wordAddition]}>{item.addition}</Text>
              <Button
                title=""
                image={images.icons.volume_icon}
                customStyle={{}}
                imageSize={{ height: 30, width: 30 }}
                type=""
                onPress={() => handleClose()}
              />
            </View>
            { renderBasicInfo() }
        </View>
        { item.synonyms && renderSynonymsInfo() }
        { item.phrases && renderPhrasesInfo() }
        { item.sentences && renderSentenceInfo() }
      </View>
    )
  })

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionRow}>
          <View style={styles.actionsheet}>
            <Button
              title=""
              image={images.icons.leftarrow_icon}
              customStyle={{}}
              imageSize={{ height: 20, width: 12, marginRight: 0 }}
              type=""
              onPress={() => handleBack()}
            />
            <Button
              title=""
              image={images.icons.rightarrow_disable_icon}
              customStyle={{}}
              imageSize={{ height: 20, width: 12, marginRight: 0 }}
              type=""
              onPress={() => handleNext()}
            />
          </View>
          <Button
            title=""
            image={images.icons.close_icon}
            customStyle={{}}
            imageSize={{ height: 30, width: 30, marginRight: 0 }}
            type=""
            onPress={() => handleClose()}
          />
        </View>
        <View
          style={{
            width: screenWidth - 40,
            marginHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingBottom: 23,
          }}
        >
          <Button
            title=""
            image={images.icons.share_icon}
            customStyle={{}}
            imageSize={{ height: 30, width: 30, marginRight: 0 }}
            type=""
            onPress={() => handleClose()}
          />
          <Button
            title=""
            image={images.icons.saved_icon}
            customStyle={{}}
            imageSize={{ height: 30, width: 30, marginRight: 0 }}
            type=""
            onPress={() => handleClose()}
          />
          <Button
            title=""
            image={images.icons.speed_secondary_icon}
            customStyle={{}}
            imageSize={{ height: 30, width: 30, marginRight: 0 }}
            type=""
            onPress={() => handleClose()}
          />
        </View>
        <TabView
          titles={["發音一", "發音二"]}
          customStyle={{ width: screenWidth - 40, marginHorizontal: 20 }}
          children={tabBody}
        />
      </ScrollView>
    </SafeAreaView>
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
  topic: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: "700",
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
  popup: {
    backgroundColor: theme.COLOR_WHITE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: Dimensions.get("window").height - 54,

    paddingTop: 26,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingBottom: 34,
  },
  actionsheet: {
    width: 77,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  wordName: {
    fontSize: theme.FONT_SIZE_EXTREME_LARGE,
    fontWeight: "500",
    lineHeight: 41,

  },
  wordAddition: {
    fontSize: theme.FONT_SIZE_SUPER_LARGE,
    fontWeight: "500",
    lineHeight: 30,
    marginRight: 10
  },
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flexColumn: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  tabCard: {
    borderColor: '#00B4B4',
    borderWidth: .5,
    borderRadius: 20,
    padding: 15,
    width: DEVICE_WIDTH - 40,
    marginBottom: 30,
  },
  subtitle: {
    color: theme.COLOR_WHITE,
    fontSize: theme.FONT_SIZE_MEDIUM,
    textAlign: 'center'
  },
  subtitleContainer: {
    borderRadius: 25,
    backgroundColor: '#007E7E',
    paddingTop:15,
    paddingBottom: 15, 
    height: 50,
  }
});

export default wordDetailPage;
