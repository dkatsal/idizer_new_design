import { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import styles from './profile.module.scss';
import { useStore } from 'hooks/useRootStore';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { ICustomerModel } from 'domain/customer';
import { removeToken } from 'utils/tokenUtils';
import Preload from 'components/Preload';
import Notification from 'components/Notification/Notification';

const Profile: FC = observer(() => {
  const [change, setChange] = useState(true);
  const { customerStore, preloadStore, notificationStore } = useStore();
  const history = useHistory();
  const { register, handleSubmit } = useForm();

  const customerReq = useQuery<ICustomerModel[]>('customerReq', () => customerStore.getProfile(), {
    onSuccess: () => {
      preloadStore.setClose();
    },
    onError: () => {
      preloadStore.setClose();
      history.push('*');
    },
  });

  const updateProfile = useMutation((dataProfile: ICustomerModel) => customerStore.updateProfile(dataProfile), {
    onSuccess: () => {
      // history.push('/profile');
      notificationStore.openNotification('success', 'profile', 'update is done');
      setTimeout(notificationStore.closeNotification, 4000); // history.push('/404');
    },
    onError: () => {
      console.log('error'); //openNotification('error', `Can't update user data`);
    },
  });

  const onSubmit = (dataProfile: ICustomerModel) => {
    updateProfile.mutate(dataProfile);
    setChange(false);
  };

  const logout = () => {
    removeToken();
  };

  return (
    <main>
      <Preload />
      {customerReq.isSuccess && (
        <div className={styles.formContainer}>
          <Notification />
          <div className={styles.header}>
            <h1 className={styles.headerTitle}>Profile</h1>
            <Link className={styles.goBack} to='/dashboard'>
              &#8592;
            </Link>
          </div>
          <div className={styles.boxBtn} style={change ? { display: 'none' } : { display: 'block' }}>
            <button className={styles.changeBtn} onClick={() => setChange(true)} type='button'>
              edit
            </button>
            <Link className={styles.logout} onClick={logout} to='/'>
              LOGOUT
            </Link>
          </div>
          <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}>
            <label className={styles.boxWide}>
              <span className={styles.label}>Name</span>
              <input
                type='text'
                defaultValue={customerStore.customer?.name === null ? '' : customerStore.customer?.name}
                {...(change === false
                  ? { readOnly: true, className: `${styles.inputRead}` }
                  : { readOnly: false, className: `${styles.inputWrite}` })}
                {...register('name')}
              />
            </label>
            <label className={styles.boxWide}>
              <span className={styles.label}>Email</span>
              <input
                className={styles.inputRead}
                type='email'
                defaultValue={customerStore.customer?.email === null ? '' : customerStore.customer?.email}
                readOnly
              />
            </label>
            {/* <label className={styles.boxWide}>
              <span className={styles.label}>Phone</span>
              <input className={styles.inputRead} type='phone' defaultValue={customerStore.customer?.phone} readOnly />
            </label> */}
            {/* <label className={styles.boxWide}>
              <span className={styles.label}>Profile Photo</span>
              <img className={styles.profileImg} src='' alt='' />
            </label> */}
            <div className={styles.boxBtn} style={change ? { display: 'block' } : { display: 'none' }}>
              <button className={styles.submitBtn} type='submit'>
                Confirm
              </button>
              <Link className={styles.logout} onClick={logout} to='/'>
                LOGOUT
              </Link>
            </div>
          </form>
        </div>
      )}
    </main>
  );
});

export default Profile;
