import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AssignmentIcon from "@material-ui/icons/Assignment";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Store from "electron-store";

import Header from "../Header";
import Footer from "../Footer";
import Task from "../Task";
import AddTask from "../Task/AddTask.jsx";
import SpeedDial from "../UI/SpeedDial.jsx";

const store = new Store({
  defaults: {
    tasks: [],
    settings: {
      apiBase: {
        url: "",
        enabled: true,
      },
      auth: {
        url: "",
        requestBody: "",
      },
    },
  },
  watch: true,
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    paddingBottom: 50,
  },
  content: {
    height: "100%",
    padding: theme.spacing(1),
  },
  speedDial: {
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const Main = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState(store.get("tasks"));
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <StopIcon />,
      name: "Stop",
      onClick: () => {
        setActive(false);
      },
    },
    {
      icon: <PlayArrowIcon />,
      name: "Start",
      onClick: () => {
        setActive(true);
      },
    },
    {
      icon: <AddIcon />,
      name: "Add",
      onClick: () => {
        setOpen(true);
      },
    },
  ];

  useEffect(() => {
    store.onDidChange("tasks", (newTasks) => {
      setTasks(newTasks);
    });
  }, []);

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        {tasks.map((task) => (
          <Task key={task.id} active={active} data={task} />
        ))}
        <SpeedDial
          icon={<AssignmentIcon />}
          openIcon={<CloseIcon />}
          actions={actions}
          className={classes.speedDial}
        />
      </main>
      <Footer>
        <Typography variant="body1">{active ? "Running" : "Stopped"}</Typography>
      </Footer>
      <AddTask open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Main;
