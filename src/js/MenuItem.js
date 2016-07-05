// MenuItem.js
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const React = require('react');
const ReactDOM = require('react-dom');

const MenuItem = React.createClass({

  // sets initial state of flagged as false color grey until user clicks it them it becomes true and looks blue
  getInitialState: function() {
    return {
      flagged: false
    };
  },
  // this toggles the text as flagged or not flagged every time it is clicked
  toggleFlag: function(e) {
    this.setState({ // this.setState makes the state able to be changed
      flagged: !this.state.flagged
    });
  },
  render: function() {
    var checkedStatus = this.props.check.checkedStatus;

    // when the flag is toggled it turns blue
    var flagStyle;
    if (this.state.flagged) {
      flagStyle = {
        color: "blue",
        display: 'initial'
      };
    }
    else {
      flagStyle = {
        color: "grey"
      };
    }

    var checkedStatusStyle;
    var glyphIcon;
    switch(checkedStatus) {
      case "WRONG": 
        glyphIcon = "remove";
        checkedStatusStyle = {
          color: "red",
          display: 'initial'
        };
        break;
      case "REPLACED":
        glyphIcon = "random";
        checkedStatusStyle = {
          color: "gold",
          display: 'initial'
        };
        break;
      case "RETAINED":
        glyphIcon = "ok";
        checkedStatusStyle = {
          color: "green",
          display: 'initial'
        };
        break;
      default:
        glyphIcon = '';
        checkedStatusStyle = {
          display: 'none'
        };
    }

    return (
      <span>
        <Glyphicon glyph="flag" style={flagStyle} onClick={this.toggleFlag} />
        <span>{" " + this.props.check.book + " " + this.props.check.chapter + ":" + this.props.check.verse}</span>
        <span>
          <Glyphicon glyph={glyphIcon} style={checkedStatusStyle} />
        </span>
      </span>
    );
  },

});

module.exports = MenuItem;
