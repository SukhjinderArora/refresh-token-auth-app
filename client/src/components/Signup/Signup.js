import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useAuth } from "../../contexts/auth-context";
import { STATUS } from "../../utils/utils";

import styles from "./Signup.module.scss";

const Signup = () => {

  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { login, setAuthenticationStatus } = useAuth();

  const onSubmit = async (values) => {
    const newUser = {
      name: values.name,
      username: values.username,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };

    try {
      setAuthenticationStatus(STATUS.PENDING);
      const response = await axios.post("/api/auth/sign-up", newUser);
      setAuthenticationStatus(STATUS.SUCCEEDED);
      const { user, token, expiresAt } = response.data;
      login(user, token, expiresAt);
      navigate("/");
    } catch (error) {
      alert(error.response.data.error.message);
      setAuthenticationStatus(STATUS.FAILED);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.formTitle}>Create New Account</h1>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              {...register("name", {
                required: { value: true, message: "Name is required." },
                minLength: {
                  value: 2,
                  message: "Name cannot be less than 2 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Name cannot be more than 30 characters",
                },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.name && errors.name?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              {...register("username", {
                required: { value: true, message: "Username is required." },
                minLength: {
                  value: 2,
                  message: "Username cannot be less than 2 characters",
                },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.username && errors.username?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              placeholder="Email"
              {...register("email", {
                required: { value: true, message: "Email is required." },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Please enter a valid email",
                },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.email && errors.email?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "Password is required." },
                minLength: {
                  value: 6,
                  message: "Password cannot be less than 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "Password cannot be more than 30 characters",
                },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.password && errors.password?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: {
                  value: true,
                  message: "confirmPassword is required.",
                },
                validate: (value, formValues) => {
                  if (value !== formValues.password) {
                    return "Confirm password does not match the password";
                  }
                  return true;
                },
              })}
            />
            <div className={styles.validationError}>
              <span>
                {touchedFields.confirmPassword &&
                  errors.confirmPassword?.message}
              </span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <button className={styles.submitButton} type="submit">
              Sign Up
            </button>
          </div>
          <p className={styles.text}>
            <span>Already have an account?</span>
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;