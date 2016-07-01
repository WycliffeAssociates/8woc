var React = require('react');
var update = require('react-addons-update');
var Well = require('react-bootstrap/lib/Well.js');

var MenuItem = require('./MenuItem');
var CheckModule = require('./CheckModule');
var CheckStore = require('./CheckStore');
var CheckStore = require('./CheckStore');

// checkecking screen has menu item and check module in it
module.exports = React.createClass({
  getInitialState: function() {
    return this.getAllChecks();
  },

  componentWillMount: function() {
    CheckStore.addChangeListener(this.getAllChecks);
  },

  componentWillUnmount: function() {
    CheckStore.removeChangeListener(this.getAllChecks);
  },

  changeState: function() {
    setState(getAllChecks);
  },

  getAllChecks: function() {
    return {
      checks: CheckStore.getAllChecks()
    };
  },

  // changes the status of checked status to the parameter "status"
  changeCheckedStatus: function(status) {
    var checkIndex = CheckStore.getCheckIndex();
    var newState = update(this.state, {
      checks: {
        [checkIndex]: {
          checkedStatus: {$set: status}
        }
      }
    });
    this.setState(newState);
  },

  render: function() {
    var menuItems = this.state.checks.map(function(check, index){
      return (
        <div key={index}>
          <MenuItem check={check} isCurrentCheck={index == CheckStore.getCheckIndex()} />
        </div>
      );
    });
    return (
      <div>
          <Well>
            {menuItems}
          </Well>
          <CheckModule check={CheckStore.getCurrentCheck()} onCheckedStatusChanged={this.changeCheckedStatus} />
      </div>
    );
  }
});
