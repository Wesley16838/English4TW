import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Button from "./../../components/button/button";
import Label from "./../../components/label/label";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH } from "../splashpage";

const wordDetailPage = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));

  const [isOutside, setIsOutside] = React.useState(true); // 一開始是不顯示, 所以outside
  const screenHeight = Dimensions.get("window").height;

  const backdrop = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 0.01],
          outputRange: [screenHeight, 0],
          extrapolate: "clamp",
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0.01, 0.5],
      outputRange: [0, 1],
      extrapolate: "clamp",
    }),
  };
  React.useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  const handleClose = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  const handleNext = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };

  const slideUp = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0.01, 1],
          outputRange: [0, -1 * screenHeight],
          extrapolate: "clamp",
        }),
      },
    ],
  };
  return (
    <TouchableWithoutFeedback onPressIn={() => setIsOutside(true)}>
      <View style={styles.container}>
        <Animated.View
          style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
        />
        <View style={[styles.sheet]}>
          <Animated.View style={[styles.popup, slideUp]}>
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
          </Animated.View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },
  actionsheet: {
    width: 77,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sectionColumn: {
    flexDirection: "column",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    paddingBottom: 20,
    alignItems: "flex-start",
  },
  compareWord: {
    fontSize: theme.FONT_SIZE_EXTREME_LARGE,
    fontWeight: "700",
  },
  compareWordKK: {
    fontSize: theme.FONT_SIZE_SMALL,
    fontWeight: "500",
    color: theme.FONT_COLOR_GRAY,
    marginTop: 5,
    marginBottom: 20,
  },
  compareWordDes: {
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: "500",
    lineHeight: 25,
    marginTop: 8,
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 5,
  },
});

export default wordDetailPage;
