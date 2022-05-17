import React from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
} from "react-native";
import { Colors } from "../../styles"
import { IActionButton, IActions } from "../../types/components/actionbutton";

const ActionButton: React.FC<IActionButton> = ({
    options
}) => {
    return (
        <View
            style={styles.container}
        >
           {
                options.length > 0 && options.map((option: IActions, index: number) => {
                    return(
                        <>
                            {
                                index!== 0 && <View
                                    style={styles.divider}
                                />
                            }
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => option.func}
                                >
                                    <Text style={{ color: Colors.white }}>{option.name}</Text>
                            </TouchableOpacity>
                        </>
                    )
                })
           }
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        backgroundColor: Colors.action_button_background,
        flexDirection: "column",
        borderRadius: 8,
        right: 15,
        top: 24,
        width: 91,
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 9,
    },
    divider: {
        borderTopWidth: 1,
        borderTopColor: Colors.gray_4,
    }
});

export default ActionButton;