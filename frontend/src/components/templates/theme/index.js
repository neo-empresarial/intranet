import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Open Sans", "Roboto", "Segoe", "sans-serif"].join(","),
    fontSize: 16
  }
});

export default theme;
