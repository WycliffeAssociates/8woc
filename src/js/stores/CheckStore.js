/**
 * @author Logan Lebanoff
 * @description Stores data relating to Check Modules.
 *              It has data like: an array of all the checks, the id of the current
 *              check category, and a list of all the check cateogry options.
 ******************************************************************************/

var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatchers/Dispatcher');
var CheckConsts = require("../actions/CheckActionConsts.js");
var FileModule = require("../components/FileModule.js");
var utils = require("../utils.js");

var CHANGE_EVENT = 'change';

class CheckStore extends EventEmitter {
  constructor() {
    super();
    this.currentCheck = {checkStatus: "UNCHECKED", comments: ""};
    this.checks = {};
    // -1 means no checkCategory is selected
    this.checkCategoryId = -1;
    // TODO: this needs to be filled with actual data when the project is loaded
    this.checkCategoryOptions = [
      {
          name: "Lexical Checks",
          id: 1,
          filePath: "C:/Users/Logan Lebanoff/Desktop/8woc/8woc/data/projects/eph_mylanguage/check_modules/lexical_check_module/check_data.json"
      },
      {
          name: "Phrase Checks",
          id: 2,
          filePath: "C:/Users/Logan Lebanoff/Desktop/8woc/8woc/data/projects/eph_mylanguage/check_modules/phrase_check_module/check_data.json"
      }
    ];
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

  getCurrentCheckCategory() {
    return this.getCheckCategory(this.checkCategoryId);
  }

  findById(source, id) {
    for (var i = 0; i < source.length; i++) {
      if (source[i].id == id) {
        return source[i];
      }
    }
    // Element not found
    return undefined;
  }

  getCheckCategory(id) {
    return this.findById(this.checkCategoryOptions, id);
  }

  getCheckCategoryOptions() {
    return this.checkCategoryOptions;
  }

  // Fills the checks array with the data in jsonObject and the id
  // from newCheckCategory
  fillAllChecks(jsonObject, id) {
    var checks;
    for(var el in jsonObject) {
      this.checks = jsonObject[el];
      break;
    }
    this.checkCategoryId = id;
  }

  emitChange() {
    this.emit(CHANGE_EVENT);
  }

  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

  handleActions(action) {
    switch(action.type) {
      case CheckConsts.CHANGE_CHECK_PROPERTY:
        this.setCurrentCheckProperty(action.propertyName, action.propertyValue);
        break;

      case CheckConsts.CHANGE_CHECK_CATEGORY:
        this.fillAllChecks(action.jsonObject, action.id);
        break;

      // do nothing
      default:
        return;
    }
    this.emitChange();
  }

}

const checkStore = new CheckStore;
Dispatcher.register(checkStore.handleActions.bind(checkStore));

module.exports = checkStore;