(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');
  const TPane = require('./tpane');
// var db = require('./db-init');
  const UploadModal = require('./uploadmodal');
  const remote = window.electron.remote;
  const {Menu} = remote;
  const menubar = require('./menubar');
  const TempCheckingScreen = require('./TempCheckingScreen');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(menubar.template);
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
