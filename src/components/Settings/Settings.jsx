import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Dialog,
  IconButton,
  Toolbar,
  Typography,
  Slide,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import SaveIcon from "@material-ui/icons/Save";
import Store from "electron-store";

import Form from "./Form.jsx";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const defaults = {
  apiBase: {
    url: "",
    enabled: true,
  },
  auth: {
    url: "",
    requestBody: "",
  },
};

const store = new Store({ defaults });

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();

  const onSubmit = (data) => {
    store.store = data;
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Settings
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            type="submit"
            form="settings-form"
          >
            <SaveIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Form onSubmit={onSubmit} defaultValues={store.store} />
    </Dialog>
  );
};

export default Settings;
