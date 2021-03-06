import React, { Component } from "react";
import "./style.css";

import moment from "moment";
import "moment/locale/pt";

/* Molecules */
import MobileHeader from "../../molecules/Schedule/MobileHeader";

/* Organisms */
import ScheduleCell from "../../organisms/Schedule/ScheduleCell";

/* Templates */
import PageTemplate from "../../templates/PageTemplate";

/* Utils */
import authHeader from "../../../_utils/auth-header";

/* Material-UI components */
import {
  Hidden,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

/* Material-UI styles */
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  tableHeader: {
    fontWeight: "bold",
    width: "calc(100% / 6)",
    borderRight: "1px solid rgba(224, 224, 224, 1)"
  }
});

const weekDay = Number(
  moment()
    .locale("pt")
    .format("d")
);

class ScheduleGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weekDayDir: {
        1: "Segunda-feira",
        2: "Terça-feira",
        3: "Quarta-feira",
        4: "Quinta-feira",
        5: "Sexta-feira"
      },
      weekDay: weekDay > 5 ? 1 : weekDay,
    };
  }

  componentDidMount() {
    fetch("http://localhost:8000/api/schedule/", {
      method: "GET",
      headers: authHeader()
    })
      .then(response => response.json())
      .then(responseJSON => {
        console.log(responseJSON);
      });
  }

  changeWeekDay = value => {
    const { weekDay } = this.state;

    if (weekDay === 5 && value > 0) {
      this.setState({
        weekDay: 1
      });
    } else if (weekDay === 1 && value < 0) {
      this.setState({
        weekDay: 5
      });
    } else {
      this.setState({
        weekDay: weekDay + value
      });
    }
  };

  render() {
    function createData(hour, monday, tuesday, wednesday, thursday, friday) {
      return { hour, monday, tuesday, wednesday, thursday, friday };
    }

    const rows = [
      createData("07:30", "", "", "", "", ""),
      createData("08:20", "HO", "HO", "HO", "HO", "HO"),
      createData("09:10", "HO", "HO", "HO", "HO", "HO"),
      createData("10:10", "HO", "HO", "HO", "HO", "HO"),
      createData("11:00", "HO", "HO", "HO", "HO", "HO"),
      createData("11:50", "HO", "", "", "", ""),
      createData("12:40", "", "HO", "", "", ""),
      createData("13:30", "", "", "HO", "", ""),
      createData("14:20", "", "", "", "HO", ""),
      createData("15:10", "", "", "", "", "HO"),
      createData("16:20", "", "", "", "", ""),
      createData("17:10", "", "", "", "", ""),
      createData("18:00", "", "", "", "", "")
    ];

    const { weekDayDir, weekDay, weekHours } = this.state;

    const { classes } = this.props;

    return (
      <PageTemplate title={"Meus Horários"}>
        <div className="schedule-container">
          <TableContainer
            style={{ height: "100%", tableLayout: "fixed" }}
            component={Paper}
          >
            <Table style={{ height: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    className={classes.tableHeader}
                    id="hour-table-header"
                  >
                    Horário
                  </TableCell>
                  <Hidden smUp>
                    <MobileHeader
                      headerTitle={weekDayDir[weekDay]}
                      decreaseWeekDay={() => this.changeWeekDay(-1)}
                      increaseWeekDay={() => this.changeWeekDay(+1)}
                    />
                  </Hidden>
                  <Hidden xsDown>
                    <TableCell align="center" className={classes.tableHeader}>
                      Segunda-feira
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeader}>
                      Terça-feira
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeader}>
                      Quarta-feira
                    </TableCell>
                    <TableCell align="center" className={classes.tableHeader}>
                      Quinta-feira
                    </TableCell>
                    <TableCell
                      align="center"
                      className={classes.tableHeader}
                      id="last-table-header"
                    >
                      Sexta-feira
                    </TableCell>
                  </Hidden>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow style={{ height: "auto" }} key={row.hour}>
                    <TableCell
                      align="center"
                      size="small"
                      style={{
                        borderRight: "1px solid rgba(224, 224, 224, 1)"
                      }}
                    >
                      {row.hour}
                    </TableCell>
                    <Hidden smUp>
                      <TableCell align="center" size="small">
                        <ScheduleCell cellText={"ctc"} />
                      </TableCell>
                    </Hidden>
                    <Hidden xsDown>
                      <TableCell align="center" size="small">
                        <ScheduleCell cellText={rows.monday} />
                      </TableCell>
                      <TableCell align="center" size="small">
                        <ScheduleCell cellText={row.tuesday} />
                      </TableCell>
                      <TableCell align="center" size="small">
                        <ScheduleCell cellText={row.wednesday} />
                      </TableCell>
                      <TableCell align="center" size="small">
                        <ScheduleCell cellText={row.thursday} />
                      </TableCell>
                      <TableCell align="center" size="small">
                        <ScheduleCell cellText={row.friday} />
                      </TableCell>
                    </Hidden>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </PageTemplate>
    );
  }
}

export default withStyles(styles)(ScheduleGrid);
