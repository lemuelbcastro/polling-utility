import React from "react";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Button, IconButton, Toolbar, Typography } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles({
  flexGrow: {
    flexGrow: 1,
  },
});

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="sticky" className={classes.root}>
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Header
        </Typography>
        <div className={classes.flexGrow} />
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
