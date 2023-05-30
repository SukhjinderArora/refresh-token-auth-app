import { useEffect, useState } from "react";
import axios from "axios";

import User from "./User/User";

import { useAuth } from "../../contexts/auth-context";

import styles from './Users.module.scss';

const Users = () => {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/users/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((error) => {
        console.log("Something went wrong.", error);
      });
  }, [token]);

  return (
    <div className={styles.container}>
      {users.map((user) => (
        <div key={user.id} className={styles.userContainer}>
            <User user={user}/>
        </div>
      ))}
    </div>
  );
};

export default Users;