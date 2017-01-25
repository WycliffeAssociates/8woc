const consts = require('../actions/CoreActionConsts');
const api = window.ModuleApi;
const merge = require('lodash.merge');

var initialState = {
  currentSettings: api.getSettings()
};

module.exports = (state = initialState, action) => {
  switch (action.type) {
    case consts.CHANGE_SETTINGS:
      return merge({}, state, {
        currentSettings: merge(state.currentSettings, action.val)
      });
      break;
    default:
      return state;
  }
}
