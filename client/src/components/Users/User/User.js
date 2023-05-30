import styles from './User.module.scss';

const User = ({ user }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg"
          alt="User Avatar"
        />
      </div>
      <div>
        <h2>{user.name}</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          ornare neque quis purus tempus interdum. Lorem ipsum dolor sit amet,
          consectetur adipiscing elit.{" "}
        </p>
      </div>
    </div>
  );
};

export default User;