import { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import styles from './registration.module.scss';
import { useStore } from 'hooks/useRootStore';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { ICustomerModel } from 'domain/customer';

const Registration: FC = observer(() => {
  const { customerStore } = useStore();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);

  const updateProfile = useMutation((dataProfile: ICustomerModel) => customerStore.updateProfile(dataProfile), {
    onSuccess: () => {
      history.push('/dashboard');
    },
    onError: () => {
      console.log('error'); //openNotification('error', `Can't update user data`);
    },
  });

  const onSubmit = (dataProfile: ICustomerModel) => {
    dataProfile?.name && dataProfile?.name?.length > 1 ? updateProfile.mutate(dataProfile) : setError(true);
  };

  return (
    <main className={styles.formContainer}>
      <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}>
        <label className={styles.boxWide}>
          <span className={styles.label}>Name</span>
          <input type='text' placeholder={'Enter your name'} className={styles.inputWrite} {...register('name')} />
          {error && <span className={styles.labelError}>Это поле должно содержать минимум 2 символа</span>}
        </label>{' '}
        <div className={styles.boxBtn}>
          <button className={styles.submitBtn} type='submit'>
            Confirm
          </button>
        </div>
      </form>
    </main>
  );
});

export default Registration;
