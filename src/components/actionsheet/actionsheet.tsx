import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import theme from "../../utilities/theme.style";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from "../../pages/splashpage";
export type Props = {
    OnClick: any;
    options: string[];
    OnCancel: any;
};
const ActionSheet: React.FC<Props> = ({
    OnClick,
    OnCancel,
    options
}) => {
    const setItem = () => {
        return options.map((item, index) => {
            return (
                <TouchableOpacity key={index} onPress={() => OnClick(item)} style={{ borderTopWidth: index !== 0 ? 1 : 0, borderTopColor: theme.FONT_COLOR_GRAY4, height: 48, alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: theme.SECONDARY_COLOR_DEFAULT }}>{item}</Text>
                </TouchableOpacity>
            )
        })
    }
    return (
        <View style={{ backgroundColor: theme.MODAL_BACKGROUND_COLOR, width: DEVICE_WIDTH, height: DEVICE_HEIGHT, padding: 16, justifyContent: "flex-end" }}>
            <View style={{ backgroundColor: theme.COLOR_WHITE, borderRadius: 13, width: DEVICE_WIDTH - 32, marginBottom: 16 }}>
                {setItem()}
            </View>
            <TouchableOpacity style={{ backgroundColor: theme.COLOR_WHITE, borderRadius: 13, width: DEVICE_WIDTH - 32, height: 48, alignItems: "center", justifyContent: "center" }} onPress={() => OnCancel()}>
                <Text style={{ color: theme.PRIMARY_COLOR_DEFAULT }}>取消</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ActionSheet;