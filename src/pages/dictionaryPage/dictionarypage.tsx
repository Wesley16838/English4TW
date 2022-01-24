import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import theme from "./../../utilities/theme.style";
import SearchBox from "../../components/SearchBox/SearchBox";
import Images from "./../../assets/images";
import { IItem } from "./../../types/word";

const HistoryItem: React.FC<IItem> = ({ word, detail, number }) => {
  return (
    <View
      style={[
        styles.historyItem,
        {
          borderTopWidth: number === 0 ? 1 : 0,
          borderTopColor: theme.PRIMARY_COLOR_DEFAULT,
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
    </View>
  );
};

const dictoinaryPage = ({ navigation }: { navigation: any }) => {
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const [history, setHistory] = React.useState([]);
  const handleOnSearch = () => {};
  const handleOnNavToFav = () => {
    navigation.push("savedwordPage");
  };
  return (
    <LinearGradient
      colors={[theme.BACKGROUND_COLOR_1, theme.BACKGROUND_COLOR_2]}
      style={styles.container}
    >
      <SafeAreaView style={{ marginTop: 10, height: "100%" }}>
        <View style={styles.sectionRow}>
          <SearchBox
            customStyle={{ width: DEVICE_WIDTH - 80 }}
            OnClick={() => handleOnSearch()}
            placeHolder={"點擊收尋字會或片語"}
            placeHolderTextColor={"rgba(196, 129, 72, 0.5)"}
          />
          <TouchableOpacity onPress={() => handleOnNavToFav()}>
            <Image
              style={styles.imagestyle}
              source={Images.icons.favorite_icon}
            />
          </TouchableOpacity>
        </View>
        {history.length === 0 ? (
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
            <Text style={{ color: theme.FONT_COLOR_GRAY4 }}>沒有收尋歷史</Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
            }}
            showsVerticalScrollIndicator={false}
            data={[
              { word: "test1", detail: "A test1" },
              { word: "test2", detail: "A test2" },
            ]}
            renderItem={({ item, index }) => (
              <HistoryItem
                key={index}
                word={item.word}
                detail={item.detail}
                number={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}
      </SafeAreaView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // paddingHorizontal: 20,
  },
  sectionRow: {
    paddingHorizontal: 20,
    paddingBottom: 25,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    // borderBottomWidth: 1,
    // borderBottomColor: theme.PRIMARY_COLOR_DEFAULT,
  },
  imagestyle: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  imagehistorystyle: {
    resizeMode: "contain",
    width: 355,
    height: 255,
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.PRIMARY_COLOR_DEFAULT,
    backgroundColor: theme.COLOR_WHITE,
  },
  historyIcon: {
    width: 30,
    height: 30,
  },
  historyWord: {
    fontSize: theme.FONT_SIZE_MEDIUM,
  },
  historyDetail: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    color: "#828282",
  },
  historySection: {
    flexDirection: "column",
    marginLeft: 15,
  },
});

export default dictoinaryPage;
