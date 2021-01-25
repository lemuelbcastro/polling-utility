import React from "react";
import { makeStyles } from "@material-ui/styles";

import Header from "../Header";
import Footer from "../Footer";

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

  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}></main>
      <Footer />
    </div>
  );
};

export default Main;
