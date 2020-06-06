import React from "react";
import { ThemeProvider } from "emotion-theming";
import { IThemeProviderProps } from "./types";

const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64],
  colors: {
    primary: "#2D9CDB",
    white: "#FFFFFF",
    black: "#010101",
    gray: "#F2F2F2",
    grayDark: "#E1DFE0",
  },
  buttons: {
    primary: {
      color: "white",
      bg: "primary",
    },
  },
};

export default ({ children }: IThemeProviderProps) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
