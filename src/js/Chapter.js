const React = require('react');

const Chapter = React.createClass({
  render: function() {
    return (
   <div>
       <h5>
       <strong>Chapter {this.props.chapterNum}</strong></h5>
       <div>{this.props.arrayOfVerses}</div>
   </div>
 );
  }
});

module.exports = Chapter;
