export default interface ICheckbox {
    title: string;
    checked: boolean;
    OnClick: (arg: boolean) => void;
    customStyle: object;
};