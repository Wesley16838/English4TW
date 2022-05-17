import React, { createRef, useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StatusBar
} from "react-native";
import _ from "lodash";
import Button from "../../components/Button/Button";
import Label from "../../components/Label/Label";
import images from "../../assets/images";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../splashpage";
import { useQuery } from 'react-query';
import { Colors, Spacing, Typography } from "../../styles";
import LinearGradientLayout from "../../components/LinearGradientLayout";
import { useNavigation, RouteProp, useRoute } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IItem } from "../../types/pages/word";
import TabView from "../../components/TabView/TabView";
import Accordion from "../../components/Accordion";
import axios from "axios";

const speechMatch: any = {
  '動詞': 'v. 動詞',
  '名詞': 'n. 名詞',
  '代名詞': 'pron. 代名詞',
  '連接詞': 'conj. 連接詞',
  '形容詞': 'adj. 形容詞',
  '感嘆詞': 'int. 感嘆詞',
  '副詞': 'adv. 副詞',
  '介系詞': 'prep. 介系詞'
}

const propertyMatch: any = {
  'phrases': '片語',
  'synonyms': '同義詞',
}

const local_json_file = require("../../assets/words/lay.json")

const wordDetailPage = () => {
  const [accordion, setAccordion] = useState<boolean[]>([]) // [[true, false],[false, false],[false]]
  const scrollViewRef:any = useRef(null)
  let layoutOrder:any[] = []
  let cloneLayoutOrder: any[]=[]
  let layoutLength = 0
  let wordBody = null;
  const navigation = useNavigation<StackNavigationProp<any>>();
  const route: RouteProp<{ params: { word: string, history: string } }, 'params'> = useRoute();
  const { word, history } = route.params;

  const fetchWord = async () => {
    const res = await axios.get(
      "https://www.english4tw.com/api/word3?word=lay", 
      { 
        headers: {
          "Authorization" : `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJlbmdsaXNoNHR3LmNvbSIsImF1ZCI6ImVuZ2xpc2g0dHcgYXBwIiwiaWF0IjoxNjUyMzM4Nzc0LCJleHAiOjE2NTI0MjUxNzQsInVzZXIiOnsiaWQiOiI4MDU3IiwiZW1haWwiOiJ3ZXNsZXkxNjgzOEBnbWFpbC5jb20iLCJhZG1pbiI6IjAiLCJibG9ja2VkIjoiMCIsImFkdmFuY2VkX2R1ZV9kYXRlIjpudWxsfX0.lGh9iHhvJhQx5I152xWd5Um8UjJs1bUd_BoSrmpUTC3xyFz8VHBq5YWJVnjmM_CPecVCHf7_W_rTgwkExmByr9O97I5cawXm-fbByYAL3omy1MyOgOzmBpnPrUzPNwuaAwvf8nCI32gWzmBdaL18oa2RnxeCNUiFfI8vn7CUEt3437XlnoeSyE1FC1OWL5Z9TONh_IAoelOCPuQo7WOHhjnS1whwqBGSxz9F3QF7GqL2iNVIjVjvhcJN4JFL4QFhLDoqD4HJUKcOJLAqtr8bV3v5MIhBq-ixCCoNnSQM4X2pM0cRNLK3L6JSZO3eIeBtbRBwnDGnatbE7Tmvj3x-0RjEsQmZcj_Ja4Tjiaa6TpelUq4wUuEK_lG4QBbJw51VPAA9aR23HDrPSSeeXl7ACDL3zRtIhNX2zNqOuVUCY58unwYVUqRmqroIOtiFZfYjIIAL-AtGlxPXUvjhWnToQchPwHGVmQEwkXxfFfj1DTfflxR_gPmPAbi9-IoyatNRuKBYwrPdxH5xoII8S9iXDyJu864CTyS4GWgcZyqJvg7YQymPMdX0xc96k13H3Q9wSNgOurRGghF5FUhYcNY4OUhvszYTxKofSYAp6Pc5YDGJ8K22lCz2eux7YJZYeXwovLwV31Na75ayeBjqk-cMlydTml_pNbd-xMDyYZ_Cano`
        } 
      }
    )
    return res
  }

  const { data: wordInfo, isLoading, isSuccess } = useQuery(`${word}`, fetchWord,{
      onSuccess: async(data) => {
        console.log('success,', data)
        const array:boolean[] = []
        // Object.keys(data.data.content).map((word: any) => {
        //   Object.keys(data.data.content[word]).map(() => {
        //     array.push(false)
        //   })
        // })
        const jsonValue = history ? JSON.parse(history) : []
        const index = history ? jsonValue.map((e: IItem) => e.word)?.indexOf(word) : -1
        if(index>-1){
          jsonValue.splice(index, 1)
        }
        jsonValue.unshift({
          word: word,
          detail: "Word Detail"
        })
        await AsyncStorage.setItem('@word_history', JSON.stringify(jsonValue))
        setAccordion(array)
      },
      onError: () => {},
  })
  const handleClose = () => {
    navigation.goBack();
  };
  const handleBack = () => {
    navigation.goBack();
  };
  const handleNext = () => {
    navigation.push("sentenceAnalysisPage");
  };
  console.log('accordion,', accordion);
  const renderDef:any = (obj: any, defIndex: number) => {
    if(obj.hasOwnProperty('condition')){
      const conditionArr = obj['condition'].split('|')
      return (
        <>
          {
            conditionArr.map((element: string, index: number) => <Text key={`${element}${index}`} style={{color: conditionArr.length > 1 ? Colors.black : Colors.primary, marginTop: conditionArr.length > 1 ? 10 : 0,...Typography.base}}>{element}</Text>)
          }
          {
            obj.hasOwnProperty('examples') && obj['examples'].map((example:any, exampleIndex: number) => {
              return renderDef(example, exampleIndex)
            })
          } 
        </>
      )
    }else{
      return(
        <View key={`def${defIndex}`}>
          <Text style={{...Typography.base_primary, marginTop: 10, marginBottom: 10}}>{obj['name']}</Text>
          {
            obj.hasOwnProperty('definitions') && obj['definitions'].map((def: string) => {
              return <Text style={{paddingLeft: 15}}>{def}</Text>
            })
          }
        </View>
      )
    }
  }
  const wordObj = wordInfo?.data?.content || local_json_file?.content
  wordBody = isSuccess && Object.keys(wordObj).map((words: any, wordIndex: number) => {
    return(
      /* 詞彙區 */
      <View style={{flexDirection: 'column'}} key={`wordBody${wordIndex}`}>
        {/* 定義區 */}
        <View style={styles.tabCard}>
           {/* 標題區 */}
          <View style={styles.wordSection}>
            <Text style={styles.wordName}>{word}</Text>
            <Button
              image={images.icons.volume_icon}
              customStyle={{}}
              imageSize={{ height: 30, width: 30, marginRight: 0 }}
              type=""
              onPress={() => handleClose()}
            />
          </View>
          {/* 複標題區 */}
          <View style={styles.subtitleSection}>
            <Label title={speechMatch[words]}/>
            {
              Object.keys(wordObj[words]).map(property => {
                if(property !== 'simple') {
                  layoutLength++
                  return(
                    <Text key={`${words}${propertyMatch[property]}`} style={styles.propertyText} onPress={() => {
                      const index = layoutOrder.findIndex(i => i.name === `${words}_${property}`)
                      scrollViewRef.current.scrollTo({
                        y: layoutOrder[index].height.y,
                        animated: true
                      });
                    }}>
                      &#60;{propertyMatch[property]}&#62;
                    </Text>
                )}
              })
            }
          </View>
           {/* 解釋區 */}
           {wordObj[words]['simple'].map((def: any, index: number) => {
             return(  
              <View style={{marginTop: index !== 0 ? 20 : 0}} key={`description${index}`}>
                {renderDef(def)}
              </View>
             )
           })}
        </View>
        {/* 屬性區 */}
        {
          Object.keys(wordObj[words]).map((property: string, propertyIndex: number) => {
            if(property !=='simple'){
              layoutOrder.push({name: `${words}_${property}`})
            }
            let accordionBody = null;
            accordionBody =  wordObj[words][property].map((prop: any, propIndex: number) => {
              switch(property){
                case "phrases":
                  return(  
                    <View style={{marginTop: propIndex !== 0 ? 20 : 0}} key={`accordionbody${propIndex}`}>
                      {renderDef(prop)}
                    </View>
                  )
                case "synonyms":
                  return(
                    <Text key={`accordionbody${propIndex}${prop}`}>&#8226; {prop}</Text>
                  )
              }
            })
            return (
              <View
                onLayout={event => {
                  // set base height for each section
                  if(property !=='simple') {
                    const layoutIndex = layoutOrder.findIndex(i => i.name === `${words}_${property}`)
                    const newHeight = event.nativeEvent.layout;
                    layoutOrder[layoutIndex] = {...layoutOrder[layoutIndex], height:newHeight}
                    if(layoutLength>0){
                      layoutLength --
                    }
                  }
                  // update height base on previous height
                  if(layoutLength === 0){
                    for(let i = 0; i < layoutOrder.length - 1; i++){
                      // 不同類別
                      if(layoutOrder[i].name.split('_')[0] !== layoutOrder[i+1].name.split('_')[0]){
                        if(cloneLayoutOrder.length === 0){
                          layoutOrder[i+1].height.y = layoutOrder[i].height.y + layoutOrder[i+1].height.y
                        } else {
                          // next height = current height + height difference between next and current + increased height
                          layoutOrder[i+1].height.y = layoutOrder[i].height.y + (cloneLayoutOrder[i+1].height.y - cloneLayoutOrder[i].height.y) + (layoutOrder[i].height.height - cloneLayoutOrder[i].height.height)
                        }
                      }else{ // 同類別
                        layoutOrder[i+1].height.y = layoutOrder[i].height.y + layoutOrder[i].height.height
                      }
                    }
                    if(cloneLayoutOrder.length === 0) cloneLayoutOrder = _.cloneDeep(layoutOrder)
                  }
                }}
                key={`${words}_${property}_${propertyIndex}`}
              >
                {property !== 'simple' && <Accordion title={propertyMatch[property]} content={accordionBody} key={`accordion${propertyIndex}`} onOpen={() => {
                    const obj = Object.keys(wordObj[words]); 
                    layoutLength = obj.length - obj.indexOf(property) - (obj.indexOf("simple") > obj.indexOf(property) ? 1 : 0)
                  }}
                />}
              </View>
            )
          })
        }
      </View>
    )
  })

  return (
    <LinearGradientLayout>
      <SafeAreaView style={{marginTop: StatusBar.currentHeight}}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
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
              width: DEVICE_WIDTH - 40,
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
          {
            isLoading ? <ActivityIndicator size="large" /> : 
            // <TabView
            //   titles={["發音一", "發音二"]}
            //   customStyle={{ width: DEVICE_WIDTH - 40, marginHorizontal: 20 }}
            //   children={tabBody}
            // />
            <View style={{alignItems: 'center'}}>{wordBody}</View>
          }
        </ScrollView>
      </SafeAreaView>
    </LinearGradientLayout>
  );
};

