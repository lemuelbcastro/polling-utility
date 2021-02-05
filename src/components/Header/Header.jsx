import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import Store from "electron-store";

import Settings from "../Settings";

const store = new Store({ watch: true });

const useStyles = makeStyles({
  flexGrow: {
    flexGrow: 1,
  },
});

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(store.get("settings.application.headerText"));

  useEffect(() => {
    store.onDidChange("settings.application.headerText", (newText) => {
      setText(newText);
    });
  }, []);

  return (
    <React.Fragment>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            {text}
          </Typography>
          <div className={classes.flexGrow} />
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen(true)}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Settings open={open} handleClose={() => setOpen(false)} />
    </React.Fragment>
  );
};

export default Header;
