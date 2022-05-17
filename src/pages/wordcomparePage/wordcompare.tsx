import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
} from "react-native";
import { NavigationProp, ParamListBase, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Button from "../../components/Button/Button";
import InputBox from "../../components/InputBox/InputBox";
import Label from "../../components/Label/Label";
import images from "../../assets/images";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../splashpage";
import { Colors, Typography } from "../../styles";

const wordComparePage = () => {
  const [animation, setAnimation] = useState(new Animated.Value(0));
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const route: RouteProp<{ params: { first: string, second: string } }, 'params'> = useRoute();
  const { first, second } = route.params;
  const [compareWord, setCompareWord] = useState("");
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
    // setTimeout(() => {
    //   navigation.goBack();
    // }, 200);
  };
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
    // setTimeout(() => {
    //   navigation.goBack();
    // }, 200);
  };
  const handleNext = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
    // setTimeout(() => {
    //   navigation.push("sentenceAnalysisPage");
    // }, 200);
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
          <View style={styles.sectionColumn}>
            <View
              style={{
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              <Text style={styles.compareWord}>{first}</Text>
              <Text style={styles.compareWordKK}>{first}</Text>
              <View style={styles.labelContainer}>
                <Label title={first} customStyle={{}} />
              </View>
              <Text style={styles.compareWordDes}>{first}</Text>
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: Colors.gray_4,
                borderTopWidth: 1,
                borderTopColor: Colors.gray_4,
                width: DEVICE_WIDTH - 40,
                alignItems: "center",
                height: 47,
                justifyContent: "center",
              }}
            >
              <Text>VS</Text>
            </View>
            <View
              style={{
                marginBottom: 30,
                marginTop: 20,
              }}
            >
              {first.length !== 0 && second.length === 0 ? (
                <>
                  <InputBox
                    OnChangeText={(str: string) => setCompareWord(str)}
                    customStyle={{
                      width: DEVICE_WIDTH - 40,
                      height: 40,
                      marginTop: 20,
                    }}
                    placeHolder={"輸入內容"}
                    placeHolderTextColor={Colors.primary_light}
                    value={compareWord}
                  />
                  {false && (
                    <>
                      <Text style={styles.compareWordKK}>{second}</Text>
                      <View style={styles.labelContainer}>
                        <Label title={second} />
                      </View>
                      <Text style={styles.compareWordDes}>{second}</Text>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Text style={styles.compareWord}>{second}</Text>
                  <Text style={styles.compareWordKK}>{second}</Text>
                  <View style={styles.labelContainer}>
                    <Label title={second} />
                  </View>
                  <Text style={styles.compareWordDes}>{second}</Text>
                </>
              )}
            </View>
          </View>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  popup: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: Dimensions.get("window").height - 54,

    paddingTop: 26,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: Colors.gray_4,
    paddingHorizontal: 20,
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
    ...Typography.xl_bold
  },
  compareWordKK: {
    ...Typography.sm,
    color: Colors.gray_3,
    marginTop: 5,
    marginBottom: 20,
  },
  compareWordDes: {
    ...Typography.base,
    lineHeight: 25,
    marginTop: 8,
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginRight: 5,
  },
});

export default wordComparePage;
