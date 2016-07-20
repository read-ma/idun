import ReactGA from 'react-ga';
import { hashHistory } from 'react-router';
import ls from './localStore';

export default () => {
  ReactGA.initialize('UA-79667263-1', {debug: true});
  ReactGA.set({ userId: ls.get('CURRENT_USER_EMAIL') });
  hashHistory.listen(location => ReactGA.pageview(location.pathname));
};
