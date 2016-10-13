import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';
import Spacing from 'material-ui/lib/styles/spacing';
import zIndex from 'material-ui/lib/styles/zIndex';

export default {
  spacing: Spacing,
  contentFontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#5266d1',
    primary2Color: Colors.cyan700,
    primary3Color: Colors.cyan100,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.pinkA400,
    accent3Color: Colors.pinkA100,
    textColor: Colors.darkBlack,
    alternateTextColor: '#fff',
    canvasColor: '#fff',
    borderColor: Colors.grey300,
    pickerHeaderColor: Colors.cyan500,
    disabledColor: ColorManipulator.fade(Colors.darkBlack, 0.3)
  }
};
