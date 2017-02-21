const consts = require('./CoreActionConsts');
const api = window.ModuleApi;

module.exports.onSettingsChange = function (field) {
  api.setSettings(field.name, field.value);
  var value = {};
  value[field.name] = field.value;
  return {
    type: consts.CHANGE_SETTINGS,
    val: value
  }
};
