import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Fab } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const FormDialog = (props) => {
  const { onClick, children } = props;
  const classes = useStyles();

  return (
    <Fab className={classes.fab} onClick={onClick}>
      {children}
    </Fab>
  );
};

FormDialog.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default FormDialog;
