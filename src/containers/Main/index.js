import { useContext } from "react";
import "./style.css";
import { Grid } from "@material-ui/core";
import { LanguageSelector, LoginForm, ThemeWrapper } from "../../components";
import { Context } from "../../components/IntlWrapper";

function MainContainer() {
  const context = useContext(Context);
  return (
    <ThemeWrapper>
      <Grid container spacing={0} className="mainContainer">
        <Grid item xs={2}>
          <LanguageSelector
            selectType={"localization"}
            onChange={context.selectLang}
          />
        </Grid>
        <Grid item xs={10} />
        <Grid item xs={12}>
          <LoginForm />
        </Grid>
      </Grid>
    </ThemeWrapper>
  );
}

export default MainContainer;
