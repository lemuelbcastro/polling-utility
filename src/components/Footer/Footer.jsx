import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Box, Toolbar } from "@material-ui/core";

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
    <Box boxShadow={3}>
      <AppBar color="inherit" position="fixed" className={classes.appBar}>
        <Toolbar variant="dense">{children}</Toolbar>
      </AppBar>
    </Box>
  );
};

Footer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Footer;
