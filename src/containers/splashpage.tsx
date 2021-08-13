import React from "react";
import { StyleSheet, View, Image, Dimensions, Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import theme from "./../utilities/theme.style";
import Images from "./../assets/images";
import { setUserLogin } from "./../actions/user";

export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
const splashPage = ({ navigation }: { navigation: any }) => {
  const dispatch: Dispatch<any> = useDispatch();
  React.useEffect(() => {
    const authentication = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('isLoggedIn')
        dispatch(setUserLogin(!!isLoggedIn));
        setTimeout(() => {
          navigation.navigate("homePage", {
            withAnimation: true,
          });
        }, 3000);
      } catch (e) {
        // error reading value
        console.log('e', e)
      }
    }
    authentication()
  }, []);
  return (
    <View style={styles.splashContainer}>
      <Image style={styles.splashImage} source={Images.icons.logo_icon} />
      <Text style={{ fontSize: theme.FONT_SIZE_SMALL, marginTop: 220 }}>版本資訊：5.8.7</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: '#E4CAB3',
    width: "100%",
    height: "100%",
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
});
export default splashPage;
