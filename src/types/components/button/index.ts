import { ImageSourcePropType } from "react-native";

export default interface IButton {
    onPress: ()=>void;
    type: string;
    title?: string;
    customStyle?: object;
    image?: ImageSourcePropType;
    imageSize?:{
        width: number;
        height: number;
        marginRight?: number;
    }
    fontStyle?: object;
};