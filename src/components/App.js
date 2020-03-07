import React from "react";
import Header from "./ui/Header";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "./ui/theme";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      Hello
    </MuiThemeProvider>
  );
}

export default App;
