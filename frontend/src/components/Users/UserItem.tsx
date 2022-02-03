import styles from './users.module.scss';
import { FC } from 'react';
import { observer } from 'mobx-react-lite';

type UserItemProps = {
  name: string;
  mail: string;
  handleClick: (email: string) => void;
};

const UserItem: FC<UserItemProps> = observer(({ name, mail, handleClick }) => {
  // const filteredMails = mockdata.filter((mail) => {
  //   return (
  //     mail.name.toLowerCase().includes(value.toLowerCase()) ||
  //     mail.mail.split('@')[0].toLowerCase().includes(value.toLowerCase())
  //   );
  // });

  return (
    <li className={styles.autocompleteItem} onClick={() => handleClick(mail)}>
      <h3>{name}</h3>
      <p>{mail}</p>
    </li>
  );
});

export default UserItem;
