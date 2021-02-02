import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import "fontsource-roboto";

import theme from './theme'
import Main from "./components/Main";
import Title from "./components/Title";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline/>
    <Title />
    <Main />
  </ThemeProvider>,
  document.getElementById("root")
);
