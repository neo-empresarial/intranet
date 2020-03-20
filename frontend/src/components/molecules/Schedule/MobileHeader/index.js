import React from "react";
import './style.css'

/* Material-UI components */
import {
  IconButton,
  TableCell,
  Typography
} from "@material-ui/core";

/* Material-UI icons */
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";

class MobileHeader extends React.Component {
  render() {
    return (
      <TableCell className="schedule-mobile-header" align="center">
        <div className="schedule-mobile-header-grid">
        <IconButton size="small">
          <ArrowLeftIcon fontSize="small" onClick={this.props.decreaseWeekDay} />
        </IconButton>
        <Typography className="schedule-mobile-header-title">{this.props.headerTitle}</Typography>
        <IconButton size="small">
          <ArrowRightIcon fontSize="small" onClick={this.props.increaseWeekDay} />
        </IconButton>
        </div>
      </TableCell>
    );
  }
}

export default MobileHeader;
