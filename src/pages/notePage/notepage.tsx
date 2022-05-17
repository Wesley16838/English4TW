import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

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
import { StackNavigationProp } from "@react-navigation/stack";
import Button from "../../components/Button/Button";
import images from "../../assets/images";
import { Colors, Spacing, Typography } from "../../styles";

import Tag from "../../components/Tag/Tag";
import { DEVICE_WIDTH } from "../splashpage";
import { NItem } from "../../types/pages/note";
import LinearGradientLayout from "../../components/LinearGradientLayout";

const NoteItem: React.FC<NItem> = ({ word, index }) => {
  const navigation = useNavigation<StackNavigationProp<any>>(); // navigation hook
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
            borderTopColor: Colors.primary,
          },
        ]}
      >
        <Text style={{...Typography.base}}>
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
  const handleOnFilter = () => { };

  return (
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
            <Text style={{ color: Colors.gray_4 }}>尚未新增筆記</Text>
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
    </LinearGradientLayout>
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
    height: 60,
    justifyContent: "center",
    paddingHorizontal: Spacing.space_l,
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
  },
  imagenotestyle: {
    width: 355,
    height: 255,
    resizeMode: "contain",
  },
});

export default notePage;
