import { Select, MenuItem } from "@material-ui/core";
import ptFlag from "../../assets/brazil-flag-icon-64.png";
import cnFlag from "../../assets/china-flag-icon-64.png";
import "./style.css";

function LanguageSelector(props) {
  const { selectType, onChange } = props;

  //selectType = "localization" || "phoneCode"
  //onChange = function

  //Array with the values for the select
  const countries = [
    {
      ctryName: "PT",
      flag: ptFlag,
      phoneCode: "55",
      localization: "ptPT",
    },
    {
      ctryName: "CN",
      flag: cnFlag,
      phoneCode: "86",
      localization: "zhCN",
    },
  ];

  return (
    <Select
      name={selectType}
      classes={{
        select: "langSelect",
      }}
      defaultValue={
        selectType
          ? countries[0][selectType]
            ? countries[0][selectType]
            : countries[0]["ctryName"]
          : countries[0]["ctryName"]
      }
      IconComponent={() => {
        return selectType === "phoneCode" ? (
          <i className="arrow down"></i>
        ) : null;
      }}
      variant="standard"
      onChange={onChange}
      disableUnderline
    >
      {countries.map((item, index) => {
        return (
          <MenuItem
            key={index}
            className="langSelectDrop"
            style={{ width: 100 }}
            value={selectType ? item[selectType] : item["ctryName"]}
          >
            <img
              src={item["flag"]}
              className="flagImgText flagImg"
              alt="china-flag"
            />
            <span className="flagImgText">
              {selectType
                ? selectType === "phoneCode"
                  ? "+".concat(item[selectType])
                  : item["ctryName"]
                : item["ctryName"]}
            </span>
          </MenuItem>
        );
      })}
    </Select>
  );
}

export default LanguageSelector;