const styles = StyleSheet.create({
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
  topic: {
    ...Typography.base_bold,
    flexDirection: "row",
    alignItems: "center",
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
    backgroundColor: Colors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: DEVICE_HEIGHT - 54,
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
  wordSection: {
    flexDirection: 'row',
    alignItems: 'center',
  }, 
  wordName: {
    ...Typography.xxl,
    lineHeight: 41,
    marginRight: 10,
  },
  subtitleSection:{
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    alignItems: 'center',
    marginTop: Spacing.space_l,
    marginBottom: 10,
  },
  wordAddition: {
    ...Typography.xl,
    lineHeight: 30,
    marginRight: 10
  },
  flexRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  flexColumn: {
    flexDirection: "column",
  },
  tabCard: {
    borderColor: '#00B4B4',
    borderWidth: .5,
    borderRadius: 20,
    padding: 15,
    width: DEVICE_WIDTH - 40,
    marginBottom: Spacing.space_xl,
  },
  subtitle: {
    ...Typography.base,
    color: Colors.white,
    textAlign: 'center'
  },
  sectionContainer: {
    width: DEVICE_WIDTH - 40,
    borderRadius: 25,
    backgroundColor: Colors.button_primary_press,
    paddingVertical: 15,
    marginBottom: 10,
    height: 50,
    textAlign: "center",
  },
  sectionTitle: {
    ...Typography.base_bold,
    color: Colors.white,
    textAlign: "center",
  },
  propertyText: {
    ...Typography.base,
    color: Colors.red,
    marginLeft: 10
  }
});

export default wordDetailPage;
