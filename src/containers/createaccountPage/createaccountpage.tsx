import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Dimensions,
    Animated,
    Image,
    Text,
    Modal,
    Alert,
} from "react-native";
import Button from "./../../components/button/button";
import InputBox from "./../../components/inputbox/inputbox";
import CheckBox from "./../../components/checkbox/checkbox";
import ProfileImage from "./../../components/profileimage/profileimage";
import theme from "../../utilities/theme.style";
import images from "../../assets/images";
import { DEVICE_WIDTH } from "../splashpage";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
const createaccountPage = ({
    navigation,
    route,
}: {
    navigation: any;
    route: any;
}) => {
    const [animation, setAnimation] = React.useState(new Animated.Value(0));
    const [account, setAccount] = React.useState({
        fullname: "",
        email: "",
        password: "",
        secondpassword: "",
    })
    const [checked, onCheck] = React.useState(false);
    const screenHeight = Dimensions.get("window").height;
    const screenWidth = Dimensions.get("window").width;
    const handleOnFacebookLogin = () => { }
    const handleOnLogin = () => {

    }
    const onCreateAccountNext = () => {
        navigation.push('')
    }
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
            duration: 300,
            useNativeDriver: true,
        }).start();
        navigation.goBack();
    };
    const handleRemove = () => {
        Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        navigation.goBack();
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
        <>
            <View style={styles.container}>
                <Animated.View
                    style={[StyleSheet.absoluteFill, styles.cover, backdrop]}
                />
                <View style={[styles.sheet]}>
                    <Animated.View style={[styles.popup, slideUp]}>
                        <View style={styles.sectionRow}>
                            <Button
                                title=""
                                image={images.icons.close_icon}
                                customStyle={{}}
                                imageSize={{ height: 30, width: 30, marginRight: 0 }}
                                type=""
                                onPress={() => handleClose()}
                            />
                        </View>
                        <View style={styles.sectionContainer}>
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
                            <TouchableWithoutFeedback>
                                <Text>變更頭像</Text>
                            </TouchableWithoutFeedback>
                            <InputBox
                                OnChangeText={(str: string) =>
                                    setAccount({
                                        ...account,
                                        email: str
                                    })
                                }
                                customStyle={{
                                    width: DEVICE_WIDTH - 40,
                                    height: 40,
                                    marginTop: 6,
                                    marginBottom: 20,
                                }}
                                placeHolder={"例如：王小明"}
                                placeHolderTextColor={"#96CACA"}
                                value={account.email}
                                title={"姓名"}
                            />
                            <InputBox
                                OnChangeText={(str: string) =>
                                    setAccount({
                                        ...account,
                                        email: str
                                    })
                                }
                                customStyle={{
                                    width: DEVICE_WIDTH - 40,
                                    height: 40,
                                    marginTop: 6,
                                    marginBottom: 20,
                                }}
                                placeHolder={"例如：XXXXXX@gmail.com"}
                                placeHolderTextColor={"#96CACA"}
                                value={account.email}
                                title={"電子信箱"}
                            />
                            <InputBox
                                OnChangeText={(str: string) =>
                                    setAccount({
                                        ...account,
                                        password: str
                                    })
                                }
                                customStyle={{
                                    width: DEVICE_WIDTH - 40,
                                    height: 40,
                                    marginTop: 6,
                                    marginBottom: 20,
                                }}
                                placeHolder={"需有大小寫字母加數字"}
                                placeHolderTextColor={"#96CACA"}
                                value={account.email}
                                title={"密碼"}
                            />
                            <InputBox
                                OnChangeText={(str: string) =>
                                    setAccount({
                                        ...account,
                                        secondpassword: str
                                    })
                                }
                                customStyle={{
                                    width: DEVICE_WIDTH - 40,
                                    height: 40,
                                    marginTop: 6,
                                    marginBottom: 20,
                                }}
                                placeHolder={"再一次輸入密碼"}
                                placeHolderTextColor={"#96CACA"}
                                value={account.email}
                                title={"確認密碼"}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: DEVICE_WIDTH - 40 }}>
                                <CheckBox
                                    checked={checked}
                                    OnClick={(boo: boolean) => onCheck(boo)}
                                    customStyle={{
                                        width: 20,
                                        height: 20,
                                    }}
                                    title={'我已閱讀並同意English4Tw的隱私政策'}
                                />
                            </View>
                            <Button
                                title="下一步"
                                onPress={() => onCreateAccountNext()}
                                customStyle={{
                                    width: DEVICE_WIDTH - 40,
                                    height: 50,
                                    borderRadius: 25,
                                    marginVertical: 20
                                }}
                                imageSize={{}}
                                type="2"
                                image={""}
                                fontStyle={{}}
                            />
                        </View>
                    </Animated.View>
                </View>
            </View>
        </>
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
    popup: {
        backgroundColor: theme.COLOR_WHITE,
        borderTopLeftRadius: 13,
        borderTopRightRadius: 13,
        minHeight: Dimensions.get("window").height - 54,

        paddingTop: 26,
    },
    sectionRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: 25,
        paddingBottom: 20,
        borderBottomWidth: 0.5,
        borderBottomColor: theme.FONT_COLOR_GRAY4,
    },
    sectionContainer: {
        flexDirection: "column",
        alignItems: "center",
        paddingHorizontal: 20

    },
    actionsheet: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});

export default createaccountPage;
