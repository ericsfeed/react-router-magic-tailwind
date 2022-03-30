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
    <div class="w-full max-w-xs" >
      <h2>Sign In Page</h2>
      <div class="bg-gray-200 ">
        <form
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={handleSubmit}
        >
          <span>
            <fieldset>
              <legend class="text-center">
                Where should we send a link so you can sign in?
              </legend>
              <div class="mb-6">
                <label
                  htmlFor="emailAddress"
                  class="block text-gray-700 text-sm font-bold mb-4"
                >
                  Email address
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="emailAddress"
                  type="email"
                  maxLength="40"
                  onChange={handleChange}
                  value={emailAddress}
                  autoComplete="email"
                ></input>
                <p class="text-red-500 text-xs italic">{errorMessage}</p>
              </div>{" "}
              <div class="flex items-center justify-between">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  {loadingState ? "Loading (please wait)..." : "Submit"}
                </button>
              </div>
              <p> {errorMessage} </p>
            </fieldset>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
