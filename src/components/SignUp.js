import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";

import styles from "./signUp.module.css";
import { validate } from "../helper/validate";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isAccepted: false,
  });

  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});

  useEffect(() => {
    document.title = "Sign Up";
    setErrors(validate("signUp", data));
  }, [data]);

  const changeHandler = (event) => {
    if (event.target.name === "isAccepted") {
      setData({ ...data, [event.target.name]: event.target.checked });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
  };

  const focusHandler = (event) => {
    setIsTouched({ ...isTouched, [event.target.name]: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      setIsTouched({
        name: true,
        email: true,
        password: true,
        confirmPassword: true,
        isAccepted: true,
      });
      toast.error("Invalid Data!");
    } else {
      const result = axios.post("https://api.freerealapi.com/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.promise(result, {
        loading: "loading...",
        success: "You signed up successfully",
        error: "Try again!",
      });
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.formContainer} onSubmit={submitHandler}>
        <h2 className={styles.header}>SignUp</h2>
        <div className={styles.formFields}>
          <label>Name</label>
          <input
            className={`${
              errors.name && isTouched.name
                ? styles.uncompleted
                : styles.formInput
            } ${!errors.name && styles.completed}`}
            type="text"
            value={data.name}
            name="name"
            onChange={changeHandler}
            onFocus={focusHandler}
            maxLength={15}
          />
          {errors.name && isTouched.name && <span>{errors.name}</span>}
        </div>
        <div className={styles.formFields}>
          <label>E-mail</label>
          <input
            className={`${
              errors.email && isTouched.email
                ? styles.uncompleted
                : styles.formInput
            } ${!errors.email && styles.completed}`}
            type="text"
            value={data.email}
            name="email"
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.email && isTouched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formFields}>
          <label>Password</label>
          <input
            className={`${
              errors.password && isTouched.password
                ? styles.uncompleted
                : styles.formInput
            } ${!errors.password && styles.completed}`}
            type="password"
            value={data.password}
            name="password"
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.password && isTouched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={styles.formFields}>
          <label>Confirm Password</label>
          <input
            className={`${
              errors.confirmPassword && isTouched.confirmPassword
                ? styles.uncompleted
                : styles.formInput
            } ${!errors.confirmPassword && styles.completed}`}
            type="password"
            value={data.confirmPassword}
            name="confirmPassword"
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {errors.confirmPassword && isTouched.confirmPassword && (
            <span>{errors.confirmPassword}</span>
          )}
        </div>
        <div className={styles.formFields}>
          <div className={styles.checkBoxContainer}>
            <label>
              I accept <strong>terms and privacy policy</strong>
            </label>
            <input
              type="checkbox"
              value={data.isAccepted}
              name="isAccepted"
              onChange={changeHandler}
              onFocus={focusHandler}
            />
          </div>
          {errors.isAccepted && isTouched.isAccepted && (
            <span>{errors.isAccepted}</span>
          )}
        </div>
        <div className={styles.formButton}>
          <Link to={"/login"}>Login</Link>
          <button type="submit">Sign Up</button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default SignUp;
