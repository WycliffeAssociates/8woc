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
        color: "grey" // when it is not being used it dos not show itself to
        // the user
      };
    }

    var style1;
    if (checkedStatus === "WRONG") { // if  checkedStatus equas wrong red X glypghicon appears
      style1 = {
        color: "red",
        display: 'initial'
      };
    }
    else {
      style1 = {
        display: 'none'
      };
    }

    var style2;
    if (checkedStatus === "REPLACED") { // gold glyphicon appears
      style2 = {
        color: "gold",
        display: 'initial'
      };
    }
    else {
      style2 = {
        display: 'none'
      };
    }

    var style3;
    if (checkedStatus === "RETAINED") { // green check glyphicon appears
      style3 = {
        color: "green",
        display: 'initial'
      };
    }
    else {
      style3 = {
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
            glyph = "remove"
            style = {style1}
          />
        </span>
        <span>
          <Glyphicon
            glyph = "random"
            style = {style2}
          />
        </span>
        <span>
          <Glyphicon
            glyph = "ok"
            style = {style3}
          />
        </span>
      </span>
    );
  },

});

module.exports = MenuItem;
