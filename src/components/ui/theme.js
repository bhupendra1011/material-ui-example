import { createMuiTheme } from "@material-ui/core";

const arcBlue = "#0B72B9";
const arcOrange = "#FFBA60";

// overwrites the existing default theme with the below configurations
const theme = createMuiTheme({
  palette: {
    common: {
      blue: `${arcBlue}`,
      orange: `${arcOrange}`
    },

    primary: {
      main: `${arcBlue}`
    },
    secondary: {
      main: `${arcOrange}`
    }
  },
  typography: {
    tab: {
      fontFamily: "Raleway",
      textTransform: "none",
      fontWeight: 700,
      fontSize: "1rem"
    },
    estimate: {
      fontFamily: "Pacifico",
      fontSize: "1rem",
      color: "white",
      textTransform: "none"
    }
  }
});
export default theme;
