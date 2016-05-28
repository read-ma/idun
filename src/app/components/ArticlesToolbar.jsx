import React, { Component } from 'react';
import { connect } from 'react-redux';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import MenuItem from 'material-ui/lib/menus/menu-item';
import DropDownMenu from 'material-ui/lib/DropDownMenu';

const styles = {
  toolbar: {
    position: 'fixed',
    top: 70,
    left: 71,
    width: 'calc(83.333% - 71px)'
  },
  icon: {
    fill: '#000'
  }
}

class ArticlesToolbar extends Component {
  render() {
    return <Toolbar style={styles.toolbar}>
      <ToolbarGroup>
        <DropDownMenu value={1} iconStyle={styles.icon}>
          <MenuItem value={1} primaryText="Visibility" disabled={true} />
          <MenuItem value={2} primaryText="My articles" />
          <MenuItem value={3} primaryText="Public articles" />
        </DropDownMenu>

        <DropDownMenu value={1} iconStyle={styles.icon}>
          <MenuItem value={1} primaryText="Learning" disabled={true} />
          <MenuItem value={2} primaryText="Articles to learn" />
          <MenuItem value={3} primaryText="Learned articles" />
        </DropDownMenu>

        <DropDownMenu value={1} iconStyle={styles.icon}>
          <MenuItem value={1} primaryText="Visits" disabled={true} />
          <MenuItem value={2} primaryText="Unread articles" />
          <MenuItem value={3} primaryText="Read articles" />
        </DropDownMenu>

        <DropDownMenu value={1} iconStyle={styles.icon}>
          <MenuItem value={1} primaryText="Level" disabled={true} />
          <MenuItem value={2} primaryText="Intermediate" />
          <MenuItem value={3} primaryText="Upper-intermediate" />
          <MenuItem value={4} primaryText="Advanced" />
        </DropDownMenu>
      </ToolbarGroup>
    </Toolbar>;
  }
}



function mapStateToProps(state) {
  return {}
}

const mapActionsToProps = (dispatch) => {
  return {
  };
};

// export default connect(mapStateToProps, mapActionsToProps)(Articles);

export default ArticlesToolbar
