/* global airbrakeJs */

import store from './store';

class ErrorNotifier {
  static setup() {
    if (process.env.NODE_ENV === 'production') {
      // Airbrake is provided from CDN
      window.airbrake = new airbrakeJs.Client({
        projectId: process.env.AIRBRAKE_PROJECTID,
        projectKey: process.env.AIRBRAKE_PROJECTID,
        reporter: 'xhr',
        host: process.env.AIRBRAKE_URL
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
