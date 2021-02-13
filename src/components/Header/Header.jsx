import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import SettingsIcon from "@material-ui/icons/Settings";
import Store from "electron-store";
import { ipcRenderer } from "electron";

import Settings from "../Settings";

const store = new Store({ watch: true });

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  active: {
    color: theme.palette.success[theme.palette.type],
  },
  inactive: {
    color: theme.palette.error[theme.palette.type],
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const { active } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(
    store.get("settings.application.headerText")
  );

  useEffect(() => {
    store.onDidChange("settings.application.headerText", (newText) => {
      setText(newText);
    });

    ipcRenderer.on("settings-show", () => setOpen(true));
  }, []);

  return (
    <React.Fragment>
      <AppBar color="inherit" position="absolute">
        <Toolbar>
          <RadioButtonCheckedIcon
            className={clsx(
              classes.icon,
              active ? classes.active : classes.inactive
            )}
          />
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

Header.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default Header;
