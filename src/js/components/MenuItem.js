// MenuItem.js
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const React = require('react');
const ReactDOM = require('react-dom');

const style = require('./Style');

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
      flagStyle = style.menu_item_flag_enabled;
    }
    else {
      flagStyle = style.menu_item_flag_disabled;
    }

    var checkedStatusStyle;
    var glyphIcon;
    switch(checkedStatus) {
      case "RETAINED":
        glyphIcon = "ok";
        checkedStatusStyle = style.menu_item_status_icon_retained;
        break;
      case "REPLACED":
        glyphIcon = "random";
        checkedStatusStyle = style.menu_item_status_icon_replaced;
        break;
      case "WRONG": 
        glyphIcon = "remove";
        checkedStatusStyle = style.menu_item_status_icon_wrong;
        break;
      default:
        glyphIcon = '';
        checkedStatusStyle = style.menu_item_status_icon_unchecked;
    }

    return (
      <span>
        <Glyphicon glyph="flag" style={flagStyle} onClick={this.toggleFlag.bind(this)} />
        <span>{" " + this.props.check.book + " " + this.props.check.chapter + ":" + this.props.check.verse}</span>
        <span>
          <Glyphicon glyph={glyphIcon} style={checkedStatusStyle} />
        </span>
      </span>
    );
  }

}

module.exports = MenuItem;
