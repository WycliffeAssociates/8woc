/**
 * @author: Ian Hoegen
 * @description: This handles the events for all things relating to the upload
 *               of the files.
 ******************************************************************************/
var EventEmitter = require('events').EventEmitter;

class FileActions extends EventEmitter {
  constructor(text) {
    super();
    this.storedText = text;
  }

  changeTargetText(newText) {
    this.storedText = newText;
    this.emit("changeTL", this.storedText);
  }

  setState(boolean) {
    this.emit("upload", boolean);
  }
}

var store = new FileActions();

module.exports = store;
