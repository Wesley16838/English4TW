import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  FlatList,
  TextStyle,
} from "react-native";
import TextArea from "../../components/TextArea/TextArea";
import Button from "../../components/Button/Button";
import images from "./../../assets/images";
import { Colors, Typography } from "../../styles";
import { DEVICE_WIDTH } from "../splashpage";
import { IComment } from "../../types/pages/comments";
const CommentItem: React.FC<IComment> = ({ name, date, content, index }) => {
  return (
    <View style={[styles.cardContainer, { marginTop: index === 1 ? 26 : 20 }]}>
      <View style={styles.cardRow}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View style={styles.cardColumn}>
        <Text>{content}</Text>
      </View>
    </View>
  );
};
const ReviewPage = ({ navigation }: { navigation: any }) => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const [reviews, setReviews] = useState(["1"]);
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };

  return (
    <View style={{ flexDirection: "column", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          marginTop: 56,
          marginBottom: 40,
        }}
      >
        <View style={{ flex: 1, alignItems: "flex-start" }}>
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
          意見回饋
        </Text>
        <View style={{ flex: 1 }} />
      </View>
      <TextArea
        OnClick={() => {}}
        placeHolder={"輸入內容"}
        customStyle={{ width: DEVICE_WIDTH - 40, height: 150 }}
        placeHolderTextColor={Colors.primary_light}
        limit={100}
        button={"送出"}
        buttonStyle={{
          width: 72,
          height: 30,
          borderRadius: 16,
        }}
      />
      {reviews.length === 0 && (
        <View
          style={{
            marginTop: 60,
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <Image
            source={images.icons.comment_icon}
            style={{ width: 205, height: 205 }}
          />
          <Text
            style={{
              ...Typography.base_secondary,
              textAlign: "center",
            }}
          >
            尚未有評論
          </Text>
        </View>
      )}
      {reviews.length !== 0 && (
        <View>
          <Text style={{ marginTop: 30, ...Typography.base }}>
            其他人的評論
          </Text>
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              width: DEVICE_WIDTH - 40,
            }}
            showsVerticalScrollIndicator={false}
            data={[
              {
                name: "Wesley",
                date: "01 Mar 2021",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante quam justo sed.",
              },
              {
                name: "Sharon",
                date: "02 Mar 2021",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante quam justo sed.",
              },
              {
                name: "Tim",
                date: "03 Mar 2021",
                content:
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ante quam justo sed.",
              },
            ]}
            renderItem={({ item, index }) => (
              <CommentItem
                key={index}
                name={item.name}
                date={item.date}
                content={item.content}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    width: "100%",
  },
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
  cardContainer: {
    height: "auto",
    flexDirection: "column",
    paddingHorizontal: 15,
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 18,
    borderColor:Colors.primary,
    borderWidth: 1,
    backgroundColor: Colors.white,
  },
  cardRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  cardInnerRow: {
    flexDirection: "row",
  },
  cardColumn: {
    width: "100%",
    flexDirection: "column",
  },
  name: {
    ...Typography.base_primary,
    lineHeight: 17,
  },
  date: {
    ...Typography.base_secondary
  },
  content: {
    fontSize: 16,
    color: Colors.gray_3,
  },
});
export default ReviewPage;
