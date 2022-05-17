import { ImageSourcePropType } from "react-native";

export interface ICard {
    OnClick: (str: string)=> void;
    customStyle: object;
    title: string;
    speech: string;//詞性
    subtitle: string;//可數, 不可數, 單複數
    detail: any;
    buttons: Array<ICardButton>;
    manualCompare?: boolean;
  };

export interface ICardButton {
  name: string,
  path: ImageSourcePropType,
  onClick:()=>void
};
  