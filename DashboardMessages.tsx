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
  setMsgId: any;
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
  let msg = null;
  if (folder === 'inbox') {
    msg = messagesStore.inbox;
  } else {
    msg = messagesStore.sentItems;
  }

  if (messagesReq.isSuccess) {
    setMsgId(msg[0].messageId);
  }

  return (
    <>
      <Notification />
      {messagesReq.isSuccess &&
        msg.map((item) => (
          // <Link to={`/inboxmessage/${item.messageId}`} >
          <div className={styles.message} key={item.messageId} onClick={() => setMsgId(item.messageId)}>
            {/* onClick={() => history.push(`/inboxmessage/${item.messageId}`)}> */}

            <div className={styles.userLogo}>{item.from?.value[0].name.slice(0, 2).toUpperCase()}</div>
            <div className={styles.messageData}>
              <div className={styles.titleTime}>
                <h2 className={styles.title}>{item.from?.value[0].name}</h2>
                <p className={styles.time}>{moment(item.date).locale('ru').utc(true).format('HH:mm')}</p>
              </div>
              <div className={styles.theme}>{item.subject}</div>
              <p className={styles.text}>{item.text?.split('\n\n')[0]}</p>
            </div>
          </div>
          // </Link>
        ))}
    </>
  );
});

export default DashboardMessages;
