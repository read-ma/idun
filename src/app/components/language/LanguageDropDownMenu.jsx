import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLanguage } from '../../actions';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const LanguageFlag = ({ langKey }) => {
  let flagCode = langKey;

  if (langKey === 'en') {
    flagCode = 'gb';
  } else if (langKey === 'cs') {
    flagCode = 'cz';
  }

  return (<span className={`flag-icon flag-icon-${flagCode} LanguageDropdownMenu-FlagStyles`}/>);
};

LanguageFlag.propTypes = {
  langKey: React.PropTypes.string.isRequired
};

class LanguageDropDownMenu extends Component {
  onLangChange(_, index, value) {
    this.props.changeLanguage(this.props.type, value);
  }

  render() {
    const languages = this.props.languages.map(lang => {
      const flag = <LanguageFlag langKey={lang.key} />;

      return <MenuItem key={lang.code} primaryText={flag} value={lang.code} className="LanguageDropdownMenu-FlagItem" />;
    });

    return (
      <DropDownMenu value={this.props.language[this.props.type]}
        className="LanguageDropdownMenu-Menu"
        underlineStyle={ { display: 'none' } } onChange={this.onLangChange.bind(this)}>
        {languages}
      </DropDownMenu>
    );
  }
}

LanguageDropDownMenu.propTypes = {
  languages: React.PropTypes.array.isRequired,
  language: React.PropTypes.object.isRequired,
  type: React.PropTypes.string.isRequired,
  changeLanguage: React.PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    languages: state.settings.languages,
    language: state.settings.language,
  };
}

const mapActionsToProps = (dispatch) => {
  return {
    changeLanguage(key, value) {
      dispatch(changeLanguage(key, value));
    }
  };
};

export default connect(mapStateToProps, mapActionsToProps)(LanguageDropDownMenu);
