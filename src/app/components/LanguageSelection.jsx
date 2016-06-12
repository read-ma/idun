require('./shared/Toolbar.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeLanguage } from '../actions';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

const styles = {
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

class LanguageBar extends Component {
  constructor(props) {
    super(props);
    this.state = props.language;
    this.languageChange = this.languageChange.bind(this);
    this.languageFromChange = this.languageFromChange.bind(this);
    this.languageToChange = this.languageToChange.bind(this);
  }

  languageChange(key, value) {
    this.setState(Object.assign({}, this.state, { [key]: value }));
    this.props.changeLanguage(key, value);
  }

  languageFromChange(event, index, value) {
    this.languageChange('from', value);
  }

  languageToChange(event, index, value) {
    this.languageChange('to', value);
  }

  render() {
    let languageFlag = (langKey) => {
      let flagCode = langKey === 'en' ? 'gb' : langKey;
      const iconStyles = {
        border: '1px solid #ccc',
        padding: 0,
        width: 19,
        height: 16,
        top: 6
      };
      return (
        <span style={iconStyles} className={`flag-icon flag-icon-${flagCode}`}></span>);
    };
    let languages = this.props.languages.map(lang => {
      return <MenuItem value={lang.code} primaryText={lang.name} leftIcon={languageFlag(lang.key)} />;
    });

    return (
      <Toolbar style={styles.toolbar} className="toolbar">
        <ToolbarGroup float={"left"}>
          <ToolbarTitle text="Source language" style={styles.toolbar.title} />
          <DropDownMenu value={this.state.from} iconStyle={styles.icon} onChange={this.languageFromChange}>
            {languages}
          </DropDownMenu>
        </ToolbarGroup>


        <ToolbarGroup float={"right"}>
          <DropDownMenu value={this.state.to} iconStyle={styles.icon} onChange={this.languageToChange}>
            {languages}
          </DropDownMenu>
          <ToolbarTitle text="Target language" style={styles.toolbar.title} />
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

LanguageBar.propTypes = {
  language: React.PropTypes.object,
  changeLanguage: React.PropTypes.func,
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

export default connect(mapStateToProps, mapActionsToProps)(LanguageBar);
