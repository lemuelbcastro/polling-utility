import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Accordion as MaterialAccordion,
  AccordionSummary as MaterialAccordionSummary,
  AccordionDetails as MaterialAccordionDetails,
  Typography,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Scrollbars } from "react-custom-scrollbars";
import ReactJson from "react-json-view";

import { fetchLogs } from "../../utils/logger";
import Dialog from "../UI/Dialog.jsx";

const Accordion = withStyles({
  root: {
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MaterialAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MaterialAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    paddingTop: 0,
  },
}))(MaterialAccordionDetails);

const useStyles = makeStyles((theme) => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "25%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  scrollbarView: {
    padding: theme.spacing(1),
  },
}));

const Logs = (props) => {
  const { open, handleClose } = props;
  const classes = useStyles();
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (open) {
      setLogs(fetchLogs());
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose} title="Logs">
      <Scrollbars
        autoHide
        renderView={(props) => (
          <div {...props} className={classes.scrollbarView} />
        )}
      >
        {logs.map((log) => (
          <Accordion square variant="outlined" key={log.id}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>
                {log.level.toUpperCase()}
              </Typography>
              <Typography className={classes.secondaryHeading}>
                {log.message}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Scrollbars style={{ width: "100%" }} autoHeight autoHide>
                <ReactJson
                  src={log}
                  name={false}
                  theme="monokai"
                  style={{ width: "fit-content", minWidth: "100%" }}
                />
              </Scrollbars>
            </AccordionDetails>
          </Accordion>
        ))}
      </Scrollbars>
    </Dialog>
  );
};

Logs.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default Logs;
