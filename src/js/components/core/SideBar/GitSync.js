const git = require('../GitApi.js');
const api = window.ModuleApi;
const CoreActions = require('../../../actions/CoreActions.js');
const CoreStore = require('../../../stores/CoreStore.js');
const pathFinder = require('path');
import gogs from '../login/GogsApi.js';


function syncToGit(inputPath, manifest) {
  var alertError = console.error;
  console.error = console.errorold;
  const user = CoreStore.getLoggedInUser();
  const path = inputPath;
  if (user) {
    git(path).save('Updating with Door43', path, function() {
      if (manifest.repo) {
        var urlArray = manifest.repo.split('.');
        urlArray.pop();
        var finalPath = urlArray.join('.').split('/');
        var repoName = finalPath.pop();
        var userName = finalPath.pop();
        var repoPath = userName + '/' + repoName;
        var remote = 'https://' + user.token + '@git.door43.org/' + repoPath + '.git';
        git(path).update(remote, 'master', false, function(err){
          if (err) {
            var ask = 'You don\'t have permission to push to this repository.\nWould you like to create a new Door43 project?';
            var result = confirm(ask);
            if(result) {
              const projectName = repoName;
              gogs(user.token).createRepo(user, projectName).then(function(repo) {
                var newRemote = 'https://' + user.token + '@git.door43.org/' + repo.full_name + '.git';
                var remoteLink = 'https://git.door43.org/' + repo.full_name + '.git';
                api.updateManifest('repo', remoteLink);
                git(path).update(newRemote, 'master', true, function(err){
                  if (err) {
                    git(path).update(newRemote, 'master', false, function(){
                      console.error = alertError;
                    });
                  } else {
                    console.error = alertError;
                  }
                });
              });
            } else {
              console.error = alertError;
            }
          } else {
            console.error = alertError;
            //TODO: find a way to make the dispatch work in this file 
            //api.Toast.success('Update succesful', '', 7);
          }
        });
      } else {
        var ask = 'There is no associated repository with this translationCore project.\nWould you like to create a new Door43 project?'
        var result = confirm(ask);
        if(result) {
          const projectName = path.split(pathFinder.sep);
          var nameOfProject = projectName.pop();
          nameOfProject = nameOfProject.replace(/[^A-Za-z-_\d]/g, '_')
          var repoPath = user.username + '/' + nameOfProject;
          var remote = 'https://' + user.token + '@git.door43.org/' + repoPath + '.git';
          var remoteLink = 'https://git.door43.org/' + repoPath + '.git';
          api.updateManifest('repo', remoteLink);
          git(path).update(remote, 'master', true, function(err){
            if (err) {
              gogs(user.token).createRepo(user, nameOfProject).then(function(repo) {
                var newRemote = 'https://' + user.token + '@git.door43.org/' + repo.full_name + '.git';
                remoteLink = 'https://git.door43.org/' + repo.full_name + '.git';
                api.updateManifest('repo', remoteLink);
                git(path).update(newRemote, 'master', true, function(err){
                  if (err) {
                    git(path).update(newRemote, 'master', false, function(err){
                      if (!err) {
                        //TODO: find a way to make the dispatch work in this file 
                        //api.Toast.success('Update succesful', '', 7);
                      }
                      console.error = alertError;
                    });
                  } else {
                    console.error = alertError;
                    //TODO: find a way to make the dispatch work in this file 
                    //api.Toast.success('Update succesful', '', 7);
                  }
                });
              });
            } else {
              console.log('happend');
              console.error = alertError;
              //TODO: find a way to make the dispatch work in this file 
              //api.Toast.success('Update succesful', '', 7);
            }
          });
        }
      }
    });
  } else {
    //TODO: find a way to make the dispatch work in this file 
    //api.Toast.info('Login then try again', '', 7);
  }
}

module.exports = syncToGit
