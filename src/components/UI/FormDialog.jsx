import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";

import Dialog from "./Dialog.jsx";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: theme.spacing(2),
  },
}));

const FormDialog = (props) => {
  const { open, handleClose, handleSubmit, title, children } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      title={title}
      actions={
        <IconButton
          edge="start"
          color="inherit"
          type="submit"
          form="form-dialog"
        >
          <SaveIcon />
        </IconButton>
      }
    >
      <form id="form-dialog" className={classes.form} onSubmit={handleSubmit}>
        {children}
      </form>
    </Dialog>
  );
};

FormDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default FormDialog;
