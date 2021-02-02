import React from "react";
import { makeStyles } from "@material-ui/styles";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2, 1),
    marginTop: "auto",
    backgroundColor:
    theme.palette.type === "light"
      ? theme.palette.grey[200]
      : theme.palette.grey[800],
  },
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
        <Typography variant="caption">
          Footer
        </Typography>
    </footer>
  );
};

export default Footer;
