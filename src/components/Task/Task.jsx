import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

import axios from "../../utils/axios";
import { createLogger } from "../../utils/logger";
import useInterval from "../../utils/useInterval";
import store from "../../utils/store";
import LinearProgress from "../UI/LinearProgress.jsx";
import EditTask from "./EditTask.jsx";

const useStyles = makeStyles((theme) => ({
  cardHeaderContent: {
    overflow: "hidden",
  },
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
  cardContent: {
    paddingTop: theme.spacing(0),
  },
}));

const Task = (props) => {
  const { active, data } = props;
  const task = data;
  const classes = useStyles();
  const settings = store.get("settings");
  const logger = createLogger();
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
      } catch (error) {
        logger.error("Task request failed", { task, error });
      }

      setProgress("determinate");
    }
  }, task.refreshRate * 1000);

  return (
    <React.Fragment>
      <Card className={classes.root}>
        <CardHeader
          classes={{ content: classes.cardHeaderContent }}
          avatar={
            <Avatar>{task.enabled ? <CheckIcon /> : <CloseIcon />}</Avatar>
          }
          title={task.title}
          subheader={
            <React.Fragment>
              <span className={classes[task.request.method.toLowerCase()]}>
                {task.request.method}
              </span>{" "}
              {task.request.url}
            </React.Fragment>
          }
          subheaderTypographyProps={{ noWrap: true }}
        />
        <CardContent className={classes.cardContent}>
          <LinearProgress variant={progress} value={0} />
        </CardContent>
        <Divider />
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
