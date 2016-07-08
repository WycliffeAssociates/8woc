var React = require('react');
var FormGroup = require('react-bootstrap/lib/FormGroup.js');
var ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
var FormControl = require('react-bootstrap/lib/FormControl.js');
var CheckStore = require('../stores/CheckStore.js');
var CheckActions = require('../actions/CheckActions.js');
/**

*/

class SwitchCheckModuleDropdown extends React.Component {

  constructor() {
    super();
    this.state = {checkCategory: CheckStore.getCheckCategory()};
  }

  refreshSelectedCheckModule() {
    this.setState({
      checkCategory: CheckStore.getCheckCategory()
    });
  }

  openCheckModule(e) {
    var filePath = "C:/Users/Logan Lebanoff/Desktop/8woc/8woc/data/projects/eph_mylanguage/check_modules/phrase_check_module/check_data.json";
    CheckActions.changeCheckCategory(e.target.value, filePath);
  }

  componentWillMount() {
    CheckStore.addChangeListener(this.refreshSelectedCheckModule.bind(this));
  }

  componentWillUnmount() {
    CheckStore.removeChangeListener(this.refreshSelectedCheckModule.bind(this));
  }

  render() {
    return (
      <div>
        <FormGroup>
          <ControlLabel>Select Check Category</ControlLabel>
          <FormControl componentClass="select" placeholder="NO_SELECTION" value={this.state.checkCategory} onChange={this.openCheckModule}>
            <option value="NO_SELECTION">Select Check Category</option>
            <option value="Phrase Checks">Phrase Checks</option>
          </FormControl>
        </FormGroup>
      </div>
    );
  }
}
module.exports = SwitchCheckModuleDropdown;
