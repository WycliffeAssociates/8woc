const React = require('react');
const ReactDOM = require('react-dom');
const update = require('react-addons-update');
const Well = require('react-bootstrap/lib/Well.js');

const CheckStore = require('../stores/CheckStore');

const TempCheckModule = React.createClass({
  getInitialState: function() {
    return this.getAllChecks();
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
    return (
      <div>
        <Well>
          <div>
            {CheckStore.getCurrentCheck().phrase}
          </div>
          <div>
            {/* rendering the buttons and passing the call backs as props */ }
            <RetainedButton onCheckedStatusChanged={this.changeCheckedStatus} />
            <ReplacedButton onCheckedStatusChanged={this.changeCheckedStatus} />
            <WrongButton onCheckedStatusChanged={this.changeCheckedStatus} />
            <UncheckButton onCheckedStatusChanged={this.changeCheckedStatus} />
          </div>
        </Well>
      </div>
    );
  }
});

const RetainedButton = React.createClass({
  handleClick: function() {
    this.props.onCheckedStatusChanged("RETAINED");
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Retained</button>
    );
  }
});

const ReplacedButton = React.createClass({
  handleClick: function() {
    this.props.onCheckedStatusChanged("REPLACED");
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Replaced</button>
    );
  }
});

const WrongButton = React.createClass({
  handleClick: function() {
    this.props.onCheckedStatusChanged("WRONG");
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Wrong</button>
    );
  }
});

const UncheckButton = React.createClass({
  handleClick: function() {
    this.props.onCheckedStatusChanged("NOT_CHECKED");
  },
  render: function() {
    return (
      <button onClick={this.handleClick}>Uncheck</button>
    );
  }
});

module.exports = TempCheckModule;