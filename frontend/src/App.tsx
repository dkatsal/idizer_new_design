import { FC } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
// import { ReactQueryDevtools } from 'react-query/devtools';
import { RootStoreProvider } from 'RootStore';
import styles from './App.module.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from './containers/Dashboard';
import Inbox from './containers/Inbox';
import MailBlank from './containers/MailBlank';
import Reply from 'containers/Reply';
import Profile from 'containers/Profile';
import Registration from 'containers/Registration';
import Phone from './containers/Phone';
import Code from 'containers/Code';
import Error404 from 'components/Error404';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      structuralSharing: false,
    },
  },
});

// const ScrollToTop: FC = () => {
//   const { pathname } = useLocation();
//   useEffect(() => {
//     if (window && window.scrollTo) {
//       window.scrollTo(0, 0);
//     }
//   }, [pathname]);
//   return null;
// };

const App: FC = () => (
  <QueryClientProvider client={queryClient}>
    <RootStoreProvider>
      <div className={styles.app}>
        <a href='/' style={{ display: 'none' }}>
          learn react
        </a>
        <Router>
          {/* <ScrollToTop /> */}
          <div className={styles.globalWrapper}>
            <Switch>
              <Route exact path='/' component={Phone} />
              <Route exact path='/smscode' component={Code} />
              <Route exact path='/registration' component={Registration} />
              <Route exact path='/dashboard' component={Dashboard} />
              <Route exact path='/profile' component={Profile} />
              <Route exact path='/inboxmessage/:msgId' component={Inbox} />
              <Route exact path='/mailblank' component={MailBlank} />
              <Route exact path='/reply/:msgId' component={Reply} />
              <Route exact path='*' component={Error404} />

              {/* <Route exact path='/preload' component={Preload} /> */}
            </Switch>
          </div>
        </Router>
      </div>
    </RootStoreProvider>
    {/*<ReactQueryDevtools />*/}
  </QueryClientProvider>
);

export default App;
