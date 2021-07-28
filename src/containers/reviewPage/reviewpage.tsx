import React, { useState, useRef } from "react";
import {
    StyleSheet,
    View,
    Text,
    Animated,
    Image,
    TouchableOpacity,
    Modal,
} from "react-native";
import TextArea from "./../../components/textarea/textarea";
import Button from "./../../components/button/button";
import images from "./../../assets/images";
import theme from "./../../utilities/theme.style";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../splashpage";
const ReviewPage = () => {
    return (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    marginTop: 56,
                    marginBottom: 40,
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
                        textAlign: 'center',
                        fontSize: theme.FONT_SIZE_MEDIUM,
                        lineHeight: 22,
                        fontWeight: "bold",
                    }}
                >
                    儲存字彙
            </Text>
                <View style={{ flex: 1 }} />
            </View>
            <TextArea
                OnClick={() => console.log('')}
                placeHolder={"輸入內容"}
                customStyle={{ width: DEVICE_WIDTH - 40, height: 150 }}
                placeHolderTextColor={"#96CACA"}
                limit={100}
            />
        </View>

    )
}
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
    }
});
export default ReviewPage;