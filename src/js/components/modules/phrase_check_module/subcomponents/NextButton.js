var React = require('react');
var RB = require('react-bootstrap');
var {Button} = RB;

var NextButton = React.createClass({
  render: function(){
    return (
      <Button onClick={this.props.nextItem}>Next &#8594;</Button>
    );
  }
});

module.exports = NextButton;
