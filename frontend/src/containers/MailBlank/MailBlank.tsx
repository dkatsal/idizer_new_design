import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styles from './mailBlank.module.scss';
import UserItem from 'components/Users/UserItem';
import { mockdata } from 'components/Users/mockdata';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useStore } from 'hooks/useRootStore';

const MailBlank: FC = observer(() => {
  const { customerStore } = useStore();
  const history = useHistory();
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
  //--------------------------------------------------------

  const [value, setValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (email: string) => {
    setValue(email);
    setIsOpen(!isOpen);
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
    <main className={styles.formContainer}>
      <Link className={styles.goBack} to='/dashboard'>
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
            value={customerStore.customer?.email ? `${customerStore.customer.email}` : `Anonim`}
            {...register('from')}
            readOnly
          />
        </label>
        <label className={styles.boxWide}>
          <span className={styles.label}>Topic:</span>
          <input className={styles.input} type='text' {...register('subject')} />
        </label>
        <textarea className={styles.boxMessage} {...register('text')} placeholder='Say Hello...'>
          {/* <span className={styles.label}>From</span> */}
          {/* <input className={styles.input} type='text' name='message' placeholder='Say Hello...' /> */}
        </textarea>
        <div className={styles.boxBtn}>
          <button className={styles.submitBtn} type='submit'>
            Send
          </button>
        </div>
      </form>
    </main>
  );
});

export default MailBlank;
