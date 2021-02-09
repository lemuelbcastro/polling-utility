import React from "react";
import ReactDOM from "react-dom";
import { CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";
import { SnackbarProvider } from "notistack";
import { Titlebar, Color } from 'custom-electron-titlebar';
import "fontsource-roboto";

import theme from "./theme";
import Main from "./components/Main";
import { SnackbarHelperConfigurator } from "./utils/snackbarHelper";

new Titlebar({
	backgroundColor: Color.fromHex('#212121'),
	maximizable: false,
});

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
