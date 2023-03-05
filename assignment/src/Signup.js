import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  // Define state variables for the form inputs and error messages
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [submitError, setSubmitError] = useState("");

  // Define a function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear any existing error messages
    setNameError("");
    setEmailError("");
    setPasswordError("");
    setSubmitError("");

    // Validate the form inputs
    let valid = true;
    if (!/^[a-zA-Z0-9]+$/.test(name)) {
      setNameError("Name must only contain letters and numbers");
      valid = false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Email must be in the correct format");
      valid = false;
    }
    if (
      !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{4,}/.test(
        password
      )
    ) {
      setPasswordError(
        "Password must contain at least 3 of the following 4 types of characters: uppercase letters, lowercase letters, numbers, and symbols, and be at least 4 characters long"
      );
      valid = false;
    }

    // If the form inputs are valid, submit the data to the backend
    if (valid) {
      try {
        const response = await axios.post("http://localhost:3000/users", {
          name,
          email,
          password,
        });
        console.log(response.data);
      } catch (error) {
        if (error.response.status === 403) {
          setSubmitError("Email already exists");
        } else {
          setSubmitError("Server error");
        }
      }
    }
  };

  return (
    <div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {nameError && <span className="error">{nameError}</span>}
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <span className="error">{emailError}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {passwordError && <span className="error">{passwordError}</span>}
        </div>
        <div>
          <button type="submit" className="button">
            Sign Up
          </button>
        </div>
        {submitError && <span className="error">{submitError}</span>}
      </form>
    </div>
  );
};

export default SignUp;
