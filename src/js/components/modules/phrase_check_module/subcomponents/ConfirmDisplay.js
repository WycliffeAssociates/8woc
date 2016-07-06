var React = require('react');

var ConfirmDisplay = React.createClass({
  render: function(){
    return (
      <form>
        <label>{this.props.toCheck}</label>
        <label>{this.props.note}</label>
      </form>
    );
  }
});


module.exports = ConfirmDisplay;
