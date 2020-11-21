import { useContext } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { zhCN, ptPT } from "@material-ui/core/locale";
import { Context } from "../IntlWrapper";

import "./style.css";

function ThemeWrapper(props) {
  //Getting the language info from IntlWrapper
  const context = useContext(Context);
  const { locale } = context;

  //Material UI components localization
  const locales = {
    "zh-CN": zhCN,
    "pt-PT": ptPT,
  };

  return (
    <div className="App">
      {/* Setting lenguague to the Material UI Theme. */}
      <ThemeProvider
        theme={(outertheme) =>
          createMuiTheme(
            outertheme,
            locale ? (locales[locale] ? locales[locale] : ptPT) : ptPT
          )
        }
      >
        {/* <MainContainer /> */}
        {props.children}
      </ThemeProvider>
    </div>
  );
}

export default ThemeWrapper;
