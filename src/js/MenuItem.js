// MenuItem.js
var Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
var React = require('react');
var ReactDOM = require('react-dom');

var MenuItem = React.createClass({

  getInitialState: function() { // sets initial state of flagged as false color grey until user clicks it them it becomes true and looks blue
    return {
      flagged: false
    };
  },

  toggleFlag: function(e) { // this toggles the text as flagged or not flagged
                            // every time it is clicked
    this.setState({ // this.setState makes the state able to be changed
      flagged: !this.state.flagged
    });
  },
  render: function() {
    var checkedStatus = this.props.check.checkedStatus; // getting check status as a prop and putting it in variable checkedStatus

    var style;
    if (this.state.flagged) {
      style = {
        color: "blue",
        display: 'initial' // when it is toggled it turns blue
      };
    }
    else {
      style = {
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
        <Glyphicon
          glyph = "flag"
          style = {style}
          onClick = {this.toggleFlag}
        />
        <span>
            {" " + this.props.check.book + " "}
        </span>
        <span>
             {this.props.check.chapter}
        </span>
         : 
        <span>
             {this.props.check.verse}
        </span>
        <span>
          <Glyphicon
            glyph = {glyphIcon}
            style = {checkedStatusStyle}
          />
        </span>
      </span>
    );
  },

});

module.exports = MenuItem;
