import React, { Component } from "react";
import "./style.css";

/* Material-UI components */
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

/* Organisms */
import ScheduleCell from "../../organisms/ScheduleCell";

/* Templates */
import PageTemplate from "../../templates/PageTemplate";

/* Utils */
import authHeader from "../../../_utils/auth-header";

class ScheduleGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: false
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

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: false
    });
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
      createData("11:50", "HO", "HO", "HO", "HO", "HO"),
      createData("12:40", "", "", "", "", ""),
      createData("13:30", "", "", "", "", ""),
      createData("14:20", "", "", "", "", ""),
      createData("15:10", "", "", "", "", ""),
      createData("16:20", "", "", "", "", ""),
      createData("17:10", "", "", "", "", ""),
      createData("18:00", "", "", "", "", "")
    ];

    return (
      <PageTemplate title={"Meus Horários"}>
        <div
          className="schedule-container"
        >
          <TableContainer
            style={{ height: "100%", tableLayout: "fixed" }}
            component={Paper}
          >
            <Table style={{ height: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      width: "calc(100% / 6)"
                    }}
                  >
                    Horário
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      width: "calc(100% / 6)"
                    }}
                  >
                    Segunda-feira
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      width: "calc(100% / 6)"
                    }}
                  >
                    Terça-feira
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      width: "calc(100% / 6)"
                    }}
                  >
                    Quarta-feira
                  </TableCell>
                  <TableCell
                    align="center"
                    style={{
                      fontWeight: "bold",
                      width: "calc(100% / 6)"
                    }}
                  >
                    Quinta-feira
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: "bold",
                      width: "calc(100% / 6)"
                    }}
                  >
                    Sexta-feira
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <TableRow style={{ height: "auto" }} key={row.hour}>
                    <TableCell align="center" size="small">
                      {row.hour}
                    </TableCell>
                    <TableCell align="center" size="small">
                      <ScheduleCell cellText={row.monday} />
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

export default ScheduleGrid;
