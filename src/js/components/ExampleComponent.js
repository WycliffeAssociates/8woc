var React = require('react');
var Button = require('react-bootstrap/lib/Button.js');
var CoreStore = require('../stores/CoreStore.js');
var CheckStore = require('../stores/CheckStore.js');
var CoreActions = require('../actions/CoreActions.js');
/**

This is an example component that follows the Flux
pattern. Any time data needs to be changed, it sends
out an actions using CoreActions. It also gets its
data from CoreStore.

*/

class ExampleComponent extends React.Component {

  constructor() {
    super();
    this.state = {ptext: CoreStore.getExampleComponentText()};
  }

  getText() {
    this.setState({
      ptext: CoreStore.getExampleComponentText()
    });
  }

  addToText() {
    CoreActions.addToExampleComponentText();
  }

  openCheckModule() {
    var filePath = "C:/Users/Logan Lebanoff/Desktop/8woc/8woc/data/projects/eph_mylanguage/check_modules/phrase_check_module/check_data.json";
    CoreActions.openCheckModule(filePath);
  }

  // ExampleComponent listens for CoreStore's emits
  // so it can know when it needs to update its data
  componentWillMount() {
    CoreStore.addChangeListener(this.getText.bind(this));
  }

  componentWillUnmount() {
    CoreStore.removeChangeListener(this.getText.bind(this));
  }

  render() {
    return (
      <div>
        <p>{this.state.ptext}</p>
        <Button onClick={this.addToText}>Add an 'a'</Button>
        <Button onClick={this.openCheckModule}>Open phrase checker</Button>
      </div>
    );
  }
}
module.exports = ExampleComponent;
