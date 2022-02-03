import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './phone.module.scss';
import logo from '../../img/idizer.logo.jpg';
import { ICustomerModel } from 'domain/customer';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useStore } from 'hooks/useRootStore';

const Phone: FC = observer(() => {
  const { customerStore, notificationStore } = useStore();
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = {
    pathname: '/smscode',
    state: customerStore.phone,
  };
  const getSmsCode = useMutation(({ phone }: ICustomerModel) => customerStore.getSmsCode({ phone }), {
    onSuccess: () => {
      history.push(location);
      notificationStore.openNotification('success', 'your SMS-code:', `${customerStore.smsCode}`);
      setTimeout(notificationStore.closeNotification, 4000);
    },
    onError: () => {
      console.log('error'); //openNotification('error', `Can't take sms Code`);
    },
  });

  const onSubmit = (data: ICustomerModel) => getSmsCode.mutate(data);

  return (
    <main className={styles.formContainer}>
      <img className={styles.logo} src={logo} alt='idizer' />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.boxWide}>
          <span className={styles.label}>Phone number</span>
          <input
            data-tel-input
            className={styles.input}
            type='tel'
            // defaultValue='+380500307309'
            {...register('phone', { required: true, maxLength: 13, pattern: /\d{12}/ })}
          />
          {errors.phone && (
            <p className={styles.labelError} style={{ display: 'block' }}>
              Введите телефон в формате +380991234567
            </p>
          )}
        </label>
        <button className={styles.submitBtn} type='submit'>
          Next
        </button>
      </form>
    </main>
  );
});

export default Phone;
