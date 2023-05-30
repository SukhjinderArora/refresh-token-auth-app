import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useAuth } from "../../contexts/auth-context";

import styles from "./Navbar.module.scss";

const Navbar = () => {
  const { isAuthenticated, token, logout } = useAuth();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      logout();
      navigate('/login');
    } catch (error) {
      console.log("Something went wrong.", error);
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <div>
          <Link className={styles.brand} to="/">
            Demo App
          </Link>
        </div>
        <div className={styles.navigationListContainer}>
          <ul className={styles.navigationList}>
            {!isAuthenticated && (
              <>
                <li className={styles.navigationItem}>
                  <Link className={styles.navigationLink} to="/login">
                    Login
                  </Link>
                </li>
                <li className={styles.navigationItem}>
                  <Link className={styles.navigationLink} to="/sign-up">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <>
                <li className={styles.navigationItem}>
                  <Link className={styles.navigationLink} to="/users">
                    Users
                  </Link>
                </li>
                <li className={styles.navigationItem}>
                  <button
                    className={styles.navigationLink}
                    onClick={logOutHandler}
                  >
                    Log out
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;