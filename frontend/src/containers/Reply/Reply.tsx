import { FC } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
// import Footer from '../../components/Footer';
import React, { useState } from 'react';
import styles from './reply.module.scss';
import UserItem from 'components/Users/UserItem';
import { mockdata } from 'components/Users/mockdata';
import { useStore } from 'hooks/useRootStore';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

interface IParam {
  msgId: string;
}

const Reply: FC = () => {
  const params: IParam = useParams();
  const { messagesStore, customerStore } = useStore();
  const history = useHistory();
  const message = messagesStore.getMessageById(params?.msgId)[0];

  const replySentMessage = messagesStore.sentItems.filter((item) => item.messageId === params.msgId);
  const { register, handleSubmit } = useForm();
  type IMessage = { to: string; from: string; subject: string; text: string };
  const sendMessage = useMutation((data: IMessage) => customerStore.sendMessage(data), {
    onSuccess: () => {
      history.push('/dashboard');
    },
    onError: () => {
      console.log('error'); //openNotification('error', `Can't logIn`);
    },
  });
  const onSubmit = (data: IMessage) => {
    sendMessage.mutate(data);
  };
  const [value, setValue] = useState(
    String(replySentMessage.length ? message.to?.value[0].address : message.from?.value[0].address)
  );
  //setValue(String(replySentMessage.length ? message.to?.value[0].address : message.from?.value[0].address));
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (email: string) => {
    setValue(email);
    inputClickHandler();
    // setIsOpen(!isOpen);
  };
  const inputClickHandler = () => {
    setIsOpen(!isOpen);
  };
  const filteredMails = mockdata.filter((mail) => {
    return (
      mail.name.toLowerCase().includes(value.toLowerCase()) ||
      mail.mail.split('@')[0].toLowerCase().includes(value.toLowerCase())
    );
  });

  return (
    <div className={styles.formContainer}>
      <Link className={styles.goBack} to={`/inboxmessage/${params.msgId}`}>
        &#8592;
      </Link>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.boxWide}>
          <span className={styles.label}>To:</span>
          <input
            className={styles.input}
            type='text'
            {...register('to', { required: true })}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
            onClick={inputClickHandler}
          />
          {isOpen ? (
            <ul className={styles.autocompleteMenu}>
              {filteredMails.map((item, index) => (
                <UserItem key={index} name={item.name} mail={item.mail} handleClick={handleClick} />
              ))}
            </ul>
          ) : null}
        </label>
        <label className={styles.boxWide}>
          <span className={styles.label}>From:</span>
          <input
            className={styles.input}
            type='text'
            {...register('from')}
            value={replySentMessage.length > 0 ? message.from?.value[0].address : message.to?.value[0].address}
            readOnly
          />
        </label>
        <label className={styles.boxWide}>
          <span className={styles.labelRe}>Re: </span>
          <input
            className={styles.input}
            type='text'
            {...register('subject')}
            value={message.subject ? message.subject : ''}
          />
        </label>
        <div className={styles.boxMessage}>
          <textarea className={styles.message} {...register('text')}></textarea>
          <div className={styles.replyMessage}>{message.text}</div>

          {/* <div className={styles.replyMessage}>{mockdata[0].replymessage}</div> */}
        </div>
        <div className={styles.boxBtn}>
          <button className={styles.submitBtn} type='submit'>
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Reply;
