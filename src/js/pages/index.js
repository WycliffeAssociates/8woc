(function() {
  const ReactDOM = require('react-dom');
  const React = require('react');
  const CheckModuleView = require('../components/modules/phrase_check_module/CheckModuleView');

  const remote = window.electron.remote;
  const {Menu} = remote;
// var db = require('./db-init');
  const UploadModal = require('../components/UploadModal');
  const MenuBar = require('../components/MenuBar');
  const ProjectModal = require('../project/ProjectModal');
  const Root = require('./root')
  const SettingsModal = require('../components/SettingsModal');

  var App = {
    init: function() {
      var menu = Menu.buildFromTemplate(MenuBar.template);
      Menu.setApplicationMenu(menu);
      var Application = (
        <div>
<<<<<<< HEAD
        <Root />
        <ProjectModal />
        <UploadModal />
        <SettingsModal />
=======
          <TPane />
          <UploadModal />
          <CheckModuleView />
          <SettingsModal />
>>>>>>> develop
        </div>
      );
      ReactDOM.render(Application, document.getElementById('content'));
    }
  };

  window.App = App;
})();
document.addEventListener('DOMContentLoaded', App.init);
