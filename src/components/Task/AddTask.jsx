import React from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { v4 as uuidv4 } from "uuid";
import Store from "electron-store";

import validationSchema from "./validationSchema";
import FormDialog from "../UI/FormDialog.jsx";

const store = new Store();

const AddTask = (props) => {
  const { open, handleClose } = props;
  const { control, handleSubmit, errors } = useForm({
    defaultValues: {
      title: "",
      request: {
        url: "",
        method: "",
      },
      refreshRate: "",
      enabled: false,
    },
    resolver: yupResolver(validationSchema),
  });
  const settings = store.get("settings");
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  const onSubmit = (data) => {
    let tasks = store.get("tasks");
    store.set("tasks", tasks.concat({ id: uuidv4(), ...data }));

    handleClose();
  };

  return (
    <FormDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      title="Add Task"
    >
      <Controller
        as={TextField}
        control={control}
        fullWidth
        variant="outlined"
        margin="dense"
        label="Title"
        name="title"
        type="text"
        error={errors?.title ? true : false}
        helperText={errors?.title?.message}
      />
      <Controller
        as={TextField}
        control={control}
        fullWidth
        variant="outlined"
        margin="dense"
        label={settings.apiBase.enabled ? "Request Path" : "Request URL"}
        name="request.url"
        type="text"
        error={errors?.request?.url ? true : false}
        helperText={errors?.request?.url?.message}
      />
      <Controller
        render={({ onChange, value }) => (
          <TextField
            select
            label="Request Method"
            fullWidth
            variant="outlined"
            margin="dense"
            value={value}
            onChange={onChange}
            error={errors?.request?.method ? true : false}
            helperText={errors?.request?.method?.message}
          >
            {methods.map((method) => (
              <MenuItem key={method} value={method}>
                {method}
              </MenuItem>
            ))}
          </TextField>
        )}
        control={control}
        name="request.method"
      />
      <Controller
        as={TextField}
        control={control}
        fullWidth
        variant="outlined"
        margin="dense"
        label="Refresh Rate"
        name="refreshRate"
        type="number"
        error={errors?.refreshRate ? true : false}
        helperText={errors?.refreshRate?.message}
      />
      <FormControlLabel
        control={
          <Controller
            name="enabled"
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
    </FormDialog>
  );
};

AddTask.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddTask;
