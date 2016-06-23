import React, { Component } from 'react';
import DropDownMenu from 'material-ui/lib/DropDownMenu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import { changeLanguage } from '../../actions';
import { connect } from 'react-redux';

const styles = {
  iconStyles: {
    border: '1px solid #ccc',
    padding: 0,
    width: 19,
    height: 16,
    top: 6
  },
  toolbar: {
    position: 'fixed',
    top: 64,
    left: 0,
    right: 0,
    zIndex: 2,
    padding: '0',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    title: {
      fontSize: '16px',
      margin: '0 20px'
    }
  },
  icon: {
    fill: '#000'
  }
};

const LanguageFlag = ({ langKey }) => {
  let flagCode = langKey === 'en' ? 'gb' : langKey;

  return (
    <span style={styles.iconStyles} className={`flag-icon flag-icon-${flagCode}`}></span>
  );
};

class LanguageDropDownMenu extends Component {
  onLangChange(_, index, value) {
    this.props.changeLanguage(this.props.type, value);
  };

  render() {

    const languages = this.props.languages.map(lang => {
      const flag = <LanguageFlag langKey={ lang.key } />;

      return <MenuItem key={lang.code} primaryText={lang.code} value={lang.code} leftIcon={flag} />;
    });

    return (
      <DropDownMenu value={this.props.language[this.props.type]} iconStyle={styles.icon} onChange={ this.onLangChange.bind(this) }>
        {languages}
      </DropDownMenu>
    );
  }
};

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
