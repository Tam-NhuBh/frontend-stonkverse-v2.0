"use client";

import { ReactNode, FC } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

interface Props {
  children: ReactNode;
}

export const StoreProvider: FC<Props> = ({ children }): JSX.Element => {
  return <Provider store={store}>{children}</Provider>;
};
