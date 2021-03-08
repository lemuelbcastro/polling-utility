import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Dialog as MaterialDialog,
  IconButton,
  Toolbar,
  Typography,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    paddingTop: "30px",
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Dialog = (props) => {
  const { open, onClose, title, actions, children } = props;
  const classes = useStyles();

  return (
    <MaterialDialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      classes={{ container: classes.container }}
      disableEnforceFocus
    >
      <AppBar className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={onClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {actions}
        </Toolbar>
      </AppBar>
      {children}
    </MaterialDialog>
  );
};

Dialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  actions: PropTypes.node,
  children: PropTypes.node.isRequired,
};

export default Dialog;
