import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from './error404.module.scss';

const Error404: FC = () => {
  return (
    <div className={styles.formContainer}>
      <div className={styles.error}>Error 404...</div>
      <div className={styles.errorPage}>Page not found</div>
      {/* <div className={styles.errorBtnBox}> */}

      <Link to='/' className={styles.errorBtn}>
        Back to Login
      </Link>

      {/* </div> */}
    </div>
  );
};

export default Error404;
