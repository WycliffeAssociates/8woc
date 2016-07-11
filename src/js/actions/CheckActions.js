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
  changeCheckCategory: function(newCheckCategory) {
    var this_ = this;
    FileModule.readJsonFile(newCheckCategory.filePath, function(jsonObject) {
      this_.changeCheckCategory_(jsonObject, newCheckCategory.id);
    });
  },

  changeCheckCategory_: function(jsonObject, id) {
    Dispatcher.handleAction({
      type: consts.CHANGE_CHECK_CATEGORY,
      jsonObject: jsonObject,
      id: id
    });
  }

};