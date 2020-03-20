import React from "react";
import "./style.css";

/* Material-UI components */
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography
} from "@material-ui/core";

/* Material-UI icons */
import EditIcon from "@material-ui/icons/Edit";

class ScheduleCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false,
      cellText: this.props.cellText
    };
  }

  handleDialog = () => {
    this.setState({
      dialog: !this.state.dialog
    });
  };

  handleDialogValue = event => {
    this.setState({
      cellText: event.target.value
    });
  };

  render() {
    const { dialog, cellText } = this.state;

    return (
      <div className="schedule-cell-grid">
        <Typography>{cellText}</Typography>
        <IconButton size="small" onClick={this.handleDialog}>
          <EditIcon fontSize="small" />
        </IconButton>
        <Dialog
          open={dialog}
          onClose={this.handleDialog}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Horário</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Insira seu horário do NEO ou sala em que estará neste horário.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Atividade"
              fullWidth
              value={cellText}
              inputProps={{
                maxLength: 6
              }}
              onChange={(event, value) => this.handleDialogValue(event, value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleDialog} color="primary">
              Cancelar
            </Button>
            <Button onClick={this.handleDialog} color="primary">
              Confirmar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default ScheduleCell;
