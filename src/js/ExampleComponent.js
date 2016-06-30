var React = require('react');
var Button = require('react-bootstrap/lib/Button.js');
var CoreStore = require('./CoreStore.js');
var CoreActions = require('./CoreActions.js');
/**

This is an example component that follows the Flux 
pattern. Any time data needs to be changed, it sends
out an actions using CoreActions. It also gets its
data from CoreStore.

*/

class ExampleComponent extends React.Component {

  constructor() {
    super();
    this.state = { ptext: CoreStore.getExampleComponentText() };
  }

  getText() {
    console.log(this);
    this.setState({
      ptext: CoreStore.getExampleComponentText()
    });
  }

  addToText() {
    CoreActions.addToExampleComponentText();
  }
  
  // ExampleComponent listens for CoreStore's emits
  // so it can know when it needs to update its data
  componentWillMount() {
    CoreStore.on("change", this.getText.bind(this));
  }

  componentWillUnmount() {
    CoreStore.removeListener("change", this.getText.bind(this));
  }

  render() {
    return (
      <div>
        <p>{this.state.ptext}</p>
        <Button onClick={this.addToText}>Add an 'a'</Button>
      </div>
    );
  }
};
module.exports = ExampleComponent;