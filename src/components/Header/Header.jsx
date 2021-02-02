import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";

import Settings from "../Settings";

const useStyles = makeStyles({
  flexGrow: {
    flexGrow: 1,
  },
});

const Header = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <AppBar color="inherit" position="sticky">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Header
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
