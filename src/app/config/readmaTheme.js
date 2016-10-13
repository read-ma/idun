import _ from 'lodash';
import { merge } from 'lodash/merge';

import rawTheme from './rawTheme';
import getMuiTheme from 'material-ui/lib/styles/getMuiTheme';

import Colors from 'material-ui/lib/styles/colors';
import ColorManipulator from 'material-ui/lib/utils/color-manipulator';

const { palette, spacing } = rawTheme;

const componentsColors = {
  appBar: {
    color: palette.primary1Color,
    textColor: Colors.white,
    height: spacing.desktopKeylineIncrement
  },
  button: {
    height: 36,
    minWidth: 88,
    iconButtonSize: spacing.iconSize * 2
  },
  checkbox: {
    boxColor: palette.textColor,
    checkedColor: palette.primary1Color,
    requiredColor: palette.primary1Color,
    disabledColor: palette.disabledColor
  },
  datePicker: {
    color: palette.primary1Color,
    textColor: Colors.white,
    calendarTextColor: palette.textColor,
    selectColor: palette.primary2Color,
    selectTextColor: Colors.white
  },
  dropDownMenu: {
    accentColor: palette.borderColor
  },
  flatButton: {
    color: palette.canvasColor,
    textColor: palette.textColor,
    primaryTextColor: palette.accent1Color,
    secondaryTextColor: palette.primary1Color,
  },
  floatingActionButton: {
    buttonSize: 56,
    miniSize: 40,
    color: '#6078f6',
    iconColor: Colors.white,
    secondaryColor: palette.primary1Color,
    secondaryIconColor: Colors.white,
  },
  leftNav: {
    width: spacing.desktopKeylineIncrement * 4,
    color: Colors.white
  },
  menu: {
    backgroundColor: Colors.white,
    containerBackgroundColor: Colors.white,
  },
  menuItem: {
    dataHeight: 32,
    height: 48,
    hoverColor: 'rgba(0, 0, 0, .035)',
    padding: spacing.desktopGutter,
    selectedTextColor: palette.accent1Color,
  },
  menuSubheader: {
    padding: spacing.desktopGutter,
    borderColor: palette.borderColor,
    textColor: palette.primary1Color
  },
  paper: {
    backgroundColor: Colors.white,
  },
  radioButton: {
    borderColor: palette.textColor,
    backgroundColor: Colors.white,
    checkedColor: palette.primary1Color,
    requiredColor: palette.primary1Color,
    disabledColor: palette.disabledColor,
    size: 24,
  },
  raisedButton: {
    color: Colors.white,
    textColor: palette.textColor,
    primaryColor: '#6078f6',
    primaryTextColor: Colors.white,
    secondaryColor: palette.primary1Color,
    secondaryTextColor: Colors.white
  },
  slider: {
    trackSize: 2,
    trackColor: Colors.minBlack,
    trackColorselected: Colors.grey500,
    handleSize: 12,
    handleSizeDisabled: 8,
    handleColorZero: Colors.grey400,
    handleFillColor: Colors.white,
    selectionColor: palette.primary3Color,
    rippleColor: palette.primary1Color
  },
  snackbar: {
    textColor: Colors.white,
    backgroundColor: '#323232',
    actionColor: palette.accent1Color
  },
  timePicker: {
    color: Colors.white,
    textColor: Colors.grey600,
    accentColor: palette.primary1Color,
    clockColor: Colors.black,
    selectColor: palette.primary2Color,
    selectTextColor: Colors.white
  },
  toggle: {
    thumbOnColor: Colors.white,
    thumbOffColor: Colors.grey50,
    thumbDisabledColor: Colors.grey400,
    thumbRequiredColor: palette.primary1Color,
    trackOnColor: palette.primary1Color,
    trackOffColor: palette.primary1Color,
    trackDisabledColor: ColorManipulator.fade(palette.primary1Color, 0.3)
  },
  toolbar: {
    height: 56,
    titleFontSize: 20,
    iconColor: Colors.white,
    separatorColor: 'rgba(0, 0, 0, .175)',
    menuHoverColor: 'rgba(0, 0, 0, .10)'
  },
  tabs: {
    backgroundColor: palette.primary1Color,
  },
  textField: {
    textColor: palette.textColor,
    hintColor: palette.disabledColor,
    floatingLabelColor: palette.textColor,
    disabledTextColor: palette.disabledColor,
    errorColor: Colors.red500,
    focusColor: palette.primary1Color,
    backgroundColor: 'transparent',
    borderColor: palette.borderColor
  }
};

const componentDerivates = {
  flatButton: {
    disabledTextColor: ColorManipulator.fade(componentsColors.flatButton.textColor, 0.3)
  },
  floatingActionButton: {
    disabledColor: ColorManipulator.darken(Colors.white, 0.1),
    disabledTextColor: ColorManipulator.fade(palette.textColor, 0.3)
  },
  raisedButton: {
    disabledColor: ColorManipulator.darken(componentsColors.raisedButton.color, 0.1),
    disabledTextColor: ColorManipulator.fade(componentsColors.raisedButton.textColor, 0.3)
  },
  slider: {
    handleSizeActive: componentsColors.slider.handleSize * 2
  },
  toggle: {
    trackRequiredColor: ColorManipulator.fade(componentsColors.toggle.thumbRequiredColor, 0.5)
  }
};

const muiTheme = _.merge(componentsColors, componentDerivates); // Using lodash for deep merge.
const readmaTheme = getMuiTheme(rawTheme, muiTheme);

export default readmaTheme;
