// MenuItem.js
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const React = require('react');
const ReactDOM = require('react-dom');

class MenuItem extends React.Component {
  constructor() {
    super();
    this.state = {
      flagged: false
    };
  }

  toggleFlag(e) {
    this.setState({
      flagged: !this.state.flagged
    });
  }

  render() {
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
  }

}

module.exports = MenuItem;
