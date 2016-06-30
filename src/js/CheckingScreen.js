var React = require('react');
var update = require('react-addons-update');
var Well = require('react-bootstrap/lib/Well.js');

var MenuItem = require('./MenuItem');
var CheckModule = require('./CheckModule');
var CheckStore = require('./CheckStore');

module.exports = React.createClass({   // checkecking screen has menu item and check module in it
  getInitialState: function() {
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
    var menuItems = this.state.checks.map(function(check){
      return (
        <div>
          <MenuItem check={check} />
        </div>
      );
    });
    return (
      <div>
          <Well>
            {menuItems}
          </Well>
          <CheckModule onCheckedStatusChanged={this.changeCheckedStatus} />
      </div>
    );
  }
});
