import { FC } from 'react';
import { Link } from 'react-router-dom';
// import Footer from '../../components/Footer';
import React from 'react';
import styles from './Inbox.module.scss';
// import logo from '../../img/idizer.logo.jpg';
// import { useParams } from 'react-router-dom';
import { useStore } from 'hooks/useRootStore';
import moment from 'moment';
import { observer } from 'mobx-react-lite';

// interface IParam {
//   msgId: string;
// }
type Props = {
  msgId: number;
};

const Inbox: FC<Props> = observer(({ msgId }) => {
  // const params: IParam = useParams();
  const { messagesStore } = useStore();

  // const message = messagesStore.getMessageById(params?.msgId)[0];
  const message = messagesStore.inbox[msgId];

  return (
    <section className={styles.wrapper}>
      <div className={styles.topicBox}>
        <h1 className={styles.topic}>{message.subject}</h1>
        <Link className={styles.goBackLink} to='/dashboard'>
          &#8592;
        </Link>
      </div>
      <div className={styles.messageBox}>
        <div className={styles.message}>
          <div className={styles.userLogo}>{message.from?.value[0].name.slice(0, 2) || ''}</div>
          <div className={styles.messageData}>
            <div className={styles.titleTime}>
              <h2 className={styles.title}>{message.from?.value[0].name || ''}</h2>
              <p className={styles.time}>{moment(message.date).locale('ru').utc(false).format('D MMMM, HH:mm')}</p>
            </div>
            <div className={styles.toAddressed}>to: {message.to?.value[0].address}</div>
          </div>
        </div>
        {/* <div className={styles.textAreaBox}> */}
        <p className={styles.text}>{message.text?.split('\n\n')[0]}</p>
        <br />
        {/* <p className={styles.text}>{message.text?.split('\n\n')[1]}</p> */}

        {/* </div> */}
      </div>

      <div className={styles.boxBtn}>
        {/* <Link className={styles.submitBtn} to={`/reply/${params.msgId}`}>
          Reply
        </Link> */}
      </div>
    </section>
  );
});

export default Inbox;
