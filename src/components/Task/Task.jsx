import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Button,
  Divider,
  Typography,
} from "@material-ui/core";
import Store from "electron-store";

import axios from "../../utils/axios";
import useInterval from "../../utils/useInterval";
import LinearProgress from "../UI/LinearProgress.jsx";
import EditTask from "./EditTask.jsx";

const useStyles = makeStyles((theme) => ({
  get: {
    color: theme.palette.success[theme.palette.type],
  },
  post: {
    color: theme.palette.warning[theme.palette.type],
  },
  put: {
    color: theme.palette.info[theme.palette.type],
  },
  patch: {
    color: theme.palette.info[theme.palette.type],
  },
  delete: {
    color: theme.palette.error[theme.palette.type],
  },
  progressBar: {
    marginTop: theme.spacing(2),
  },
}));

const store = new Store();

const Task = (props) => {
  const { active, data } = props;
  const task = data;
  const classes = useStyles();
  const settings = store.get("settings");
  const [progress, setProgress] = useState("determinate");
  const [open, setOpen] = useState(false);

  useInterval(async () => {
    if (active && !open && task.enabled) {
      setProgress("indeterminate");

      try {
        await axios({
          method: task.request.method,
          url: task.request.url,
          baseURL: settings.apiBase.enabled ? settings.apiBase.url : undefined,
        });
      } catch {}

      setProgress("determinate");
    }
  }, task.refreshRate * 1000);

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h6" component="h2">
              {task.title}
            </Typography>
            <Typography variant="body2" component="p">
              <span className={classes[task.request.method.toLowerCase()]}>
                {task.request.method}
              </span>{" "}
              {task.request.url}
            </Typography>
            <LinearProgress
              className={classes.progressBar}
              variant={progress}
              value={0}
            />
          </CardContent>
          <Divider />
        </CardActionArea>
        <CardActions>
          <Button size="small" onClick={() => setOpen(true)}>
            Configure
          </Button>
        </CardActions>
      </Card>
      <EditTask open={open} task={task} handleClose={() => setOpen(false)} />
    </React.Fragment>
  );
};

Task.propTypes = {
  active: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
};

export default Task;
