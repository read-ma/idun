import React, { Component } from 'react';
import { connect } from 'react-redux';

import { changeLanguage } from '../../actions';

import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';

const styles = {
  flagStyles: {
    border: '1px solid #ccc',
    padding: 0,
    width: 19,
    backgroundSize: 'cover',
    height: 14
  },
  dropdownIcon: {
    fill: '#000'
  },
  flagItem: {
    verticalAlign: 'middle'
  }
};

const LanguageFlag = ({ langKey }) => {
  let flagCode = langKey === 'en' ? 'gb' : langKey;
  flagCode = langKey === 'cs' ? 'cz' : langKey;

  return (<span style={styles.flagStyles} className={`flag-icon flag-icon-${flagCode}`}/>);
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

      return <MenuItem key={lang.code} primaryText={flag} value={lang.code} style={styles.flagItem} />;
    });

    return (
      <DropDownMenu value={this.props.language[this.props.type]} iconStyle={styles.dropdownIcon} onChange={this.onLangChange.bind(this)}>
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
