var React = require('react');
var RB = require('react-bootstrap');
var {Button, ButtonGroup} = RB;

var FlagDisplay = React.createClass({
  render: function(){
    var _this = this;
    return (
      <ButtonGroup vertical block>
        <Button bsStyle="success" onClick={
          function() {
            _this.props.setFlagState("Retained")
          }
          }>&#10003; Retain</Button>
        <Button bsStyle="warning" onClick={
          function() {
            _this.props.setFlagState("Changed")
          }
          }>&#9872; Changed</Button>
        <Button bsStyle="danger" onClick={
          function() {
            _this.props.setFlagState("Wrong")
          }
        }>&#10060; Wrong</Button>
      </ButtonGroup>
    );
  }
});

module.exports = FlagDisplay;
