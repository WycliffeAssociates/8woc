/**
 * @author Logan Lebanoff
 * @description This component allows you to switch between Check Modules.
 *              When the selection changes, then the data from check_data.json
 *              is loaded into CheckStore.
 ******************************************************************************/
var React = require('react');
var Well = require('react-bootstrap/lib/Well.js');
var FormGroup = require('react-bootstrap/lib/FormGroup.js');
var ControlLabel = require('react-bootstrap/lib/ControlLabel.js');
var FormControl = require('react-bootstrap/lib/FormControl.js');
var CheckStore = require('../stores/CheckStore.js');
var CheckActions = require('../actions/CheckActions.js');

class SwitchCheckModuleDropdown extends React.Component {

  constructor() {
    super();
    this.state = {
      checkCategory: CheckStore.getCurrentCheckCategory(),
      checkCategoryOptions: CheckStore.getCheckCategoryOptions()
    };
  }

  refreshSelectedCheckModule() {
    this.setState({
      checkCategory: CheckStore.getCurrentCheckCategory(),
      checkCategoryOptions: CheckStore.getCheckCategoryOptions()
    });
  }

  openCheckModule(e) {
    var checkCategoryId = e.target.value;
    var newCheckCategory = CheckStore.getCheckCategory(checkCategoryId);
    CheckActions.changeCheckCategory(newCheckCategory);
  }

  componentWillMount() {
    CheckStore.addChangeListener(this.refreshSelectedCheckModule.bind(this));
  }

  componentWillUnmount() {
    CheckStore.removeChangeListener(this.refreshSelectedCheckModule.bind(this));
  }

  render() {
    var optionNodes = this.state.checkCategoryOptions.map(function(checkCategory){
      return (
        <option key={Math.random()} value={checkCategory.id}>{checkCategory.name}</option>
      )
    });

    return (
      <Well>
        <FormGroup>
          <ControlLabel>Select a Check Category</ControlLabel>
          <FormControl componentClass="select" value={this.state.checkCategory == undefined ? 'NONE_SELECTED' : this.state.checkCategory.id} onChange={this.openCheckModule}>
            <option value={'NONE_SELECTED'} style={{display: "none"}}></option>
            {optionNodes}
          </FormControl>
        </FormGroup>
      </Well>
    );
  }
}
module.exports = SwitchCheckModuleDropdown;
