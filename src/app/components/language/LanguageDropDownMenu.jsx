import React, { Component } from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { changeLanguage } from '../../actions';
import { connect } from 'react-redux';

const styles = {
  flagStyles: {
    border: '1px solid #ccc',
    padding: 0,
    width: 19,
    backgroundSize: 'cover',
    height: 14
  },
  targetLanguageMenu: {
    float: 'right',
    header: {
      float: 'left',
      fontWeight: 400
    }
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

  return (
    <span style={styles.flagStyles} className={`flag-icon flag-icon-${flagCode}`}></span>
  );
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
      <div style={styles.targetLanguageMenu}>
      <h4 style={styles.targetLanguageMenu.header}>Translate to: </h4>
        <DropDownMenu value={this.props.language[this.props.type]} iconStyle={styles.dropdownIcon} onChange={this.onLangChange.bind(this)}>
          {languages}
        </DropDownMenu>
      </div>
    );
  }
}

LanguageDropDownMenu.propTypes = {
  languages: React.PropTypes.array.isRequired,
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
