var React = require('react');
var CheckActions = require('../actions/CheckActions.js');
var AbstractCheckModule = require('./AbstractCheckModule.js');

/*
An example check module component:
It just has a paragraph that displays the check status (default is UNCHECKED),
and a button to change it to RETAINED.

Things to notice:
- class ExampleCheckModule extends AbstractCheckModule
- super.getCurrentCheck() -- equivalent to this.state.currentCheck
  * this is how you get data
- CheckActions.changeCheckProperty(propertyName, propertyValue)
  * this is how you change data
*/

class ExampleCheckModule extends AbstractCheckModule {

  constructor() {
    super();
  }

  retainedButtonClicked() {
    CheckActions.changeCheckProperty("checkStatus", "RETAINED");
  }

  replacedButtonClicked() {
    CheckActions.changeCheckProperty("checkStatus", "REPLACED");
  }

  wrongButtonClicked() {
    CheckActions.changeCheckProperty("checkStatus", "WRONG");
  }

  nextButtonClicked() {
    CheckActions.nextCheck();
  }

  render() {
    return (
      <div>
        <p>{super.getCurrentCheck().phrase}</p>
        <button onClick={this.retainedButtonClicked.bind(this)}>Retained</button>
        <button onClick={this.replacedButtonClicked.bind(this)}>Replaced</button>
        <button onClick={this.wrongButtonClicked.bind(this)}>Wrong</button>
        <button onClick={this.nextButtonClicked}>Next</button>
      </div>
    );
  }
};
module.exports = ExampleCheckModule;