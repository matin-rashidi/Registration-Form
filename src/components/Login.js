import React, { useEffect, useState } from "react";
import { validate } from "./validate";
import styles from "./signUp.module.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isTouched, setIsTouched] = useState({});

  const changeHandler = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const touchHandler = (e) => {
    setIsTouched({ ...isTouched, [e.target.name]: true });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setIsTouched({
      email: true,
      password: true,
    });
    if (errors.email || errors.password) {
      toast.error("Invalid Data!");
    } else {
      toast.success("You Logged in successfully");
    }
  };

  useEffect(() => {
    document.title = "Login";
    setErrors(validate("login", data));
  }, [data]);

  return (
    <div className={styles.container}>
      <form
        onSubmit={submitHandler}
        className={`${styles.formContainer} ${styles.formContainerLogin}`}
      >
        <h2 className={styles.header}>Login</h2>
        <div className={styles.formFields}>
          <label>Email</label>
          <input
            name="email"
            type="text"
            value={data.email}
            onChange={changeHandler}
            onFocus={touchHandler}
            className={`${
              errors.email && isTouched.email
                ? styles.uncompleted
                : styles.formInput
            } ${!errors.email && styles.completed}`}
          />
          {errors.email && isTouched.email && <span>{errors.email}</span>}
        </div>
        <div className={styles.formFields}>
          <label>Password</label>
          <input
            name="password"
            type="Password"
            value={data.password}
            onChange={changeHandler}
            onFocus={touchHandler}
            className={`${
              errors.password && isTouched.password
                ? styles.uncompleted
                : styles.formInput
            } ${!errors.password && styles.completed}`}
          />
          {errors.password && isTouched.password && (
            <span>{errors.password}</span>
          )}
        </div>
        <div className={`${styles.formButton} ${styles.formButtonLogin}`}>
          <Link to="/signup">SignUp</Link>
          <button type="submit">Login</button>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;
