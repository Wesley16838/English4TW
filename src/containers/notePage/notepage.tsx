import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Button from "./../../components/button/button";
import images from "../../assets/images";
import theme from "./../../utilities/theme.style";
import Tag from "./../../components/tag/tag";
import { DEVICE_WIDTH } from "../splashpage";
import { NItem } from "./../../types/note";

const NoteItem: React.FC<NItem> = ({ word, index }) => {
  const navigation = useNavigation(); // navigation hook
  const handleOnNoteContent = () => {
    navigation.push("notecontentpage", {
      title: word,
    });
  };
  return (
    <TouchableOpacity onPress={() => handleOnNoteContent()} key={index}>
      <View
        style={[
          styles.noteItem,
          {
            borderTopWidth: index === 1 ? 1 : 0,
            borderTopColor: theme.PRIMARY_COLOR_DEFAULT,
          },
        ]}
      >
        <Text style={styles.noteWord}>
          {index}. {word}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const notePage = ({ navigation }: { navigation: any }) => {
  const insets = useSafeAreaInsets();
  const [tags, setTags] = React.useState([
    "經典生活引語",
    "科技",
    "文法基礎",
    "心理",
    "運動",
    "建築",
  ]);
  const [note, setNote] = React.useState([]);
  const DEVICE_WIDTH = Dimensions.get("window").width;
  const handleOnFilter = (e: string) => { };

  return (
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
        <Button
          title="新增筆記"
          onPress={() => navigation.push("newnotepage")}
          customStyle={{
            width: 150,
            height: 40,
            borderRadius: 20,
            flexDirection: "row",
            marginBottom: 33,
          }}
          imageSize={{
            width: 16,
            height: 16,
            marginRight: 7,
          }}
          type="1"
          image={images.icons.add_icon}
        />
        {note.length !== 0 ? (
          <View
            style={{
              flex: 1,
              paddingBottom: 83,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              style={styles.imagenotestyle}
              source={images.icons.note_icon}
            />
            <Text style={{ color: theme.FONT_COLOR_GRAY4 }}>尚未新增筆記</Text>
          </View>
        ) : (
            <>
              <View style={styles.sectionRow}>
                {Array.isArray(tags) &&
                  tags.map((tag, index) => {
                    return (
                      <Tag
                        key={index}
                        title={tag}
                        OnClick={handleOnFilter}
                        customStyle={{
                          paddingHorizontal: 15,
                          paddingVertical: 3,
                          marginRight: 5,
                          marginBottom: 5,
                          height: 24,
                        }}
                        disable={false}
                      />
                    );
                  })}
              </View>
              <FlatList
                contentContainerStyle={{
                  flexGrow: 1,
                }}
                showsVerticalScrollIndicator={false}
                data={[
                  "note 1",
                  "note 2",
                  "note 3",
                  "note 4",
                  "note 5",
                  "note 6",
                  "note 7",
                  "note 8",
                  "note 9",
                  "note 10",
                  "note 11",
                  "note 12",
                  "note 13",
                  "note 14",
                ]}
                renderItem={({ item, index }) => (
                  <NoteItem key={index} word={item} index={index + 1} />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </>
          )}

        <View style={{}}></View>
      </SafeAreaView>
    </LinearGradient>
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
  imagenotestyle: {
    resizeMode: "contain",
    width: 355,
    height: 255,
  },
});

export default notePage;
