import { FC } from "react";

export interface ITabview {
    titles: string[];
    children: FC[];
    customStyle?: object;
  };