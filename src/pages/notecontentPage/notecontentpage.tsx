import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  StyleSheet,
  View,
  Text,
  Animated,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  TextStyle,
} from "react-native";
import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio/Sound";
import * as Device from "expo-device";
import * as FileSystem from "expo-file-system";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Slider from "@react-native-community/slider";
import Button from "../../components/Button/Button";
import images from "../../assets/images";
import { Colors, Spacing, Typography } from "../../styles";
import Tag from "../../components/Tag/Tag";
import ModalContainer from "../../components/Modal/Modal";
import { DEVICE_WIDTH } from "../splashpage";
import ActionButton from "../../components/ActionButton/ActionButton";
import LinearGradientLayout from "../../components/LinearGradientLayout";
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
  const tags = [
    "經典生活引語",
    "初級",
    "文法基礎",
    "慣用語",
    "心理",
    "運動",
    "建築",
    "時尚",
  ]
  const actionList = [
    {
      name: "播放速度",
      func: () => setSpeedModalVisible(true)
    },
    {
      name: "播放段落",
      func: () => setParagraphModalVisible(true)
    }
  ]
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
      <LinearGradientLayout>
        <SafeAreaView
          style={{
            marginTop: Spacing.space_xs,
            height: "100%",
            alignItems: "center",
            width: DEVICE_WIDTH,
            paddingBottom: insets.bottom + Spacing.space_l,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingHorizontal: Spacing.space_l,
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
            style={styles.sliderWrapper}
          >
            <Text
              style={styles.timer}
            >
              {new Date(time).toISOString().substr(14, 5)}
            </Text>
            <Slider
              style={{ width: 259, height: 40 }}
              value={time}
              minimumValue={0}
              maximumValue={duration}
              minimumTrackTintColor={Colors.primary}
              maximumTrackTintColor={Colors.range_slider}
              onValueChange={(val) => onSliderValueChanging(val)}
              onSlidingComplete={(val) => onSlidingCompleted(val)}
              onSlidingStart={() => onSlidingStarted()}
            />
            <View
              style={styles.filterButton}
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
              {isOptionVisible && <ActionButton options={actionList}/>}
            </View>
          </View>
          <View
            style={styles.audioActions}
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
          <View style={styles.noteContainer}>
            <Text
              style={styles.noteContent}
            >
              During its harrowing descent to the surface of Mars last Thursday,
              NASA's Perseverance rover captured video that the agency is
              calling "How to Land on Mars."
            </Text>

            <Text
              style={styles.noteContent}
            >
              The video, along with other newly released footage, gives
              earthlings back home a better sense of the sights and sounds on
              the red planet.
            </Text>

            <Text
              style={styles.noteContent}
            >
              Cameras on "Percy," as the rover is affectionately called at
              mission control, show for the first time the perspective of a
              spacecraft landing on Mars.
            </Text>

            <Text
              style={styles.noteContent}
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
                      height: 24,
                      paddingHorizontal: 15,
                      paddingVertical: 3,
                      marginRight: 5,
                      marginBottom: 5,
                    }}
                    disable={true}
                  />
                );
              })}
          </View>
        </SafeAreaView>
      </LinearGradientLayout>
    </>
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
  sliderWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.space_l,
    marginTop: Spacing.space_l,
  },
  timer: {
    flex: 1,
    textAlign: "center",
    color: Colors.primary,
  },
  noteItem: {
    width: DEVICE_WIDTH,
    paddingHorizontal: Spacing.space_l,
    height: 60,
    justifyContent: "center",
    borderBottomColor: Colors.primary,
    borderBottomWidth: 1,
    backgroundColor: Colors.white,
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
  filterButton: {
    flex: 1, 
    alignItems: "center", 
    position: "relative"
  },
  audioIcon: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  audioActions: {
    flexDirection: "row",
    width: 170,
    justifyContent: "space-between",
    marginTop: 10,
  },
  sectionContainer: {
    width: DEVICE_WIDTH - 40,
    flexDirection: "row",
    flexWrap: "wrap",
    borderTopWidth: 0.5,
    borderTopColor: Colors.gray_2,
    marginTop: Spacing.space_l,
    paddingTop: Spacing.space_l,
  },
  noteContent: {
    ...Typography.base,
    lineHeight: 25,
    marginTop: 10,
  },
  noteContainer: {
    paddingHorizontal: 20, 
    marginTop: 20
  }
});
export default noteContentPage;
