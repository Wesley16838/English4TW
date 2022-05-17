import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Colors, Spacing } from "../../styles"
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
                <TouchableOpacity 
                    key={index} 
                    onPress={() => OnClick(item)} 
                    style={[styles.item, { borderTopWidth: index !== 0 ? 1 : 0 }]}
                >
                    <Text style={ styles.itemText }>{item}</Text>
                </TouchableOpacity>
            )
        })
    }
    return (
        <View style={ styles.container }>
            <View style={ styles.itemWrapper }>
                {setItem()}
            </View>
            <TouchableOpacity 
                style={ styles.button } 
                onPress={() => OnCancel()}
            >
                <Text style={ styles.text }>取消</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: DEVICE_WIDTH, 
        height: DEVICE_HEIGHT, 
        backgroundColor: Colors.modal_background, 
        padding: Spacing.space_m,
        justifyContent: "flex-end"
    },
    itemWrapper: {
        width: DEVICE_WIDTH - 32, 
        backgroundColor: Colors.white, 
        borderRadius: 13, 
        marginBottom: Spacing.space_m
    },
    item: {
        borderTopColor: Colors.gray_4, 
        height: 48, 
        alignItems: "center", 
        justifyContent: "center"
    },
    itemText: {
        color: Colors.secondary
    },
    button: {
        width: DEVICE_WIDTH - 32, 
        height: 48, 
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: Colors.white, 
        borderRadius: 13
    },
    text: {
        color: Colors.primary
    }
});

export default ActionSheet;