import Airbrake from 'airbrake-js'

class ErrorNotifier {
  static setup() {
    let env = process.env.NODE_ENV;

    if (true || env == 'production') {
      var airbrake = new Airbrake({
        projectId: 1,
        projectKey: 'abc'
      });
    } else {
      console.log('just do nothing' + env);
    }
  }
}

export default ErrorNotifier;
