var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatchers/Dispatcher');
var CheckConsts = require("../actions/CheckActionConsts.js");
var CoreConsts = require("../actions/CoreActionConsts.js");
var utils = require("../utils.js");

var CHANGE_EVENT = 'change';

class CheckStore extends EventEmitter {
  constructor() {
    super();
    // For ExampleCheckModule
    this.currentCheck = {checkStatus: "UNCHECKED", comments: ""};
    this.checks = {};
    this.checkCategory = null;
  }

  // Public function to return a deep clone of the current check
  // Why not just return this.currentCheck? Because that returns a reference to
  // the object, and we don't want any changes made here to be reflected elsewhere,
  // and vice versa
  getCurrentCheck() {
    var check = this.currentCheck;
    return utils.cloneObject(check);
  }

  setCurrentCheckProperty(propertyName, propertyValue) {
    this.currentCheck[propertyName] = propertyValue;
  }

  loadAllChecks(jsonObject) {
    var checks;
    for(var el in jsonObject) {
      // The check category (i.e. Phrase Checks) is the top level key
      this.checkCategory = el;
      // The checks array is the top level value
      this.checks = jsonObject[el];
      break;
    }
    console.log(this.checkCategory);
    console.log("allchecks:");
    console.log(this.checks);
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  /**
   * @param {function} callback
   */
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  handleActions(action) {
    switch(action.type) {
      case CheckConsts['ChangeCheckProperty']:
        this.setCurrentCheckProperty(action.propertyName, action.propertyValue);
        this.emitChange();
        break;
      case CoreConsts['OpenCheckModule']:
        this.loadAllChecks(action.jsonObject);
        this.emitChange();
        break;

      default:
        // do nothing
    }
  }

}

const checkStore = new CheckStore;
Dispatcher.register(checkStore.handleActions.bind(checkStore));
module.exports = checkStore;