import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { useAuth } from "../../contexts/auth-context";
import { STATUS } from "../../utils/utils";

import styles from "./Login.module.scss";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, touchedFields },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { login, setAuthenticationStatus } = useAuth();

  const onSubmit = async (values) => {
    const user = {
      username: values.username,
      password: values.password,
    };

    try {
      setAuthenticationStatus(STATUS.PENDING);
      const response = await axios.post("/api/auth/login", user);
      setAuthenticationStatus(STATUS.SUCCEEDED);
      const { user: userObj, token, expiresAt } = response.data;
      login(userObj, token, expiresAt);
      navigate('/');
    } catch (error) {
      alert(error.response.data.error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h1 className={styles.formTitle}>Sign In</h1>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="text"
              name="username"
              id="username"
              aria-label="Username or Email"
              required
              placeholder="Username or Email"
              {...register("username", {
                required: { value: true, message: "This field is required." },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.name && errors.name?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <input
              className={styles.input}
              type="password"
              name="password"
              id="password"
              required
              placeholder="Password"
              {...register("password", {
                required: { value: true, message: "Password is required." },
              })}
            />
            <div className={styles.validationError}>
              <span>{touchedFields.password && errors.password?.message}</span>
            </div>
          </div>
          <div className={styles.formGroup}>
            <button className={styles.submitButton} type="submit">
              Sign In
            </button>
          </div>
          <p className={styles.text}>
            <span>Don't have an account?</span>
            <Link className={styles.link} to="/sign-up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;