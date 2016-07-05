var fluxDispatch = require('flux').Dispatcher;
var Dispatcher = new fluxDispatch();

Dispatcher.handleAction = function(action) {
  action.source = 'VIEW_ACTION';
  this.dispatch(
      action
  );
};
module.exports = Dispatcher;
/**
Stores can require this file and call register(callback)
to have that callback run whenever anything is dispatched by an
action. The callback function should take in a single parameter
(lets call it "disData" for this example)
In the callback, you can look at disData.action to get the
type of action that occured and ignore or react as appropriate

Right now the source of every action is from the view, so this
is the only function that I included. More functions that take actions
from different sources can easily be added later if they are needed
*/
