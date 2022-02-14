import { FC, useEffect } from 'react';
// import { Link } from 'react-router-dom';
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
import { useQuery } from 'react-query';
import { IMessagesModel } from 'domain/messages';
import { useStore } from 'hooks/useRootStore';

const Dashboard: FC = observer(() => {
  const [visiblePopUp, setvisiblePopUp] = useState(false);
  const [value, setValue] = useState('inbox');
  const [msgId, setMsgId] = useState<string>();
  const [status, setStatus] = useState<string>('inbox');

  const [openFilterMenu, setOpenFilterMenu] = useState(false);
  const [foldersBoxOpen, setFoldersBoxOpen] = useState(true);

  const { messagesStore, preloadStore } = useStore();
  const messagesReq = useQuery<IMessagesModel[]>('messagesReq', () => messagesStore.getMessages(), {
    refetchInterval: 240000,
    onSuccess: () => {
      preloadStore.setClose();
    },
    onError: () => {
      preloadStore.setClose();
      // history.push('*');
    },
  });

  let msg: IMessagesModel[] = [];
  const undelivered: any[] = [];
  if (value === 'inbox' || value === 'undelivered') {
    const msgArray: IMessagesModel[] = messagesStore.inbox;
    msgArray.map((item) => (item.messageId ? msg.push(item) : undelivered.push(item)));
  } else {
    msg = messagesStore.sentItems;
  }

  // const selectFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setValue(e.target.value);
  // };
  const nextMessage = () => {
    if (messagesReq.isSuccess && value !== 'undelivered' && msg.length > 0) {
      let index = 0;
      const msgCopy = [...msg];
      msgCopy.map((item, i) => (item.messageId === msgId ? (index = i) : item));
      if (msg.length !== index + 1) {
        setMsgId(msg[index + 1].messageId || '');
      }
    }
  };

  const selectFolder = (folder: string) => {
    setValue(folder);
    setMsgId('');
  };
  const showFilter = () => {
    setvisiblePopUp(!visiblePopUp);
  };

  useEffect(() => {
    setStatus('inbox');
  }, [msgId]);

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
        <div className={openFilterMenu ? styles.filterBlock : styles.filterBlockClose}>
          <div className={styles.accountData}>
            <div className={styles.foldersBox}>
              <button className={styles.filterBtn} onClick={() => setFoldersBoxOpen(true)} type='button'>
                {/* <img className={styles.filterLogo} src={filter} alt='folders' /> */}
                MAIL
              </button>
            </div>
            <div className={styles.filtersBox}>
              <button className={styles.filterBtn} onClick={() => setFoldersBoxOpen(false)} type='button'>
                {/* <img className={styles.filterLogo} src={filter} alt='filter' /> */}
                FILTER
              </button>
            </div>
          </div>
          {foldersBoxOpen ? (
            <div className={styles.inboxBox}>
              <ul className={styles.inbox}>
                <li
                  className={styles.inboxOption}
                  style={value === 'inbox' ? { textDecoration: 'underline' } : undefined}
                  onClick={() => selectFolder('inbox')}>
                  Inbox
                </li>
                <li
                  className={styles.inboxOption}
                  style={value === 'sent' ? { textDecoration: 'underline' } : undefined}
                  onClick={() => selectFolder('sent')}>
                  Sent
                </li>
                <li
                  className={styles.inboxOption}
                  style={value === 'undelivered' ? { textDecoration: 'underline' } : undefined}
                  onClick={() => selectFolder('undelivered')}>
                  Undelivered
                </li>
              </ul>
            </div>
          ) : (
            <Filter />
          )}
          {/* <DashboardMessages folder={value} setMsgId={setMsgId} /> */}
        </div>
        <div className={styles.allMessages}>
          <div className={styles.accountData}>
            <button className={styles.filterMenu} type='button' onClick={() => setOpenFilterMenu(!openFilterMenu)}>
              {'<<'}
            </button>
            <div className={styles.choicedFolder}>{value.toUpperCase()}: All</div>
          </div>
          <DashboardMessages folder={value} setMsgId={setMsgId} />
        </div>
        <div className={styles.editMessage}>
          <div className={styles.headerMessage}>
            <button
              className={styles.headerBtn}
              type='button'
              onClick={() => setStatus(status === 'reply' || status === 'new_message' ? 'inbox' : 'reply')}>
              {status === 'reply' || status === 'new_message' ? 'Inbox' : 'Reply'}
            </button>
            <button className={styles.headerBtn} type='button' onClick={nextMessage}>
              Forward
            </button>
            <button className={styles.headerBtn} type='button'>
              Delete
            </button>
            <button className={styles.headerBtn} type='button' onClick={() => setStatus('new_message')}>
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
