import Airbrake from 'airbrake-js'

class ErrorNotifier {
  static setup() {
    let env = process.env.NODE_ENV;

    if (env == 'production') {
      var airbrake = new Airbrake({
        projectId: '8a87ad8854a89f8e33a221b692d5c3b4',
        projectKey: '8a87ad8854a89f8e33a221b692d5c3b4',
        reporter: 'xhr',
        host: 'http://errbit.logdock.com'
      });
     window.onerror = airbrake.onerror;
    }
  }
}

export default ErrorNotifier;
