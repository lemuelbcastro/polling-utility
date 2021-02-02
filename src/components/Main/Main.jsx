import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Store from "electron-store";

import Header from "../Header";
import Task from "../Task";
import AddTask from "../Task/AddTask.jsx";
import SpeedDial from "../UI/SpeedDial.jsx";

const store = new Store({ watch: true });

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
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
          icon={<MenuIcon />}
          openIcon={<CloseIcon />}
          actions={actions}
          className={classes.speedDial}
          FabProps={{ color: "default" }}
        />
      </main>
      <AddTask open={open} handleClose={() => setOpen(false)} />
    </div>
  );
};

export default Main;
