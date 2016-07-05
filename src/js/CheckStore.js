const EventEmitter = require('events').EventEmitter;
const Dispatcher = require('./Dispatcher');
const consts = require("./CoreActionConsts.js");

const CHANGE_EVENT = 'change';

class CheckStore extends EventEmitter {
  constructor() {
    super();

    // Initialize CheckStore's fields here...
    this.exampleComponentText = "init";
    this.checkIndex = 0;
    this.checks = [
      {
        book: "Ephesians",
        chapter: 1,
        verse: 11,
        phrase: "God the Father",
        checkedStatus: "NOT_CHECKED"
      },
      {
        book: "Ephesians",
        chapter: 2,
        verse: 12,
        phrase: "Jesus Christ",
        checkedStatus: "NOT_CHECKED"
      },
      {
        book: "Ephesians",
        chapter: 3,
        verse: 13,
        phrase: "Holy Spirit",
        checkedStatus: "NOT_CHECKED"
      }
    ];
  }

  getAllChecks() {
    return this.checks;
  }

  getCurrentCheck() {
    return this.checks[this.checkIndex];
  }

  getCheckIndex() {
    return this.checkIndex;
  }

  getExampleComponentText() {
    return this.exampleComponentText;
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

      default:
        // do nothing
    }
  }

}

const checkStore = new CheckStore;
Dispatcher.register(checkStore.handleActions.bind(checkStore));
module.exports = checkStore;