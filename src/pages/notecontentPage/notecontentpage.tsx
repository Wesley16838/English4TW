import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio/Sound";
import * as Device from "expo-device";
import * as FileSystem from "expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import Button from "../../components/Button/Button";
import images from "../../assets/images";
import theme from "./../../utilities/theme.style";
import Tag from "../../components/Tag/Tag";
import ModalContainer from "../../components/Modal/Modal";
import { DEVICE_WIDTH } from "../splashpage";
//  setOnPlaybackStatusUpdate(({ shouldPlay, isLoaded }) => { ... })
const noteContentPage = ({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) => {
  const [animation, setAnimation] = React.useState(new Animated.Value(0));
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(0);
  const [isPlay, setIsPlay] = React.useState(false);
  const [isPreviousPlay, setIsPreviousPlay] = React.useState(false);
  const [isFinish, setIsFinish] = React.useState(false);
  const [playbackObject, setPlaybackObject] = React.useState<Sound | null>(
    null
  );
  const [playbackStatus, setPlaybackStatus] = React.useState<any>({});
  const [errMsg, setErrMsg] = React.useState("");
  const [isOptionVisible, setIsOptionVisible] = React.useState(false);
  const [speedModalVisible, setSpeedModalVisible] = React.useState(false);
  const [paragraphModalVisible, setParagraphModalVisible] = React.useState(
    false
  );
  const [tags, setTags] = React.useState([
    "經典生活引語",
    "初級",
    "文法基礎",
    "慣用語",
    "心理",
    "運動",
    "建築",
    "時尚",
  ]);
  const apiEndpoint =
    "https://www.english4tw.com/blog/get/tts?text=This%20gave%20oarsmen%20enough%20leverage%20to%20row%20efficiently%2C%20but%20at%20the%20expense%20of%20seaworthiness.%20&from_lang=en&to_lang=zh-CHT";
  const insets = useSafeAreaInsets();
  const { title } = route.params;
  useEffect(() => {
    if (playbackObject === null) {
      setPlaybackObject(new Audio.Sound());
    }
  }, []);
  useEffect(() => {
    const fetchAudio = async () => {
      if (Device.osName === "Android") {
        playbackObject &&
          playbackObject
            .loadAsync({ uri: apiEndpoint }, { shouldPlay: true })
            .then(() => {
              playbackObject.getStatusAsync().then((res: any) => {
                // setPlaybackStatus(res);
                setDuration(res.durationMillis);
              });
            })
            .catch((err) => setErrMsg(err));
      } else {
        FileSystem.downloadAsync(
          apiEndpoint,
          FileSystem.documentDirectory + "test2.mp3"
        )
          .then(() => {
            playbackObject &&
              playbackObject
                .loadAsync({
                  uri: FileSystem.documentDirectory + "test2.mp3",
                })
                .then(() => {
                  playbackObject.getStatusAsync().then((res: any) => {
                    setPlaybackStatus(res);
                    setDuration(res.durationMillis);
                    setIsFinish(false);
                  });
                  playbackObject.setOnPlaybackStatusUpdate(
                    _onPlaybackStatusUpdate
                  );
                })
                .catch((err) => setErrMsg(err));
          })
          .catch((error) => {
            setErrMsg(error);
          });
      }
    };
    if (playbackObject !== null) {
      fetchAudio();
    }
    return () => {
      playbackObject && playbackObject.unloadAsync();
    };
  }, [playbackObject]);

  const _onPlaybackStatusUpdate = (playbackStatus: any) => {
    if (!playbackStatus.isLoaded) {
      // Update your UI for the unloaded state
      if (playbackStatus.error) {
        // Send Expo team the error on Slack or the forums so we can help you debug!
      }
    } else {
      // Update your UI for the loaded state

      if (playbackStatus.isPlaying) {
        // Update your UI for the playing state
        setTime(playbackStatus.positionMillis);
        if (playbackStatus.positionMillis === playbackStatus.durationMillis) {
          setIsFinish(true);
          setIsPlay(false);
          setIsPreviousPlay(false);
        }
      } else {
        setTime(playbackStatus.positionMillis);
        // Update your UI for the paused state
      }

      if (playbackStatus.isBuffering) {
        // Update your UI for the buffering state
      }

      if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
        // The player has just finished playing and will stop. Maybe you want to play something else?
      }
    }
  };

  const handleAudioPlayPause = async () => {
    if (playbackObject && isFinish) {
      const status = await playbackObject.replayAsync();
      setIsPlay(true);
      setIsFinish(false);
      return setPlaybackStatus(status);
    } else {
      // It will pause our audio
      if (playbackObject && isPlay) {
        const status = await playbackObject.pauseAsync();
        setIsPlay(false);
        setIsPreviousPlay(false);
        return setPlaybackStatus(status);
      }

      // It will resume our audio
      if (playbackObject && !isPlay) {
        const status = await playbackObject.playAsync();
        setIsPlay(true);
        setIsPreviousPlay(true);
        return setPlaybackStatus(status);
      }
    }
  };

  const onSlidingCompleted = async (value: any) => {
    if (playbackObject) {
      //is finish or not
      await playbackObject.setPositionAsync(value);
      if (isPreviousPlay && !isFinish) {
        //Previous is playing and isn't finish
        const status = await playbackObject.playAsync();
        setIsPlay(true);
        return setPlaybackStatus(status);
      } else if (!isPreviousPlay && isFinish) {
        const status = await playbackObject.playAsync();
        setIsPlay(true);
        setIsFinish(false);
        return setPlaybackStatus(status);
      }
    }
  };

  const onSlidingStarted = async () => {
    if (playbackObject && isPlay) {
      await playbackObject.pauseAsync();
      setIsPlay(false);
    }
  };

  const onSliderValueChanging = async (value: any) => {
    if (playbackObject) {
      setTime(value);
    }
  };

  const changeSpeed = (rate: number) => {
    playbackObject && playbackObject.setRateAsync(rate, true);
  };
  const changePosition = (millis: number) => {
    playbackObject && playbackObject.setPositionAsync(millis);
  };
  const handleBack = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    navigation.goBack();
  };
  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={speedModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ModalContainer
          content={["慢", "中", "快"]}
          title={"播放速度"}
          onCancel={() => setSpeedModalVisible(false)}
        />
      </Modal>
      <Modal
        animationType="fade"
        transparent={true}
        visible={paragraphModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <ModalContainer
          content={["一次播放", "分段播放"]}
          title={"播放段落"}
          onCancel={() => setParagraphModalVisible(false)}
        />
      </Modal>
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
              paddingHorizontal: 20,
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
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push("newnotepage", {
                    title: title,
                  });
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
              {new Date(time).toISOString().substr(14, 5)}
            </Text>
            <Slider
              style={{ width: 259, height: 40 }}
              value={time}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor={theme.PRIMARY_COLOR_DEFAULT}
              maximumTrackTintColor={theme.SLIDER_BACKGROUND_COLOR}
              onValueChange={(val) => onSliderValueChanging(val)}
              onSlidingComplete={(val) => onSlidingCompleted(val)}
              onSlidingStart={() => onSlidingStarted()}
            />
            <View
              style={{ flex: 1, alignItems: "center", position: "relative" }}
            >
              <TouchableOpacity
                onPress={() => {
                  setIsOptionVisible(!isOptionVisible);
                }}
              >
                <Image
                  style={styles.filterIcon}
                  source={images.icons.filter_icon}
                />
              </TouchableOpacity>
              {isOptionVisible && (
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "#3A3A3C",
                    flexDirection: "column",
                    borderRadius: 8,
                    right: 15,
                    top: 24,
                    width: 91,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 9,
                    }}
                    onPress={() => setSpeedModalVisible(true)}
                  >
                    <Text style={{ color: theme.COLOR_WHITE }}>播放速度</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      borderTopWidth: 1,
                      borderTopColor: "#BDBDBD",
                    }}
                  />
                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      paddingVertical: 9,
                    }}
                    onPress={() => setParagraphModalVisible(true)}
                  >
                    <Text style={{ color: theme.COLOR_WHITE }}>播放段落</Text>
                  </TouchableOpacity>
                </View>
              )}
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
            <TouchableOpacity onPress={() => {}}>
              <Image
                source={images.icons.previous_icon}
                style={styles.audioIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                handleAudioPlayPause();
              }}
            >
              <Image
                source={
                  isPlay ? images.icons.pause_icon : images.icons.play_icon
                }
                style={styles.audioIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}}>
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
              NASA's Perseverance rover captured video that the agency is
              calling "How to Land on Mars."
            </Text>

            <Text
              style={{
                fontSize: theme.FONT_SIZE_MEDIUM,
                lineHeight: 25,
                marginTop: 10,
              }}
            >
              The video, along with other newly released footage, gives
              earthlings back home a better sense of the sights and sounds on
              the red planet.
            </Text>

            <Text
              style={{
                fontSize: theme.FONT_SIZE_MEDIUM,
                lineHeight: 25,
                marginTop: 10,
              }}
            >
              Cameras on "Percy," as the rover is affectionately called at
              mission control, show for the first time the perspective of a
              spacecraft landing on Mars.
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
              above the Martian surface, and ends with the rover touching down
              on the surface.
            </Text>
          </View>
          <View style={styles.sectionContainer}>
            {Array.isArray(tags) &&
              tags.map((tag, index) => {
                return (
                  <Tag
                    key={index}
                    title={tag}
                    OnClick={() => {}}
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
    </>
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
    borderTopWidth: 0.5,
    borderTopColor: theme.BORDER_COLOR,
    marginTop: 20,
    paddingTop: 20,
  },
});
export default noteContentPage;
