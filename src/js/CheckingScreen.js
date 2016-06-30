var React = require('react');
var update = require('react-addons-update');
var MenuItem = require('./MenuItem');
var CheckModule = require('./CheckModule');
var CheckStore = require('./CheckStore');

module.exports = React.createClass({   // checkecking screen has menu item and check module in it
  getInitialState: function() {
    return {
      check: CheckStore.getCurrentCheck()
    };
  },

  // changes the status of checked status to the parameter "status"
  changeCheckedStatus: function(status) {
    var newState = update(this.state, {
      check: {
        checkedStatus: {$set: status}
      }
    });
    this.setState(newState);
  },

  render: function() {
    return (
      <div>
          <MenuItem check={this.state.check} />
          <CheckModule onCheckedStatusChanged={this.changeCheckedStatus} />
      </div>
    );
  }
});
