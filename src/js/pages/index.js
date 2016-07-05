(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');
  const PhraseChecker = require('../components/modules/PhraseChecker');

  const remote = window.electron.remote;
  const {Menu} = remote;

  const TPane = require('../components/core/TPane');
// var db = require('./db-init');
  const UploadModal = require('../components/core/UploadModal');
  const MenuBar = require('../components/core/MenuBar');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(MenuBar.template);
      Menu.setApplicationMenu(menu);
      var Application = (
        <div>
          <TPane />
          <UploadModal />
          <PhraseChecker />
        </div>
      );
      ReactDOM.render(Application, document.getElementById('content'));
    }
  };

  window.App = App;
})();
document.addEventListener('DOMContentLoaded', App.init);
