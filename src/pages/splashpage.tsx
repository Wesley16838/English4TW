import React from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Colors, Typography } from "../styles";

import Images from "./../assets/images";
import { setDailyWord } from "./../actions/word";
import words from "./../assets/words/words.json";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
const splashPage = ({ navigation }: { navigation: any }) => {
  
  const dispatch: Dispatch<any> = useDispatch();
  React.useEffect(() => {
    const fetchDailyWord = async () => {
      try {
        dispatch(setDailyWord(words[Math.floor(Math.random() * words.length)]));
        setTimeout(() => {
          navigation.navigate("homePage", {
            withAnimation: true,
          });
        }, 3000);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchDailyWord();
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Image style={styles.splashImage} source={Images.icons.logo_icon} />
      <Text style={{  }}>
        版本資訊：5.8.7
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  splashContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.button_secondary_disable,
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  splashImage: {
    width: DEVICE_WIDTH - 60,
    height: DEVICE_WIDTH - 70,
    resizeMode: "contain",
  },
  splashText: {
    ...Typography.sm,
    position: "absolute",
    bottom: 85,
    zIndex: 11,
  }
});
export default splashPage;
