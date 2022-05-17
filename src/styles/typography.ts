import { FontWeight } from "../types/styles";
import Colors from "./colors";
export const Font = {
    // font-size
    FONT_SIZE_XS: 12,
    FONT_SIZE_SM: 15,
    FONT_SIZE_BASE: 17,
    FONT_SIZE_LG: 20,
    FONT_SIZE_XL: 25,
    FONT_SIZE_2XL: 35,

    // font-weight
    FONT_WEIGHT_NORMAL: "normal",
    FONT_WEIGHT_BOLD: "bold",
}

const Typography = {
    xs: {
        fontSize: Font.FONT_SIZE_SM,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },
    sm: {
        fontSize: Font.FONT_SIZE_SM,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },

    base: {
        fontSize: Font.FONT_SIZE_BASE,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },

    base_bold: {
        fontSize: Font.FONT_SIZE_BASE,
        fontWeight: Font.FONT_WEIGHT_BOLD as FontWeight,
    },

    sm_primary: {
        color: Colors.primary,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
        fontSize: Font.FONT_SIZE_SM,
    },

    base_primary: {
        color: Colors.primary,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
        fontSize: Font.FONT_SIZE_BASE,
    },
   
    base_secondary: {
        color: Colors.secondary,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
        fontSize: Font.FONT_SIZE_BASE,
    },
    lg: {
        fontSize: Font.FONT_SIZE_LG,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },
    lg_bold: {
        fontSize: Font.FONT_SIZE_LG,
        fontWeight: Font.FONT_WEIGHT_BOLD as FontWeight,
    },
    xl: {
        fontSize: Font.FONT_SIZE_XL,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },
    xl_bold: {
        fontSize: Font.FONT_SIZE_XL,
        fontWeight: Font.FONT_WEIGHT_BOLD as FontWeight,
    },
    xxl: {
        fontSize: Font.FONT_SIZE_2XL,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },
    title: {
        fontSize: Font.FONT_SIZE_XL,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },

    title_larger: {
        fontSize: Font.FONT_SIZE_2XL,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
    },

    subtitle: {
        fontSize: Font.FONT_SIZE_XL,
        fontWeight: Font.FONT_WEIGHT_BOLD as FontWeight,
    }, 
    pageTitle: {
        fontSize: Font.FONT_SIZE_BASE,
        fontWeight: Font.FONT_WEIGHT_BOLD as FontWeight,
        flex: 1,
        textAlign: "center",
        lineHeight: 22,
    },
    // component text
    explaination: {
        fontSize: Font.FONT_SIZE_BASE,
        fontWeight: Font.FONT_WEIGHT_NORMAL as FontWeight,
        color: Colors.gray_3
    },
    info: {
        fontSize: Font.FONT_SIZE_XS,
        color: Colors.gray_3
    },
    
}

export default Typography;
  