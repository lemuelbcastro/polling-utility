import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  Typography,
} from "@material-ui/core";
import Store from "electron-store";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import validationSchema from "./validationSchema";

import FormDialog from "../UI/FormDialog.jsx";

const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(1, 0),
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

const Settings = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { control, handleSubmit, errors, watch } = useForm({
    defaultValues: store.store,
    resolver: yupResolver(validationSchema),
  });
  const apiBaseEnabled = watch("apiBase.enabled");

  const onSubmit = (data) => {
    store.store = data;
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

export default Settings;
