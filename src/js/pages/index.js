(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');

  const remote = window.electron.remote;
  const {Menu} = remote;
  const FileModule = require('../components/FileModule');
  
  const TPane = require('../components/TPane');
// var db = require('./db-init');
  const UploadModal = require('../components/UploadModal');
  const MenuBar = require('../components/MenuBar');
  const ExampleComponent = require('../components/ExampleComponent');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(MenuBar.template);
      Menu.setApplicationMenu(menu);
      var Application = (
        <div>
          <TPane />
          <UploadModal />
        </div>
      );
      // ReactDOM.render(Application, document.getElementById('content'));
      ReactDOM.render(<ExampleComponent />, document.getElementById('content'));
    }
  };

  window.App = App;

  window.FileModule = FileModule;
})();
document.addEventListener('DOMContentLoaded', App.init);