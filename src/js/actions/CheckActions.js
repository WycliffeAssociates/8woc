var Dispatcher = require('../dispatchers/Dispatcher');
var consts = require('./CheckActionConsts');
var FileModule = require('../components/FileModule');
/*
Creates actions related to checks
*/
module.exports = {
  /**
   * Sends an action which will update the current check in CheckStore
   * @param {String} propertyName
   * @param {Object} propertyValue
   */
  changeCheckProperty: function(propertyName, propertyValue) {
    Dispatcher.handleAction({
      type: consts.CHANGE_CHECK_PROPERTY,
      propertyName: propertyName,
      propertyValue: propertyValue
    });
  },

  // Async reads the Json file at the given path, then dispatches an action with
  // the resulting object
  changeCheckCategory: function(newCheckCategory, filePath) {
    var this_ = this;
    FileModule.readJsonFile(filePath, function(jsonObject) {
      this_.changeCheckCategory_(newCheckCategory, jsonObject);
    });
  },

  changeCheckCategory_: function(newCheckCategory, jsonObject) {
    Dispatcher.handleAction({
      type: consts.CHANGE_CHECK_CATEGORY,
      newCheckCategory: newCheckCategory,
      jsonObject, jsonObject
    });
  }

};