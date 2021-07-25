import React from "react";
import {
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  Platform,
  Text,
} from "react-native";
export type Props = {
  name: any;
  size: any;
  customStyle: any;
};
const ProfileImage: React.FC<Props> = ({
  name,
  size,
  customStyle,
}) => {

  return (
    <Image
      style={[
        customStyle,
        styles.profileimage,
        { resizeMode: Platform.OS === "ios" ? "contain" : "cover" },
      ]}
      source={name}
    />
  );
};
const styles = StyleSheet.create({
  profileimage: {
    borderWidth: 2,
    borderColor: "transparent",
  },
});
export default ProfileImage;
