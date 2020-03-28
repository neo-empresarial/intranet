import React from "react";
import "./style.css";

/* Material-UI components */
import { Menu, MenuItem, TableCell, Typography } from "@material-ui/core";

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
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: false
    };
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const { classes } = this.props;

    return (
      <TableCell className={classes.tableHeader} align="center">
        <div className="schedule-mobile-header-grid">
          <HeaderButton
            component={ArrowLeftIcon}
            onClick={this.props.decreaseWeekDay}
          />
            <Typography
              className={classes.tableTitle}
              onClick={this.handleClick}
            >
              {this.props.headerTitle}
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={this.handleClose}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <MenuItem onClick={this.handleClose}>Segunda-feira</MenuItem>
              <MenuItem onClick={this.handleClose}>Terça-feira</MenuItem>
              <MenuItem onClick={this.handleClose}>Quarta-feira</MenuItem>
              <MenuItem onClick={this.handleClose}>Quinta-feira</MenuItem>
              <MenuItem onClick={this.handleClose}>Sexta-feira</MenuItem>
            </Menu>
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
