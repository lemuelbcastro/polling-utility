import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import Store from "electron-store";

import Header from "../Header";
import Footer from "../Footer";
import Task from "../Task";
import AddTask from "../Task/AddTask.jsx";

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
  fab: {
    position: "absolute",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const Main = () => {
  const classes = useStyles();
  const tasks = store.get("tasks");
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        {tasks.map((task) => (
          <Task key={task.id} data={task} />
        ))}
        <Fab className={classes.fab} onClick={() => setOpen(true)}>
          <AddIcon />
        </Fab>
        <AddTask open={open} handleClose={() => setOpen(false)} />
      </main>
      <Footer />
    </div>
  );
};

export default Main;
