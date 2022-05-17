export interface IActions {
    name: string,
    func: ()=> void
};
export interface IActionButton {
    options: IActions[]
};