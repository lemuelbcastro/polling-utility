import React from "react";
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

import validationSchema from "./validationSchema";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  divider: {
    margin: theme.spacing(1, 0),
  },
}));

const Form = (props) => {
  const { onSubmit, defaultValues } = props;
  const classes = useStyles();
  const { control, handleSubmit, errors, watch } = useForm({
    defaultValues,
    resolver: yupResolver(validationSchema),
  });

  return (
    <div className={classes.root}>
      <form id="settings-form" noValidate onSubmit={handleSubmit(onSubmit)}>
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
          disabled={!watch("apiBase.enabled")}
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
          label="URL"
          name="auth.url"
          type="text"
          error={errors?.auth?.url ? true : false}
          helperText={errors?.auth?.url?.message}
        />
        <Controller
          as={TextField}
          control={control}
          fullWidth
          variant="outlined"
          margin="dense"
          label="Username"
          name="auth.username"
          type="text"
          error={errors?.auth?.username ? true : false}
          helperText={errors?.auth?.username?.message}
        />
        <Controller
          as={TextField}
          control={control}
          fullWidth
          variant="outlined"
          margin="dense"
          label="Password"
          name="auth.password"
          type="password"
          error={errors?.auth?.password ? true : false}
          helperText={errors?.auth?.password?.message}
        />
      </form>
    </div>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  defaultValues: PropTypes.object.isRequired
};

export default Form;
