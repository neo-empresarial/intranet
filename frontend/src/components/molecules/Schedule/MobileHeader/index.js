import React from "react";
import "./style.css";

/* Material-UI components */
import { IconButton, TableCell, Typography } from "@material-ui/core";

/* Material-UI icons */
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

/* Material-UI styles */
import { withStyles } from "@material-ui/core/styles";

/* Atoms */
import HeaderButton from "../../../atoms/Schedule/HeaderButton";

const styles = theme => ({
  tableHeader: {
    width: "67%"
  },
  tableTitle: {
    fontWeight: "bold",
    fontSize: "0.875rem",
    margin: "auto"
  }
});

class MobileHeader extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <TableCell className={classes.tableHeader} align="center">
        <div className="schedule-mobile-header-grid">
          <HeaderButton
            component={ArrowLeftIcon}
            onClick={this.props.decreaseWeekDay}
          />
          <Typography className={classes.tableTitle}>
            {this.props.headerTitle}
          </Typography>
          <HeaderButton
            component={ArrowRightIcon}
            onClick={this.props.increaseWeekDay}
          />
        </div>
      </TableCell>
    );
  }
}

export default withStyles(styles)(MobileHeader);
