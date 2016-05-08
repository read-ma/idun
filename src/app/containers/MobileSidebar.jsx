require('./MobileSidebar.scss');
import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import reduce from 'lodash/reduce';
import uniqueId from 'lodash/uniqueId';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { ShowIf } from '../components';

function DefinitionListItem({ text, url }) {
  let key = _.uniqueId('mobileSidebar');

  if (url) {
    return (<li className="collection-item item-image center-align col s12 m6" key={key}>
      <img data-caption={text} src={url} alt={text} />
    </li>);
  }

  if (!url) {
    return (<li className="collection-item" key={key}>
      <div dangerouslySetInnerHTML={{ __html: text }}></div>
    </li>);
  }
}

DefinitionListItem.propTypes = {
  text: React.PropTypes.string,
  url: React.PropTypes.string,
};


class MobileSidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { visible: false };
    this.hide = this.hide.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: !!nextProps.selectedText,
    });
  }

  hide() {
    this.setState({ visible: false });
  }

  isMobile() {
    if (typeof window.screen.width === 'undefined') {
      throw new Error(`window.screen.width is not supported in ${navigator.userAgent}`);
    }

    return window.screen.width && window.screen.width < 601;
  }

  render() {
    if (!this.state.visible) return false;

    let listItems = this.props.translations.map((item) => new DefinitionListItem(item));

    return (
      <ShowIf condition={this.isMobile()}>
        <ReactCSSTransitionGroup transitionName="fadein"
          transitionAppear={true}
          transitionLeave={false}
          transitionEnterTimeout={0}
          transitionAppearTimeout={1000}
        >
          <div className="mobile-sidebar">
            <a className="close-sidebar" onClick={this.hide}>
              <i className="material-icons">arrow_drop_down</i>
              <span>Close</span>
              <i className="material-icons align-left">arrow_drop_down</i>
            </a>

            <ul className="collection with-header">
              <li className="collection-header center-align">
                <h4>{this.props.selectedText}</h4>
              </li>
              {listItems}
            </ul>
          </div>
        </ReactCSSTransitionGroup>
      </ShowIf>
    );
  }
}

MobileSidebar.propTypes = {
  translations: React.PropTypes.array,
  selectedText: React.PropTypes.string,
};

const mobileDefinitionSelector = (state) => {
  return _.reduce(state.definitions.data, (prev, current) => {
    return current[0] && [...prev, current[0]] || prev;
  }, []);
};

const mapStateToProps = (state) => {
  return {
    selectedText: state.article.selectedText,
    translations: mobileDefinitionSelector(state),
  };
};

export default connect(mapStateToProps)(MobileSidebar);
