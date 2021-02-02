import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Toolbar } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
}));

const Footer = (props) => {
  const { children } = props;
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar variant="dense">{children}</Toolbar>
    </AppBar>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
