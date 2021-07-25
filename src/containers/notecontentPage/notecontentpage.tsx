import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Dimensions,
  FlatList,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import Button from "./../../components/button/button";
import ModalContainer from "./../../components/modal/modal";
import images from "../../assets/images";
import theme from "./../../utilities/theme.style";
import Tag from "./../../components/tag/tag";
import Card from "./../../components/card/card";
import { DEVICE_WIDTH } from "../splashpage";
import { SItem } from "./../../types/note";
const noteContentPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  console.log("notecontentpage");
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [val, setVale] = React.useState(0);
  const [tags, setTags] = React.useState([
    "經典生活引語",
    "初級",
    "文法基礎",
    "慣用語",
    "心理",
    "運動",
    "建築",
    "時尚"
  ]);
  const insets = useSafeAreaInsets();
  const { title } = route.params;
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={{ flex: 1, alignItems: "flex-start", paddingLeft: 20 }}>
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
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: theme.FONT_SIZE_MEDIUM,
              lineHeight: 22,
              fontWeight: "bold",
            }}
          >
            {title}
          </Text>
          <View style={{ flex: 1, alignItems: "flex-end", paddingRight: 20 }}>
            <TouchableOpacity
              onPress={() => {
                // setIsOpenModal(true);
                //   setModalVisible(true);
              }}
            >
              <Image
                style={styles.iconotestyle}
                source={images.icons.edit_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            marginTop: 20,
          }}
        >
          <Text
            style={{
              flex: 1,
              textAlign: "center",
              color: theme.PRIMARY_COLOR_DEFAULT,
            }}
          >
            00:00
          </Text>
          <Slider
            style={{ width: 259, height: 40 }}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={theme.PRIMARY_COLOR_DEFAULT}
            maximumTrackTintColor={theme.SLIDER_BACKGROUND_COLOR}
            onValueChange={(val) => setVale(val)}
          // thumbImage={images.icons.knob_icon}
          />
          <View style={{ flex: 1, alignItems: "center" }}>
            <TouchableOpacity
              onPress={() => {
                // setIsOpenModal(true);
                //   setModalVisible(true);
              }}
            >
              <Image
                style={styles.filterIcon}
                source={images.icons.filter_icon}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            width: 170,
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <TouchableOpacity>
            <Image
              source={images.icons.previous_icon}
              style={styles.audioIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.icons.play_icon} style={styles.audioIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={images.icons.next_icon} style={styles.audioIcon} />
          </TouchableOpacity>
        </View>
        <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
          <Text
            style={{
              fontSize: theme.FONT_SIZE_MEDIUM,
              lineHeight: 25,
              marginTop: 10,
            }}
          >
            During its harrowing descent to the surface of Mars last Thursday,
            NASA's Perseverance rover captured video that the agency is calling
            "How to Land on Mars."
          </Text>

          <Text
            style={{
              fontSize: theme.FONT_SIZE_MEDIUM,
              lineHeight: 25,
              marginTop: 10,
            }}
          >
            The video, along with other newly released footage, gives earthlings
            back home a better sense of the sights and sounds on the red planet.
          </Text>

          <Text
            style={{
              fontSize: theme.FONT_SIZE_MEDIUM,
              lineHeight: 25,
              marginTop: 10,
            }}
          >
            Cameras on "Percy," as the rover is affectionately called at mission
            control, show for the first time the perspective of a spacecraft
            landing on Mars.
          </Text>

          <Text
            style={{
              fontSize: theme.FONT_SIZE_MEDIUM,
              lineHeight: 25,
              marginTop: 10,
            }}
          >
            The video begins 230 seconds after the rover entered the Martian
            atmosphere, with the inflation of the rover's parachute 7 miles
            above the Martian surface, and ends with the rover touching down on
            the surface.
          </Text>
        </View>
        <View style={styles.sectionContainer}>
          {Array.isArray(tags) &&
            tags.map((tag, index) => {
              return (
                <Tag
                  key={index}
                  title={tag}
                  OnClick={() => console.log("add")}
                  customStyle={{
                    paddingHorizontal: 15,
                    paddingVertical: 3,
                    marginRight: 5,
                    marginBottom: 5,
                    height: 24,
                  }}
                  disable={true}
                />
              );
            })}
        </View>
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
  imagefavstyle: {
    resizeMode: "contain",
    width: 355,
    height: 255,
  },
  iconotestyle: {
    resizeMode: "contain",
    width: 30,
    height: 30,
  },
  filterIcon: {
    height: 18,
    width: 18,
    resizeMode: "contain",
  },
  audioIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  sectionContainer: {
    width: DEVICE_WIDTH - 40,
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: .5,
    borderTopColor: theme.BORDER_COLOR,
    marginTop: 20,
    paddingTop: 20
  },
});
export default noteContentPage;
