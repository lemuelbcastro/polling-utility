import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Store from "electron-store";

import validationSchema from "./validationSchema";
import FormDialog from "../UI/FormDialog.jsx";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const store = new Store();

const Settings = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { control, handleSubmit, errors, watch, reset } = useForm({
    defaultValues: store.get("settings"),
    resolver: yupResolver(validationSchema),
  });
  const apiBaseEnabled = watch("apiBase.enabled");

  useEffect(() => {
    if (open) {
      reset(store.get("settings"));
    }
  }, [open]);

  const onSubmit = (data) => {
    store.set("settings", data);
    handleClose();
  };

  return (
    <FormDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      title="Settings"
    >
      <Typography variant="subtitle2" gutterBottom>
        Application
      </Typography>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        variant="outlined"
        margin="dense"
        label="Header Text"
        name="application.headerText"
        type="test"
        error={errors?.application?.headerText ? true : false}
        helperText={errors?.application?.headerText?.message}
      />
      <Typography variant="subtitle2" gutterBottom>
        API Base
      </Typography>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        variant="outlined"
        margin="dense"
        label="URL"
        name="apiBase.url"
        type="text"
        disabled={!apiBaseEnabled}
        error={errors?.apiBase?.url ? true : false}
        helperText={errors?.apiBase?.url?.message}
      />
      <FormControlLabel
        control={
          <Controller
            name="apiBase.enabled"
            control={control}
            render={(props) => (
              <Switch
                onChange={(e) => props.onChange(e.target.checked)}
                checked={props.value}
                color="default"
              />
            )}
          />
        }
        label="Enabled"
      />
      <Divider className={classes.divider} />
      <Typography variant="subtitle2" gutterBottom>
        API Authenticaion
      </Typography>
      <Controller
        as={TextField}
        control={control}
        fullWidth
        variant="outlined"
        margin="dense"
        label={apiBaseEnabled ? "Path" : "URL"}
        name="auth.url"
        type="text"
        error={errors?.auth?.url ? true : false}
        helperText={errors?.auth?.url?.message}
      />
      <Controller
        as={TextField}
        control={control}
        fullWidth
        label="Request Body"
        margin="dense"
        name="auth.requestBody"
        variant="outlined"
        multiline
        rows={10}
        rowsMax={10}
        error={errors?.auth?.requestBody ? true : false}
        helperText={errors?.auth?.requestBody?.message}
      />
    </FormDialog>
  );
};

Settings.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Settings;
