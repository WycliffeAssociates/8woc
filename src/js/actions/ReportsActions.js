const consts = require('./CoreActionConsts');

export function loadReports () {
  return ((dispatch) => {
    dispatch({
      type: consts.SHOW_NOTIFICATION,
      message: 'Generating reports',
      duration: 5,
    });
    dispatch({
      type: consts.LOAD_REPORTS,
      val: true
    });
  });
};
