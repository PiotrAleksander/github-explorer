import React from "react";
import { Provider } from "react-redux";

import createStore from "domain/store";
import { IStateProviderProps } from "types";

const store = createStore();

export default ({ children }: IStateProviderProps) => (
  <Provider store={store}>{children}</Provider>
);
