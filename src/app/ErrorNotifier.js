import Airbrake from 'airbrake-js';
import store from './store';

class ErrorNotifier {
  static setup() {
    let env = process.env.NODE_ENV;

    if (env === 'production') {
      window.airbrake = new Airbrake({
        projectId: 'b8bcbc344ad24959b949df8b47ffcc9e',
        projectKey: 'b8bcbc344ad24959b949df8b47ffcc9e',
        reporter: 'xhr',
        host: 'http://errbit.logdock.com'
      });

      window.airbrake.addFilter(notice => {
        notice.session = Object.assign(
          {},
          notice.session,
          store.getState().auth,
          store.getState().routing,
          store.getState().settings
        );

        return notice;
      });

      window.onerror = window.airbrake.onerror;
    }
  }
}

export default ErrorNotifier;
