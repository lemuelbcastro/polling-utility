import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  SpeedDial as MaterialSpeedDial,
  SpeedDialIcon,
  SpeedDialAction,
} from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  speedDial: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const SpeedDial = (props) => {
  const { actions, icon, openIcon, className, ...rest } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MaterialSpeedDial
      ariaLabel="Speed Dial"
      className={clsx(classes.speedDial, className)}
      icon={<SpeedDialIcon icon={icon} openIcon={openIcon} />}
      onClose={handleClose}
      onOpen={handleOpen}
      open={open}
      {...rest}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={() => {
            handleClose();
            action.onClick();
          }}
        />
      ))}
    </MaterialSpeedDial>
  );
};

SpeedDial.propTypes = {
  className: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  openIcon: PropTypes.node.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      name: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default SpeedDial;
