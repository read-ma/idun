import React, { Component } from 'react';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

class FlashcardSettings extends Component {
  constructor(props) {
    super(props);
    this.change = this.change.bind(this);
  }

  change(_e, value) {
    this.props.changeSettings({ startWith: value });
  }

  render() {
    return (
      <div>
        <h4>Start With: </h4>
        <RadioButtonGroup name="startWith" defaultSelected={this.props.startWith} onChange={this.change}>
          <RadioButton
            value="definition"
            label="Definition"
            className="FlashcardSettings-RadioButton"
          />
          <RadioButton
            value="word"
            label="Word"
            className="FlashcardSettings-RadioButton"
          />
        </RadioButtonGroup>
      </div>
    );
  }
}

FlashcardSettings.propTypes = {
  startWith: React.PropTypes.string,
  changeSettings: React.PropTypes.func,
};

export default FlashcardSettings;
