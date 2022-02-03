import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './notification.module.scss';
import { useStore } from 'hooks/useRootStore';

const Notification: FC = observer(() => {
  const {
    notificationStore: { type, isOpen, title, message },
  } = useStore();

  return isOpen ? (
    <div className={styles.notificationBox}>
      <div
        {...(type === 'success'
          ? { className: `${styles.content} ${styles.success}` }
          : { className: `${styles.content} ${styles.error}` })}>
        <h2 className={styles.title}>{title.toUpperCase()}</h2>
        <div>{message}</div>
      </div>
    </div>
  ) : null;
});
export default Notification;
