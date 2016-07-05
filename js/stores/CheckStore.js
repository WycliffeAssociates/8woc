import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class CheckStore extends EventEmitter {
  constructor() {
    super();
  }

  handleActions(action) {
    
  }

}

const checkStore = new CheckStore;
dispatcher.register(checkStore.handleActions.bind(checkStore));

export default checkStore;
