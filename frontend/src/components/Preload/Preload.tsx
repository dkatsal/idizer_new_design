import { FC } from 'react';
import { observer } from 'mobx-react-lite';
import styles from './preload.module.scss';
import { useStore } from 'hooks/useRootStore';

const Preload: FC = observer(() => {
  const { preloadStore } = useStore();

  return preloadStore.isOpened ? (
    <section className={styles.formContainer}>
      <div className={styles.loader}></div>
    </section>
  ) : null;
});

export default Preload;
