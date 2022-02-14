import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './dashboardMessages.module.scss';
import { useStore } from 'hooks/useRootStore';
import { useQuery } from 'react-query';
import { IMessagesModel } from 'domain/messages/messages.model';
import Notification from 'components/Notification/Notification';
import moment from 'moment';

type UserItemPropss = {
  folder: string;
  setMsgId: (msgId: string) => void;
};
const DashboardMessages: FC<UserItemPropss> = observer(({ folder, setMsgId }) => {
  const { messagesStore, preloadStore } = useStore();
  const history = useHistory();
  const messagesReq = useQuery<IMessagesModel[]>('messagesReq', () => messagesStore.getMessages(), {
    refetchInterval: 240000,
    onSuccess: () => {
      preloadStore.setClose();
    },
    onError: () => {
      preloadStore.setClose();
      history.push('*');
    },
  });
  let msg: IMessagesModel[] = [];
  const undelivered: any[] = [];
  if (folder === 'inbox' || folder === 'undelivered') {
    const msgArray: IMessagesModel[] = messagesStore.inbox;
    msgArray.map((item) => (item.messageId ? msg.push(item) : undelivered.push(item)));
  } else {
    msg = messagesStore.sentItems;
  }
  console.log('msg', msg);

  if (messagesReq.isSuccess && folder !== 'undelivered' && msg.length > 0) {
    setMsgId(msg[0].messageId || '');
  }

  if (folder === 'undelivered') {
    msg = undelivered;
  }

  return msg.length ? (
    <section className={styles.dmWrapper}>
      <Notification />
      {messagesReq.isSuccess &&
        msg.map((item, index) => (
          // <Link to={`/inboxmessage/${item.messageId}`} >
          <div className={styles.message} key={item.messageId} onClick={() => setMsgId(item.messageId || '')}>
            {/* onClick={() => history.push(`/inboxmessage/${item.messageId}`)}> */}
            <button className={styles.userLogo} type='button'>
              {item.from?.value[0].name.slice(0, 2).toUpperCase()}
            </button>
            <div className={styles.messageData}>
              <div className={styles.titleBox}>
                <h2 className={styles.title}>{item.from?.value[0].name}</h2>
                <p className={styles.time}>{moment(item.date).locale('ru').utc(true).format('HH:mm')}</p>
              </div>
              <button className={styles.messageBox} type='button'>
                <span className={styles.theme}>{item.subject}</span>
                <span className={styles.text}>{item.text?.split('\n\n')[0]}</span>
              </button>
            </div>
          </div>
          // </Link>
        ))}
    </section>
  ) : null;
});

export default DashboardMessages;
