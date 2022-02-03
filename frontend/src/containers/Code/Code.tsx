import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styles from './code.module.scss';
import logo from '../../img/idizer.logo.jpg';
import { ICustomerModel } from 'domain/customer';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useStore } from 'hooks/useRootStore';
import Notification from '../../components/Notification';

const Code: FC = observer(() => {
  const { customerStore, notificationStore } = useStore();
  // if (customerStore.smsCode) {
  //   notificationStore.openNotification('success', `SMS - Code: \n\t ${customerStore.smsCode}`);
  //   setTimeout(notificationStore.closeNotification, 4000);
  // }
  const state = { phone: customerStore.phone };
  const phone = state.phone;
  const history = useHistory();
  const { register, handleSubmit, reset } = useForm();
  const notification = () => {
    notificationStore.openNotification('success', 'your SMS-code:', `${customerStore.smsCode}`);
    setTimeout(notificationStore.closeNotification, 4000);
  };
  const getSmsCode = () => {
    customerStore.getSmsCode(state).then(notification);
    setError('');
    reset({ smsCode: '' });

    // notificationStore.closeNotification();
  };
  // const notificationSms = customerStore.smsCode;

  const logIn = useMutation((data: ICustomerModel) => customerStore.login(phone, data), {
    onSuccess: () => {
      customerStore.customer?.name === '' || customerStore.customer?.name === null
        ? history.push('/registration')
        : history.push('/dashboard');
    },
    onError: () => {
      notificationStore.openNotification('error', `Can't log in`, 'SMS CODE IS NOT VALID');
      setTimeout(notificationStore.closeNotification, 4000);
    },
  });

  const onSubmit = (data: ICustomerModel) => {
    logIn.mutate(data);
  };

  const [error, setError] = useState('');

  return (
    <main className={styles.formContainer}>
      <Notification />
      <img className={styles.logo} src={logo} alt='idizer' />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.boxWide}>
          {/* <h2 className={styles.sms}>{`ПОЛУЧЕННЫЙ СМС КОД: ${customerStore.smsCode}`}</h2> */}
          <span className={styles.label}>SMS CODE</span>
          <input
            className={styles.input}
            style={!error ? { border: '2px solid #40424c' } : { border: '2px solid red' }}
            type='tel'
            {...register('smsCode')}
            pattern='\d{4}'
            // defaultValue={customerStore.smsCode}
          />
          <span className={styles.labelError}>Это поле должно содержать СМС-КОД из 4 цифр</span>
          <span className={styles.labelError2}>{error}</span>
        </label>
        <button className={styles.submitBtn} type='submit'>
          Next
        </button>
      </form>
      <button className={styles.resendCodeBtn} onClick={getSmsCode} type='button'>
        Resend Code
      </button>
    </main>
  );
});

export default Code;
