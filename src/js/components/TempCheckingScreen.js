const React = require('react');
const Well = require('react-bootstrap/lib/Well.js');

const NavigationMenu = require('./NavigationMenu');
const TempCheckModule = require('./TempCheckModule');
const CheckStore = require('../stores/CheckStore');

// checking screen has navigation menu and check module in it
module.exports = React.createClass({
  render: function() {
    return (
      <div>
          <NavigationMenu />
          <TempCheckModule />
      </div>
    );
  }
});
