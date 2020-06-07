import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

import { IThemeProviderProps } from "./types";

const theme = createMuiTheme({});

export default ({ children }: IThemeProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
