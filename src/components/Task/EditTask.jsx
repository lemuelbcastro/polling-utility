import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FormControlLabel,
  MenuItem,
  Switch,
  TextField,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Store from "electron-store";

import validationSchema from "./validationSchema";
import ConfirmDialog from "../UI/ConfirmDialog.jsx";
import Fab from "../UI/Fab.jsx";
import FormDialog from "../UI/FormDialog.jsx";

const store = new Store();

const EditTask = (props) => {
  const { open, handleClose, task } = props;
  const { control, handleSubmit, errors, reset } = useForm({
    defaultValues: task,
    resolver: yupResolver(validationSchema),
  });
  const [openDialog, setOpenDialog] = useState(false);
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

  const handleDelete = () => {
    const tasks = store.get("tasks");
    const updatedTasks = tasks.filter((element) => element.id !== task.id);

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
      <Fab onClick={() => setOpenDialog(true)}>
        <DeleteIcon />
      </Fab>
      <ConfirmDialog
        open={openDialog}
        title="Delete Task"
        handleClose={() => setOpenDialog(false)}
        handleConfirm={() => {
          setOpenDialog(false);
          handleDelete();
        }}
      >
        Are you sure you want to delete this task?
      </ConfirmDialog>
    </FormDialog>
  );
};

EditTask.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  task: PropTypes.object.isRequired,
};

export default EditTask;
