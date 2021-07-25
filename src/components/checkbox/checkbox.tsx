import React, { useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    Pressable,
    Image,
    TouchableWithoutFeedback,
} from "react-native";
import Icon from "./../icon/icon";
import Images from "./../../assets/images";
import theme from "./../../utilities/theme.style";

export type Props = {
    checked: boolean;
    OnClick: any;
    customStyle: any;
    title: string;
};
const CheckBox: React.FC<Props> = ({
    checked,
    OnClick,
    customStyle,
    title,
}) => {

    const handleOnCheck = () => {
        if (OnClick) OnClick(!checked)
    }
    console.log(checked)
    return (
        <View style={styles.checkbox}>
            <Pressable
                style={[customStyle, styles.circle]}
                onPress={handleOnCheck}>
                {checked && <Image source={Images.icons.checkbox_icon} style={{
                    width: 12,
                    height: 10,
                }} />}
            </Pressable>
            <Text style={{ color: theme.PRIMARY_COLOR_DEFAULT, fontSize: theme.FONT_SIZE_MEDIUM }}>{title}</Text>
        </View>

    );
};
const styles = StyleSheet.create({
    circle: {
        borderColor: theme.PRIMARY_COLOR_DEFAULT,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 9
    },
    checkbox: {
        flexDirection: "row",
        alignItems: 'center'
    }
});
export default CheckBox;
