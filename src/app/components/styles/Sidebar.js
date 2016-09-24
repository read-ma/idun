import colors from 'material-ui/lib/styles/colors';
import { screenWidth } from '../../Responsive';

let initialCSS = {
  desktop: {
    sidebar: {
      width: 500,
      appbar: {
        alignItems: 'center'
      }
    },
  },
  mobile: {
    sidebar: {
      width: screenWidth(),
      marginTop: 0,
      height: '100%',
      appbar: {
        position: 'fixed',
        top: 0,
        alignItems: 'center'
      },
    },
  }
};

module.exports = {
  sidebar(mode) {
    return initialCSS[mode].sidebar;
  },
  subheader: {
    fontSize: '18px',
    fontWeight: 600,
    color: '#000'
  },
  languageHeader: {
    float: 'left',
    paddingLeft: '16px'
  },
  translationsInstruction: {
    clear: 'both',
    width: '75%',
    display: 'block',
    paddingTop: '3.5em',
    margin: 'auto'
  },
  instructionParagraph: {
    marginBottom: '1em',
    color: colors.grey300,
    fontSize: '1.85em',
    lineHeight: '145%',
    fontWeight: 200,
  }
};
