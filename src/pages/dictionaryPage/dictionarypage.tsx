import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TouchableHighlight,
  Image,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, Typography, Spacing } from "../../styles";
import SearchBox from "../../components/SearchBox/SearchBox";
import Images from "./../../assets/images";
import { IItem } from "../../types/pages/word";
import { DEVICE_WIDTH } from "../splashpage";
import LinearGradientLayout from "../../components/LinearGradientLayout";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import words from "../../assets/words/words.json";
import WordList from "../../components/WordList";

const HistoryItem: React.FC<IItem> = ({ word, detail, number, handleOnPress, handleOnRemove }) => {
  return (
    <TouchableWithoutFeedback
      onPress={() => handleOnPress()}
    >
      <View
        style={[
          styles.historyItem,
          {
            borderTopWidth: number === 0 ? 1 : 0,
            borderTopColor: Colors.primary,
          },
        ]}
      >
        <Image
          style={styles.historyIcon}
          source={Images.icons.history_disalbe_icon}
        />
        <View style={styles.historySection}>
          <Text style={styles.historyWord}>{word}</Text>
          <Text style={styles.historyDetail}>{detail}</Text>
        </View>
        <TouchableWithoutFeedback onPress={()=> handleOnRemove()}>
          <Image
             source={Images.icons.remove_icon}
             style={styles.icon}
          />
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const dictoinaryPage = () => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [searchWord, setSearchWord] = useState('')
  const [history, setHistory] = useState<IItem[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true)
  const filterData = words.filter(word=> searchWord && word.indexOf(searchWord.toUpperCase()) === 0)
  useFocusEffect(
    useCallback(() => {
      const getLocalData = async () => {
        try{
          const result = await AsyncStorage.getItem('@word_history')
          setHistory(result ? JSON.parse(result) : [])
          setLoading(false);
        }catch(err) {
          console.log('err,', err)
        }
      }
      getLocalData()
      return () => {
        // Useful for cleanup functions
      };
    }, [])
  );

  const handleOnSearch = async () => {
    try{
      const jsonValue = JSON.stringify(history)
      navigation.push("wordDetailPage", {
        word: searchWord,
        history: jsonValue
      });
    }catch(err){
      console.log('err,', err)
    }
  };

  const handleOnNavToFav = () => {
    navigation.push("savedwordPage");
  };

  const handleOnChange = (str: string) => {
    setSearchWord(str)
  };

  const onItemPress = (word: string) => {
    const jsonValue = JSON.stringify(history)
    navigation.push("wordDetailPage", {
      word,
      history: jsonValue
    });
  }
  const handleOnRemoveSingle = async(word:string) => {
    try{
      const index = history.map((e: IItem) => e.word)?.indexOf(word)
      const newHistory = [...history]
      newHistory.splice(index, 1)
      await AsyncStorage.setItem('@word_history', JSON.stringify(newHistory));
      setHistory(newHistory)
    }catch(err){

    }
  }
  const handleOnRemoveAll = async () => {
    try {
      await AsyncStorage.removeItem('@word_history')
      setHistory([])
    } catch(e) {
      // remove error
    }
  }

  return (
    <LinearGradientLayout>
      <SafeAreaView>
        <View style={styles.sectionRow}>
          <SearchBox
            customStyle={{ width: DEVICE_WIDTH - 80 }}
            OnClick={() => handleOnSearch()}
            OnChange={(str: string) => handleOnChange(str)}
            placeHolder={"點擊收尋字會或片語"}
            placeHolderTextColor={"rgba(196, 129, 72, 0.5)"}
            value={searchWord}
          />
          <TouchableOpacity onPress={() => handleOnNavToFav()}>
            <Image
              style={styles.imagestyle}
              source={Images.icons.favorite_icon}
            />
          </TouchableOpacity>
        </View>
        {
        loading ? 
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
          <ActivityIndicator size="large" />
        </View> :
        searchWord.length !==0 ? 
        <WordList data={filterData}/>
        : history.length === 0 ? (
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
              style={styles.imagehistorystyle}
              source={Images.icons.search_history_icon}
            />
            <Text style={{ color: Colors.gray_4}}>沒有收尋歷史</Text>
          </View>
        ) : (
          <>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: Spacing.space_l,marginBottom: 10}}>
              <Text style={{color: Colors.gray_4}}>最近收尋</Text>
              < TouchableHighlight onPress={()=>handleOnRemoveAll()}>
                <Text style={{color: Colors.primary}}>清除全部</Text>
              </ TouchableHighlight>
            </View>
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
              data={history}
              keyboardShouldPersistTaps='handled'
              renderItem={({ item, index }) => (
                <HistoryItem
                  key={index}
                  word={item.word}
                  detail={item.detail}
                  number={index}
                  handleOnPress={() => onItemPress(item.word)}
                  handleOnRemove={() => handleOnRemoveSingle(item.word)}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </>
        )}
      </SafeAreaView>
    </LinearGradientLayout>
  );
};
const styles = StyleSheet.create({
  sectionRow: {
    paddingHorizontal: Spacing.space_l,
    paddingBottom: 25,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  imagestyle: {
    resizeMode: "contain",
    width: 36,
    height: 36,
    marginLeft: 10
  },
  imagehistorystyle: {
    resizeMode: "contain",
    width: 355,
    height: 255,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.space_l,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  historyIcon: {
    width: 30,
    height: 30,
  },
  historyWord: {
    ...Typography.base,
  },
  historyDetail: {
    ...Typography.base,
    color: Colors.gray_3,
  },
  historySection: {
    flexDirection: "column",
    marginLeft: Spacing.space_s,
    flex:1
  },
  icon: {
    width: 30,
    height: 30
  }
});

export default dictoinaryPage;
