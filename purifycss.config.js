import path from 'path';
import glob from 'glob-all';

const getConfig = () => {
  return {
    paths: glob.sync([
      path.join(__dirname, 'src/app/**/*.js'),
      path.join(__dirname, 'src/app/**/*.jsx')
    ]),
    purifyOptions: {
      minify: true,
      info: false // Show summary of size reduction after build
    }
  };
};

export default getConfig;
