/**
 * @description: This file provides the drag and drop file upload, along with
 *               the more traditional click and open file upload system.
 * @author: Ian Hoegen
 ******************************************************************************/
const Dropzone = require('react-dropzone');
const electron = require('electron');
const FM = require('./js/filemodule.js');
const menubar = require('./js/menubar.js');
const {remote} = require('electron');
const {Menu} = remote;
const parser = require('./js/usfm-parse.js');
const {dialog} = remote;

var FileUploader = React.createClass({
  onDrop: function(files) {
    if (files !== undefined) {
      sendToReader(files[0].path);
    }
  },
  onClick: function() {
    dialog.showOpenDialog({
      properties: ['openDirectory']
    }, function(filename) {
      if (filename !== undefined) {
        sendToReader(filename[0]);
      }
    });
  },

  render: function() {
    return (
    <div onClick = {this.onClick}>
      <Dropzone onDrop = {this.onDrop} disableClick={true} multiple={false}>
        <div>Drag files here to upload, or click to select a file. </div>
      </Dropzone>
    </div>

  );
  }

});

// Generates the menu bar with appropriate click functions.
menubar.template[0].submenu = [
  {label: 'Import Project',
  click(item, focusedWindow) {
    ReactDOM.render(<FileUploader />, document.getElementById('content'));
  }}];
var template = menubar.template;
var menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
/**
 * @description This function is used to send a file path to the readFile()
 * module
 * @param {string} file The path of the directory as specified by the user.
 ******************************************************************************/
function sendToReader(file) {
  try {
    FM.readFile(file + '\\manifest.json', readInManifest, file);
  } catch (error) {
    dialog.showErrorBox('Import Error', 'Please make sure that ' +
    'your folder includes a manifest.json file.');
  }
}
/**
 * @description This function takes the manifest file and parses it to JSON.
 * @param {string} manifest - The manifest.json file
 * @param {string} source - Manifest file source
 ******************************************************************************/
function readInManifest(manifest, source) {
  let parsedManifest = JSON.parse(manifest);
  let finishedChunks = parsedManifest.finished_chunks;
  openChunks(finishedChunks, source);
}

/**
 * @description This function processes the chunks defined in the manifest file.
 * @param {array} chunkArray - An array of the chunks defined in manifest
 * @param {string} source - Manifest file source
 ******************************************************************************/
function openChunks(chunkArray, source) {
  for (let chapterVerse in chunkArray) {
    let splitted = chunkArray[chapterVerse].split('-');
    openUsfmFromChunks(splitted, source);
  }
}
/**
 * @description This function opens the chunks defined in the manifest file.
 * @param {array} chunkArray - An array of the chunks defined in manifest
 * @param {string} source - Manifest file source
 ******************************************************************************/
function openUsfmFromChunks(chunk, source) {
  console.log(chunk);
  try {
    FM.readFile(source + '\\' + chunk[0] + '\\' + chunk[1] + '.txt', test);
  } catch (error) {
    console.log(error);
  }
}

function test(text) {
  console.log(text);
  console.log(parser(text));
}
