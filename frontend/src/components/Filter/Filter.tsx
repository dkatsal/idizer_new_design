import { FC } from 'react';
import styles from './filter.module.scss';
import { observer } from 'mobx-react-lite';

const Filter: FC = observer(() => {
  return (
    <div className={styles.filterPopUp}>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='all' name='all' />
        All
      </label>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='filter' name='filter' />
        From my contacts
      </label>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='filter' name='filter' />
        Sender is not my contact
      </label>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='filter' name='filter' />
        Unread
      </label>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='filter' name='filter' />
        Read
      </label>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='filter' name='filter' />
        Unreplied
      </label>
      <label className={styles.check}>
        <input className={styles.checkInput} type='checkbox' id='filter' name='filter' />
        Replied
      </label>
    </div>
  );
});

export default Filter;
