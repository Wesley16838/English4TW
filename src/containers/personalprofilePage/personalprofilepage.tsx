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
const personalprofilePage = ({
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
                        個人資訊
            </Text>
                    <View style={{ flex: 1, alignItems: "flex-end" }} />
                </View>
                <ProfileImage
                    name={images.icons.default_profileimage}
                    size={130}
                    customStyle={{
                        height: 130,
                        width: 130,
                        marginTop: 43,
                        marginBottom: 20,
                        borderRadius: 65,
                    }}
                />
                <Button
                    title="變更頭像"
                    onPress={() => navigation.push('loginPage')}
                    customStyle={{
                        flexDirection: "row",
                        marginBottom: 40,
                    }}
                    imageSize={{
                        width: 16,
                        height: 16,
                        marginRight: 7,
                    }}
                    type="text"
                    image={""}
                    fontStyle={{
                        color: theme.SECONDARY_COLOR_DEFAULT
                    }}
                />
                <View>
                    <View>
                        <TouchableWithoutFeedback
                            accessible={true}
                            accessibilityLabel={"姓名"}
                            accessibilityHint={"姓名"}
                            onPress={() => navigation.push('personalprofilePage')}
                        >
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>{"姓名"}</Text>
                                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={[styles.sectionText, { marginRight: 11, fontSize: theme.FONT_SIZE_MEDIUM, color: 'rgba(60, 60, 67, 0.6)' }]}>{"Samalia Juda"}</Text>
                                    <Image
                                        style={styles.sectionArrow}
                                        source={images.icons.rightarrow_icon}
                                    />
                                </View>

                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback
                            accessible={true}
                            accessibilityLabel={"姓名"}
                            accessibilityHint={"姓名"}
                            onPress={() => navigation.push('personalprofilePage')}
                        >
                            <View style={styles.sectionRow}>
                                <Text style={styles.sectionText}>{"電子信箱"}</Text>
                                <Text style={[styles.sectionText, { marginRight: 11, fontSize: theme.FONT_SIZE_MEDIUM, color: 'rgba(60, 60, 67, 0.6)' }]}>{"mercucu@gmail.com"}</Text>

                            </View>
                        </TouchableWithoutFeedback>
                    </View>
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
        backgroundColor: theme.COLOR_WHITE,
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

export default personalprofilePage;
