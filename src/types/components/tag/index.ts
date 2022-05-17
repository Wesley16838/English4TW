export default interface ITag {
    title: string;
    OnClick: ()=> void;
    customStyle: object;
    disable?: boolean;
  };