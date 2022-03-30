import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { trackAuth } from "../services/trackAuth";
import { magicLoginCallback } from "../services/magic";

function LoginPage() {
  const [loadingState, setLoadingState] = useState(""); // are we in the process of logging in?
  const [emailAddress, setEmailAddress] = useState(""); // current value of the input field
  const [errorMessage, setErrorMessage] = useState(""); // message to feed back to user

  let navigate = useNavigate();
  let location = useLocation();

  // after login, redirect to location 'from'
  let { from } = location.state || { from: { pathname: "/" } };

  let changeLoginStatus = () => {
    trackAuth.login(() => {
      navigate(from);
    });
  };

  const handleChange = (event) => {
    setEmailAddress(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingState(true);
    if (!emailAddress) {
      setLoadingState(false);
      setErrorMessage("Sorry, that email address is invalid.");
      return;
    }
    try {
      await magicLoginCallback(emailAddress, () => {
        console.log("Logged in as: " + emailAddress);
        changeLoginStatus();
      });
      setLoadingState(false);
    } catch (error) {
      setErrorMessage("Sorry, attempt failed. Unable to log in.");
      console.error(error);
    }
  };

  return (
    <div>
      <p>This is the Login page. </p>
      <form onSubmit={handleSubmit}>
        <span>
          <fieldset>
            <legend>Where should we send a link so you can sign in?</legend>
            <label htmlFor="emailAddress">Email address:</label>
            <input
              id="emailAddress"
              type="email"
              maxLength="40"
              onChange={handleChange}
              value={emailAddress}
              autoComplete="email"
            ></input>{" "}
            <button type="submit">
              {loadingState ? "Loading (please wait)..." : "Submit"}
            </button>
            <p> {errorMessage} </p>
          </fieldset>
        </span>
      </form>
    </div>
  );
}

export default LoginPage;
