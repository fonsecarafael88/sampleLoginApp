import { useState, useEffect } from "react";
import "./style.css";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@material-ui/core";
import LanguageSelector from "../LanguageSelector";
import appLogo from "../../assets/logo.png";
import { FormattedMessage } from "react-intl";

function LoginForm() {
  const [counter, setCounter] = useState(60);
  const [startCountDown, setStartCountDown] = useState(false);
  const [countryCode, setCountryCode] = useState("55");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [fromErrors, setFormErrors] = useState([false, false]);

  useEffect(() => {
    let interval = null;
    if (startCountDown) {
      interval = setInterval(() => {
        if (counter !== 0) {
          setCounter(counter - 1);
        } else {
          setStartCountDown(false);
          clearInterval(interval);
        }
      }, 1000);
    } else if (!startCountDown && counter !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startCountDown, counter]);

  const startTimer = () => {
    //Verify the phone number
    //For brazilian phone numbers 10 or 11 digits, for Chinese phone numbers 11 digits
    if((phoneNumber.length >= (countryCode === "55" ? 10 : 11)) && (phoneNumber.match(/^[0-9]+$/) != null)){
      
      //if phone number is correct, start counter.
      setCounter(60);
      setStartCountDown(true);

    }else{

      //If Phone number is incorrect, show error.
      let errors = fromErrors;
      errors[0] = true;
      setFormErrors([...errors]);
    }
  };

  const changeCountryCode = (event) => {
    const { value } = event.target;
    setCountryCode(value);
  };

  const ChangeHandler = (event) => {
    const { id, value, maxLength } = event.target;

    let errors = fromErrors;

    //Check maxlenght for number fields
    if (value.length > maxLength) {
      event.target.value = value.slice(0, maxLength);
    } else {
      if (id === "phoneNumber") {
        //Reset errors
        errors[0] = false;
        //Get text filed value
        setPhoneNumber(value);
      }

      if (id === "verificationCode") {
        //Reset errors
        errors[1] = false;
        //Get text filed value
        setVerificationCode(value);
      }
    }

    setFormErrors([...errors]);
  };

  const submitForm = (event) => {
    event.preventDefault();

    let errors = fromErrors;
    if (phoneNumber === "") {
      errors[0] = true;
    } else {
      errors[0] = false;
    }
    if (verificationCode === "") {
      errors[1] = true;
    } else {
      errors[1] = false;
    }

    const isError = (error) => error === true;

    if (errors.some(isError)) {
      //Show errors
      setFormErrors([...errors]);
    } else {
      //Submit
      console.log({
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        verificationCode: verificationCode,
      });
    }
  };

  return (
    <form
      onSubmit={submitForm}
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      {/* Wallet app logo */}
      <img src={appLogo} alt="wallet-app-logo" className="walletLogo" />

      {/* Phone number input */}
      <FormControl variant="outlined" className="loginInput">
        <InputLabel htmlFor="phoneNumber" shrink>
          <FormattedMessage
            id="login.input.phone"
            defaultMessage="Número de telefone"
          />
        </InputLabel>
        <OutlinedInput
          id="phoneNumber"
          name="phoneNumber"
          inputProps={{ maxLength: 11 }}
          onChange={ChangeHandler}
          type="number"
          notched={false}
          error={fromErrors[0]}
          disabled={startCountDown}
          startAdornment={
            <InputAdornment position="start">
              {/* Phone Area code select */}
              <LanguageSelector
                selectType={"phoneCode"}
                onChange={changeCountryCode}
                disabled={startCountDown}
              />
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      {/* Verification code input */}
      <FormControl variant="outlined" className="loginInput">
        <InputLabel htmlFor="verificationCode" shrink>
          <FormattedMessage
            id="login.input.code"
            defaultMessage="Código de verificação"
          />
        </InputLabel>
        <OutlinedInput
          id="verificationCode"
          name="verificationCode"
          inputProps={{ maxLength: 4 }}
          type="number"
          onChange={ChangeHandler}
          notched={false}
          error={fromErrors[1]}
          endAdornment={
            <InputAdornment position="end">
              {/* Send SMS button */}
              <Button
                variant="contained"
                color="secondary"
                onClick={startTimer}
                classes={{ root: "SMSButtonRoot" }}
                disabled={startCountDown}
              >
                {startCountDown === false ? (
                  <FormattedMessage
                    id="login.btn.sms"
                    defaultMessage="Enviar"
                  />
                ) : (
                  counter
                )}
              </Button>
            </InputAdornment>
          }
          labelWidth={70}
        />
      </FormControl>

      {/* Submit button (Login)*/}
      <Button
        variant="contained"
        color="primary"
        className="loginInput"
        classes={{ root: "LoginButtonRoot" }}
        onClick={submitForm}
        type="submit"
      >
        <FormattedMessage id="login.btn.submit" defaultMessage="Login" />
      </Button>
    </form>
  );
}

export default LoginForm;
