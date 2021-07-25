import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Animated,
  Text,
  Image,
  Modal,
  Alert,
} from "react-native";
import Button from "./../../components/button/button";
import theme from "../../utilities/theme.style";
import Images from "../../assets/images";
import apiConfig from "./../../config/api";
import ModalContainer from "./../../components/modal/modal";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";

const sentenceAnalysisPage = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { sentence } = route.params;
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [sentences, setSentences] = React.useState([
    {
      sentence:
        "Lee puts a spin on what happened last nigh. That just aggravates me.",
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    },
    {
      sentence:
        "Lee puts a spin on what happened last nigh. That just aggravates me.",
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    },
    {
      sentence:
        "Lee puts a spin on what happened last nigh. That just aggravates me.",
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    },
    {
      sentence:
        "Lee puts a spin on what happened last nigh. That just aggravates me.",
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    },
    {
      sentence:
        "Lee puts a spin on what happened last nigh. That just aggravates me.",
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    },
    {
      sentence:
        "Lee puts a spin on what happened last nigh. That just aggravates me.",
      uri:
        "https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3",
    },
  ]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const screenHeight = Dimensions.get("window").height;
  const screenWidth = Dimensions.get("window").width;
  const [modalVisible, setModalVisible] = useState(false);
  React.useEffect(() => {
    const fetchSentences = async () => {
      setIsLoading(true);
      try {
        let result = await apiConfig.get("/", {
          params: {
            // sentence:sentence,
            results: 1,
            inc: "name,email,picture",
          },
        });
        // setSentences(result.data.results);
      } catch (err) {
        console.log("err,", err);
      }
      setIsLoading(false);
    };
    fetchSentences();
  }, []);
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
    navigation.push("wordanalysisPage");
  };

  const renderSentencesSection = () => {
    return sentences.map((sentence, index) => {
      return (
        <View key={index} style={styles.sectionBody}>
          <Image style={styles.volumeIcon} source={Images.icons.volume_icon} />
          <Text
            style={{
              width: screenWidth - 70,
              fontSize: 17,
              lineHeight: 25.5,
              marginTop: 10,
            }}
          >
            {sentence.sentence}
          </Text>
        </View>
      );
    });
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
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ModalContainer
          content={["慢", "中", "快"]}
          title={"播放速度"}
          onCancel={() => setModalVisible(false)}
        />
      </Modal>

      <View style={[styles.sheet]}>
        <Animated.View style={[styles.popup, slideUp]}>
          <View style={styles.sectionRow}>
            <View style={styles.actionsheet}>
              <Button
                title=""
                image={Images.icons.leftarrow_icon}
                customStyle={{}}
                imageSize={{ height: 20, width: 12, marginRight: 0 }}
                type=""
                onPress={() => handleBack()}
              />
              <Button
                title=""
                image={Images.icons.rightarrow_disable_icon}
                customStyle={{}}
                imageSize={{ height: 20, width: 12, marginRight: 0 }}
                type=""
                onPress={() => handleNext()}
              />
            </View>
            <Button
              title=""
              image={Images.icons.close_icon}
              customStyle={{}}
              imageSize={{ height: 30, width: 30, marginRight: 0 }}
              type=""
              onPress={() => handleClose()}
            />
          </View>
          <View style={styles.topic}>
            <Image style={styles.topicIcon} source={Images.icons.arrow_icon} />
            <Text style={styles.topicTitle}> 例句 -</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Image
                style={styles.speedIcon}
                source={Images.icons.speed_icon}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>(人) put a spin on (事)</Text>
          <View>{renderSentencesSection()}</View>
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
  volumeIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginRight: 10,
  },
  topic: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: theme.FONT_SIZE_MEDIUM,
    fontWeight: "700",
    marginTop: 24,
    paddingHorizontal: 25,
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
  speedIcon: {
    height: 30,
    width: 30,
    resizeMode: "contain",
    marginLeft: 5,
  },
  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#BDBDBD",
    paddingHorizontal: 25,
    borderBottomWidth: 0.5,
    paddingBottom: 20,
  },

  sectionBody: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  actionsheet: {
    width: 77,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  popup: {
    backgroundColor: theme.COLOR_WHITE,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    minHeight: Dimensions.get("window").height - 54,

    paddingTop: 26,
  },
  sentence_example: {
    fontSize: 17,
    lineHeight: 25.5,
    marginBottom: 6,
  },
  title: {
    lineHeight: 24,
    fontSize: 20,
    fontWeight: "bold",
    color: "#C48148",
    paddingHorizontal: 25,
    marginTop: 14,
  },
});

export default sentenceAnalysisPage;
