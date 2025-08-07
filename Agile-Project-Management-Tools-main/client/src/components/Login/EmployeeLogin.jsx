import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import { PersonOutline } from "@material-ui/icons";
import styles from "./styles.module.css";

const EmployeeLogin = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/employeeAuth";
      const response = await axios.post(url, data);
      console.log(response); // Log the response
      localStorage.setItem("token", response.data.token); // Store the token in localStorage
      window.location = "/employee-dashboard";
    } catch (error) {
      console.error("Error:", error); // Log the entire error object for debugging
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Employee Login</h1>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>New Here?</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sign Up
            </button>
          </Link>
          <IconButton
            component={Link}
            to="/employee-login"
            className={styles.employee_login_btn}
          >
            <PersonOutline />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLogin;
