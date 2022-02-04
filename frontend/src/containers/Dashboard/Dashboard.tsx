import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styles from './dashboard.module.scss';
import filter from '../../img/filter_icon.png';
import Filter from 'components/Filter';
import Preload from 'components/Preload';
import DashboardMessages from 'components/DashboardMessages';
import Inbox from 'containers/Inbox';
import Header from 'components/Header';
import Reply from 'containers/Reply';
import MailBlank from 'containers/MailBlank';

const Dashboard: FC = observer(() => {
  const [visiblePopUp, setvisiblePopUp] = useState(false);
  const [value, setValue] = useState('inbox');
  const [msgId, setMsgId] = useState<string>();
  const [status, setStatus] = useState<string>('inbox');

  const selectFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const showFilter = () => {
    setvisiblePopUp(!visiblePopUp);
  };
  return (
    <div className={styles.wrapper}>
      <Preload />
      <Header />
      {/* <Link to={`/mailblank`} className={styles.sendMessage}>
        +
      </Link> */}
      {/* <Link to={`/mailblank`} className={styles.sendMessage}>
          +
        </Link> */}
      {/* </div> */}
      <main className={styles.dashboard}>
        <div className={styles.allMessages}>
          <div className={styles.accountData}>
            <Link className={styles.profilePhoto} to='/profile'>
              DA
            </Link>
            {/* {messagesStore.map()} */}
            <div className={styles.inboxBox}>
              <select className={styles.inbox} name='select' onChange={selectFolder}>
                <option className={styles.inboxOption} value='inbox'>
                  Inbox
                </option>
                <option className={styles.inboxOption} value='sent'>
                  Sent
                </option>
              </select>
            </div>
            <div className={styles.filterBtn}>
              <button className={styles.filterBtn} onClick={showFilter} type='button'>
                <img className={styles.filterLogo} src={filter} alt='filter' />
              </button>
              {visiblePopUp && <Filter />}
            </div>
          </div>
          <DashboardMessages folder={value} setMsgId={setMsgId} />
        </div>
        <div className={styles.editMessage}>
          <div className={styles.headerMessage}>
            <button
              type='button'
              onClick={() => setStatus(status === 'reply' || status === 'new_message' ? 'inbox' : 'reply')}>
              {status === 'reply' || status === 'new_message' ? 'Inbox' : 'Reply'}
            </button>
            <button type='button'>Forward</button>
            <button type='button'>Delete</button>
            <button type='button' onClick={() => setStatus('new_message')}>
              New Message
            </button>
          </div>
          {status === 'inbox' && msgId ? <Inbox msgId={msgId} /> : null}
          {status === 'reply' && msgId ? <Reply msgId={msgId} /> : null}
          {status === 'new_message' ? <MailBlank /> : null}
        </div>
      </main>
    </div>
  );
});
export default Dashboard;
