import React from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@material-ui/core";

const ConfirmDialog = (props) => {
  const { children, title, dividers, open, handleClose, handleConfirm } = props;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={dividers}>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
};

ConfirmDialog.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  dividers: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};

export default ConfirmDialog;
