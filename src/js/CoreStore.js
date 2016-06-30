var EventEmitter = require('events').EventEmitter;
var Dispatcher = require('./Dispatcher');
var consts = require("./CoreActionConsts.js");
/**

Keep pretty much all business logic and data in 
here. Make methods so components can retrieve
that data.

How to use the store:
Require this file in your component, and call
methods to get whatever data you need. Also include
the following snippet in your component:

  componentWillMount() {
    CoreStore.on("change", ...some component method here...);
  }

  componentWillUnmount() {
    CoreStore.removeListener("change", ...that component method here...);
  }

This will make it so your component will be subscribed
to the store and listen for the store's emits. The store 
sends an emit when its data changes, and any subscribed
component will hear it and be able to ask for updated data.
(See ExampleComponent.js)

*/

class CoreStore extends EventEmitter {
  constructor() {
    super();

    // Initialize CoreStore's fields here...
    this.exampleComponentText = "init";
  }

  getExampleComponentText() {
    return this.exampleComponentText;
  }

  handleActions(action) {
    switch(action.type) {
      case consts["AddCheck"]: {
        // change some data here...

        // Emits that a change was made, so any
        // component listening for this store
        // can update its data
        this.emit("change");
        break;
      }
      case consts["NextVerse"]: {
        // change some data here...
        this.emit("change");
        break;
      }
      case consts["PrevVerse"]: {
        // change some data here...
        this.emit("change");
        break;
      }
      // For ExampleComponent
      case "ADD_TO_TEXT": {
        this.exampleComponentText += "a";
        this.emit("change");
        break;
      }
    }
  }

}

const coreStore = new CoreStore;
Dispatcher.register(coreStore.handleActions.bind(coreStore));
window.CoreStore = coreStore;
module.exports = coreStore;