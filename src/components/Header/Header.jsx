import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import { AppBar, IconButton, Toolbar, Typography } from "@material-ui/core";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import SettingsIcon from "@material-ui/icons/Settings";
import NotesIcon from "@material-ui/icons/Notes";
import { ipcRenderer } from "electron";

import store from "../../utils/store";
import Logs from "../Logs";
import Settings from "../Settings";

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
  const [open, setOpen] = useState({ settings: false, logs: false });
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
            onClick={() => setOpen({ ...open, logs: true })}
          >
            <NotesIcon />
          </IconButton>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setOpen({ ...open, settings: true })}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Logs
        open={open.logs}
        handleClose={() => setOpen({ ...open, logs: false })}
      />
      <Settings
        open={open.settings}
        handleClose={() => setOpen({ ...open, settings: false })}
      />
    </React.Fragment>
  );
};

Header.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default Header;
