import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Fab as MaterialFab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Fab = (props) => {
  const { onClick, children } = props;
  const classes = useStyles();

  return (
    <MaterialFab className={classes.fab} onClick={onClick}>
      {children}
    </MaterialFab>
  );
};

Fab.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Fab;
