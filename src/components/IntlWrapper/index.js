import React, { useState } from "react";
import { IntlProvider } from "react-intl";

//Importing custom labels for localization.
import ptPT from "../../localization/ptPT.json";
import zhCN from "../../localization/zhCN.json";

export const Context = React.createContext();

const local = "pt-PT"; //Default languague

const IntlWrapper = (props) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(ptPT);

  function selectLang(e) {
    const newLocale = e.target.value;
    if (newLocale === "zhCN") {
      setLocale("zh-CN");
      setMessages(zhCN);
    } else {
      setLocale("pt-PT");
      setMessages(ptPT);
    }
  };

  return (
    <Context.Provider value={{ locale, selectLang }}>
      <IntlProvider messages={messages} locale={locale}>
        {props.children}
      </IntlProvider>
    </Context.Provider>
  );
};

export default IntlWrapper;
