(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');

  const remote = window.electron.remote;
  const {Menu} = remote;
  
  const TPane = require('../components/TPane');
// var db = require('./db-init');
  const UploadModal = require('../components/UploadModal');
  const MenuBar = require('../components/MenuBar');
  const TempCheckingScreen = require('../components/TempCheckingScreen');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(MenuBar.template);
      Menu.setApplicationMenu(menu);
      var Application = (
        <div>
          <TempCheckingScreen />
          <UploadModal />
        </div>
      );
      ReactDOM.render(Application, document.getElementById('content'));
    }
  };

  window.App = App;
})();
document.addEventListener('DOMContentLoaded', App.init);
