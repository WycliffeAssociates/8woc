const React = require('react');
const ReactDOM = require('react-dom');
const Well = require('react-bootstrap/lib/Well.js');

const TempCheckModule = React.createClass({
  render: function() {
    return (
      <div>
        <Well>
          <div>
            {this.props.check.phrase}
          </div>
          <div>
            {/* rendering the buttons and passing the call backs as props */ }
            <RetainedButton onCheckedStatusChanged={this.props.onCheckedStatusChanged} />
            <ReplacedButton onCheckedStatusChanged={this.props.onCheckedStatusChanged} />
            <WrongButton onCheckedStatusChanged={this.props.onCheckedStatusChanged} />
            <UncheckButton onCheckedStatusChanged={this.props.onCheckedStatusChanged} />
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
