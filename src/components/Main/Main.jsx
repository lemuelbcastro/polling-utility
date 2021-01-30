import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import Store from "electron-store";

import Header from "../Header";
import Footer from "../Footer";
import Task from "../Task";
import AddTask from "../Task/AddTask.jsx";
import Fab from "../UI/Fab.jsx";

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
  },
  content: {
    height: "100%",
    padding: theme.spacing(1),
  },
}));

const Main = () => {
  const classes = useStyles();
  const [tasks, setTasks] = useState(store.get("tasks"));
  const [open, setOpen] = useState(false);

  store.onDidChange("tasks", (newTasks) => {
    setTasks(newTasks);
  });

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        {tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
        <Fab onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
        <AddTask open={open} handleClose={() => setOpen(false)} />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
