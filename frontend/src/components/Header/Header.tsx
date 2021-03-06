import { FC } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
// import { useState } from 'react';
import styles from './header.module.scss';
import logo from '../../img/idizer.logo.jpg';
// import filter from '../../img/filter_icon.png';
// import Filter from 'components/Filter';
// import Preload from 'components/Preload';
// import DashboardMessages from 'components/DashboardMessages';
// import Inbox from 'containers/Inbox';

const Header: FC = observer(() => {
  // const [visiblePopUp, setvisiblePopUp] = useState(false);
  // const [value, setValue] = useState('inbox');
  // const [msgId, setMsgId] = useState<string>();

  // const selectFolder = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   setValue(e.target.value);
  // };

  // const showFilter = () => {
  //   setvisiblePopUp(!visiblePopUp);
  // };
  return (
    <header className={styles.header}>
      <img className={styles.logo} src={logo} alt='idizer' />
      <div className={styles.profilePhotoBox}>
        <Link className={styles.profilePhoto} to='/profile'>
          DA
        </Link>
        <Link className={styles.profilePhoto} to='/profile'>
          DA
        </Link>
      </div>
    </header>
    // <main>
    //   <Preload />
    //   <div className={styles.wrapper}>
    //     {/* <Link to={`/mailblank`} className={styles.sendMessage}>
    //       +
    //     </Link> */}
    //     <div className={styles.accountData}>
    //       <Link className={styles.profilePhoto} to='/profile'>
    //         DA
    //       </Link>
    //       {/* {messagesStore.map()} */}
    //       <div className={styles.inboxBox}>
    //         {/* <div className={styles.inboxCircle}>1</div> */}

    //         <select className={styles.inbox} name='select' onChange={selectFolder}>
    //           <option className={styles.inboxOption} value='inbox'>
    //             Inbox
    //           </option>
    //           <option className={styles.inboxOption} value='sent'>
    //             Sent
    //           </option>
    //         </select>
    //       </div>
    //       <div className={styles.filterBtn}>
    //         <button className={styles.filterBtn} onClick={showFilter} type='button'>
    //           <img className={styles.filterLogo} src={filter} alt='filter' />
    //         </button>

    //         {visiblePopUp && <Filter />}
    //       </div>
    //     </div>
    //     {/* <Link to={`/mailblank`} className={styles.sendMessage}>
    //         +
    //       </Link> */}
    //     {/* </div> */}
    //     <div className={styles.flex}>
    //       <div className={styles.allMessages}>
    //         <DashboardMessages folder={value} setMsgId={setMsgId} />
    //       </div>
    //       <div className={styles.allMessages2}>{msgId ? <Inbox msgId={msgId} /> : null}</div>
    //     </div>
    //   </div>
    // </main>
  );
});
export default Header;
