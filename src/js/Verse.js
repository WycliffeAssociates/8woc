const React = require('react');

const Verse = React.createClass({
  render: function() {
    return (
   <p>
     <strong>{this.props.verseNumber} </strong>
     {this.props.verseText}
   </p>
 );
  }
});

module.exports = Verse;
