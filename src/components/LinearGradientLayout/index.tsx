import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import {
    StyleSheet
} from "react-native";
import { Colors } from "../../styles"

const LinearGradientLayout : FC = ({
    children,
  })  => {
    return(
        <LinearGradient
            colors={[Colors.white, Colors.page_background]}
            style={styles.container}
        >
            {children}
        </LinearGradient>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: "center",
        width: "100%",
    },
})

export default LinearGradientLayout