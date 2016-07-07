const React = require('react');
const RB = require('react-bootstrap');
const {Button} = RB;

class NextButton extends React.Component{
  render(){
    return (
      <Button onClick={this.props.nextItem}>Next &#8594;</Button>
    );
  }
};

module.exports = NextButton;
