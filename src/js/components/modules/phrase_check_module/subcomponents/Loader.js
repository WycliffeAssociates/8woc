var React = require('react');
var RB = require('react-bootstrap');
var {ProgressBar} = RB;

var Loader = React.createClass({
  render: function(){
    return (
      <ProgressBar
        now={this.props.progress}
        style={{verticaAlign: 'middle'}}
      />
    );
  }
});

module.exports = Loader;
