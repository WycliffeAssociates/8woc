(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');

  const remote = window.electron.remote;
  const {Menu} = remote;

  const TPane = require('./TPane');
// var db = require('./db-init');
  const UploadModal = require('./UploadModal');
  const menubar = require('./MenuBar');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(menubar.template);
      Menu.setApplicationMenu(menu);
      var Application = (
        <div>
          <TPane />
          <UploadModal />
        </div>
      );
      ReactDOM.render(Application, document.getElementById('content'));
    }
  };

  window.App = App;
})();
document.addEventListener('DOMContentLoaded', App.init);
