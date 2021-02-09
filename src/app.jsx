import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import "fontsource-roboto";

import theme from "./theme";
import Main from "./components/Main";
import { SnackbarHelperConfigurator } from "./utils/snackbarHelper";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <SnackbarProvider maxSnack={1}>
      <SnackbarHelperConfigurator />
      <Main />
    </SnackbarProvider>
  </ThemeProvider>,
  document.getElementById("root")
);
