import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Main from "./containers/Main";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./style/theme";
import { IntlWrapper } from "./components";

ReactDOM.render(
  <IntlWrapper>
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  </IntlWrapper>,
  document.getElementById("root")
);

