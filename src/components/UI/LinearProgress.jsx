import { withStyles } from "@material-ui/core/styles";
import MaterialLinearProgress from "@material-ui/core/LinearProgress";

const LinearProgress = withStyles((theme) => ({
  root: {
    height: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
  },
  bar: {
    backgroundColor: theme.palette.text.secondary,
  },
}))(MaterialLinearProgress);

export default LinearProgress;
