import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import ProfileImage from "./../../components/profileimage/profileimage";
import Button from "./../../components/button/button";
import theme from "./../../utilities/theme.style";
import images from "../../assets/images";

import {
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Image,
    TouchableOpacity,
    Switch,
} from "react-native";
import { DEVICE_WIDTH } from "../splashpage";
const subscriptPage = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <LinearGradient
            colors={[theme.BACKGROUND_COLOR_1, theme.BACKGROUND_COLOR_2]}
            style={styles.container}
        >
            <SafeAreaView
                style={{
                    height: "100%",
                    alignItems: "center",
                    width: DEVICE_WIDTH,
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 20
                    }}
                >
                    <View
                        style={{ flex: 1, alignItems: "flex-start" }}
                    >
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
                        進階功能
            </Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }} />
                </View>
                <ProfileImage
                    name={images.icons.default_profileimage}
                    size={130}
                    customStyle={{
                        height: 130,
                        width: 130,
                        marginTop: 25,
                        marginBottom: 20,
                        borderRadius: 65,
                    }}
                />
                <Button
                    title="登入"
                    onPress={() => navigation.push('loginPage')}
                    customStyle={{
                        width: 150,
                        height: 36,
                        borderRadius: 20,
                        flexDirection: "row",
                        marginBottom: 44,
                    }}
                    imageSize={{
                        width: 16,
                        height: 16,
                        marginRight: 7,
                    }}
                    type="1"
                    image={""}
                />
                <View>

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
        justifyContent: "center",
    },
    sectionRow: {
        flexDirection: "row",
        height: 60,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        width: DEVICE_WIDTH,
        borderTopColor: "#96CACA",
        borderTopWidth: 1,
    },
    sectionText: {},
    version: {
        color: "rgba(60, 60, 67, 0.6)",
    },
    sectionArrow: {
        width: 7,
        height: 12,
    },
});

export default subscriptPage;
