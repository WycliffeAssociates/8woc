var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('../dispatchers/Dispatcher');
var CheckConsts = require("../actions/CheckActionConsts.js");
var CoreConsts = require("../actions/CoreActionConsts.js");
var FileModule = require("../components/FileModule.js");
var utils = require("../utils.js");

var CHANGE_EVENT = 'change';

class CheckStore extends EventEmitter {
  constructor() {
    super();
    this.currentCheck = {checkStatus: "UNCHECKED", comments: ""};
    this.checks = {};
    this.checkCategoryId = -1;
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
    return undefined;
    // throw "Couldn't find object with id: " + id;
  }

  getCheckCategory(id) {
    // console.log("check options");
    // console.log(this.checkCategoryOptions);
    // console.log(this.checkCategoryId);
    return this.findById(this.checkCategoryOptions, id);
    // console.log(this.checkCategoryOptions.find(function (cat) {
    //   return cat.id === id;
    // }));
    // return this.checkCategoryOptions.find(function (cat) {
    //   return cat.id === id;
    // });
  }

  getCheckCategoryOptions() {
    return this.checkCategoryOptions;
  }

  loadAllChecks(newCheckCategory, jsonObject) {
    var checks;
    for(var el in jsonObject) {
      // The checks array is the top level value
      this.checks = jsonObject[el];
      break;
    }
    this.checkCategoryId = newCheckCategory.id;
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
      case CheckConsts.CHANGE_CHECK_PROPERTY:
        this.setCurrentCheckProperty(action.propertyName, action.propertyValue);
        this.emitChange();
        break;

      case CheckConsts.CHANGE_CHECK_CATEGORY:
        this.loadAllChecks(action.newCheckCategory, action.jsonObject);
        this.emitChange();
        break;

      default:
        // do nothing
    }
  }

}

const checkStore = new CheckStore;
Dispatcher.register(checkStore.handleActions.bind(checkStore));

window.CheckStore = checkStore;
module.exports = checkStore;