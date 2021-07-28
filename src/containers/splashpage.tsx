import React from "react";
import { StyleSheet, View, Image, Dimensions } from "react-native";
import theme from "./../utilities/theme.style";
import Images from "./../assets/images";
export const DEVICE_WIDTH = Dimensions.get("window").width;
export const DEVICE_HEIGHT = Dimensions.get("window").height;
const splashPage = ({ navigation }: { navigation: any }) => {
  React.useEffect(() => {
    setTimeout(() => {
      navigation.navigate("homePage", {
        withAnimation: true,
      });
    }, 3000);
  });
  return (
    <View style={styles.splashContainer}>
      <Image style={styles.splashImage} source={Images.icons.logo_icon} />
    </View>
  );
};
const styles = StyleSheet.create({
  splashContainer: {
    backgroundColor: theme.SECONDARY_COLOR_DEFAULT,
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
    resizeMode: "contain",
  },
});
export default splashPage;
