import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { MenuItem, TextField } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Store from "electron-store";

import validationSchema from "./validationSchema";
import FormDialog from "../UI/FormDialog.jsx";

const store = new Store();

const EditTask = (props) => {
  const { open, handleClose, task } = props;
  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: task,
    resolver: yupResolver(validationSchema),
  });
  const settings = store.get("settings");
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

  useEffect(() => {
    if (open) {
      reset(task);
    }
  }, [open, task]);

  const onSubmit = (data) => {
    let tasks = store.get("tasks");
    const updatedTasks = tasks.map((element) =>
      element.id === task.id ? { ...element, ...data } : element
    );

    store.set("tasks", updatedTasks);
    
    handleClose();
  };

  return (
    <FormDialog
      open={open}
      handleClose={handleClose}
      handleSubmit={handleSubmit(onSubmit)}
      title="Edit Task"
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
    </FormDialog>
  );
};

EditTask.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default EditTask;
