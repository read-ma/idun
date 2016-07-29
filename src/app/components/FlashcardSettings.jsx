import React, { Component } from 'react';

import RadioButton from 'material-ui/lib/radio-button';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';

const styles = {
  block: {
    maxWidth: 250,
  },
  radioButton: {
    marginBottom: 16,
  },
};

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
            style={styles.radioButton}
          />
          <RadioButton
            value="word"
            label="Word"
            style={styles.radioButton}
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
