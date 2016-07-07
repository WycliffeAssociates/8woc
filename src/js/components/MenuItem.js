// MenuItem.js
const Glyphicon = require('react-bootstrap/lib/Glyphicon.js');
const React = require('react');
const ReactDOM = require('react-dom');

const CheckActions = require('../actions/CheckActions');
const style = require('./Style');

class MenuItem extends React.Component {
  constructor() {
    super();
    this.menuItemClicked = this.menuItemClicked.bind(this);
  }

  menuItemClicked() {
    CheckActions.goToCheck(this.props.checkIndex);
  }

  render() {
    var checkStatus = this.props.check.checkStatus;

    // when the flag is toggled it turns blue
    var flagStyle;
    if (this.props.check.flagged) {
      flagStyle = style.menu_item_flag_enabled;
    }
    else {
      flagStyle = style.menu_item_flag_disabled;
    }

    var checkStatusStyle;
    var glyphIcon;
    switch(checkStatus) {
      case "RETAINED":
        glyphIcon = "ok";
        checkStatusStyle = style.menu_item_status_icon_retained;
        break;
      case "REPLACED":
        glyphIcon = "random";
        checkStatusStyle = style.menu_item_status_icon_replaced;
        break;
      case "WRONG": 
        glyphIcon = "remove";
        checkStatusStyle = style.menu_item_status_icon_wrong;
        break;
      default:
        glyphIcon = '';
        checkStatusStyle = style.menu_item_status_icon_unchecked;
    }

    return (
      <span>
        <Glyphicon glyph="flag" style={flagStyle} />
        <span style={style.menu_item_text}>
          <a onClick={this.menuItemClicked}>
            {" " + this.props.check.book + " " + this.props.check.chapter + ":" + this.props.check.verse + " "}
          </a>
        </span>
        <span>
          <Glyphicon glyph={glyphIcon} style={checkStatusStyle} />
        </span>
      </span>
    );
  }

}

module.exports = MenuItem;
