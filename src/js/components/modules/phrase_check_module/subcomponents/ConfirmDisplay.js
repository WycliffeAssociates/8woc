const React = require('react');

class ConfirmDisplay extends React.Component{
  render(){
    return (
      <form>
        <label>{this.props.toCheck}</label>
        <label>{this.props.note}</label>
      </form>
    );
  }
}


module.exports = ConfirmDisplay;
