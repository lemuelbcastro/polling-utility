import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import Store from "electron-store";
import { Scrollbars } from "react-custom-scrollbars";
import { ipcRenderer } from "electron";

import Header from "../Header";
import Task from "../Task";
import AddTask from "../Task/AddTask.jsx";
import SpeedDial from "../UI/SpeedDial.jsx";

const store = new Store({ watch: true });

const useStyles = makeStyles((theme) => ({
  scrollbar: {
    minHeight: "95vh",
  },
  offset: theme.mixins.toolbar,
  content: {
    padding: theme.spacing(1.5),
    "& > :not(:last-child)": {
      marginBottom: theme.spacing(1.5),
    },
  },
  speedDial: {
    zIndex: theme.zIndex.appBar + 1,
  },
}));

const Main = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState(store.get("tasks"));
  const [active, setActive] = useState(
    store.get("application.active")
  );
  const [open, setOpen] = useState(false);

  const actions = [
    {
      icon: <StopIcon />,
      name: "Stop",
      onClick: () => {
        store.set("application.active", false);
      },
    },
    {
      icon: <PlayArrowIcon />,
      name: "Start",
      onClick: () => {
        store.set("application.active", true);
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
    store.onDidChange("application.active", (newValue) => {
      setActive(newValue);
    });

    store.onDidChange("tasks", (newTasks) => {
      setTasks(newTasks);
    });

    ipcRenderer.on("tasks-add", () => setOpen(true));
  }, []);

  return (
    <React.Fragment>
      <Header active={active} />
      <Scrollbars autoHide className={classes.scrollbar}>
        <div className={classes.offset} />
        <main className={classes.content}>
          {tasks.map((task) => (
            <Task key={task.id} active={active} data={task} />
          ))}
        </main>
        <SpeedDial
          icon={<MenuIcon />}
          openIcon={<CloseIcon />}
          actions={actions}
          className={classes.speedDial}
          FabProps={{ color: "default" }}
        />
        <AddTask open={open} handleClose={() => setOpen(false)} />
      </Scrollbars>
    </React.Fragment>
  );
};

export default Main;
