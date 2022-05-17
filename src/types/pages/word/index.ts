export interface IWord {
  word: string;
  def: any[];
  example: string[];
}

export interface IItem {
  word: string;
  detail: string; 
  number?: number;
  handleOnPress:()=>void
  handleOnRemove:()=>void
}
