require('./shared/Toolbar.scss');

import React, { Component } from 'react';
import { connect } from 'react-redux';

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
    borderBottom: '1px solid #eee'
  },
  icon: {
    fill: '#000'
  }
};

class ArticleToolbar extends Component {
  render() {
    return (
      <Toolbar style={styles.toolbar} className="toolbar">
        <ToolbarGroup>
          <ToolbarTitle text="Language:" />
          <DropDownMenu value={"eng"} iconStyle={styles.icon}>
            <MenuItem value={"eng"} primaryText={"English"} />
            <MenuItem value={"de"} primaryText={"Deutsch"} />
            <MenuItem value={"fr"} primaryText={"Fransua"} />
          </DropDownMenu>
          <DropDownMenu value={"pl"} iconStyle={styles.icon}>
            <MenuItem value={"pl"} primaryText={"Polish"} />
          </DropDownMenu>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapActionsToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapActionsToProps)(ArticleToolbar);
