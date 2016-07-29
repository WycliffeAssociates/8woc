/**
 * An abstract class that can be extended to easily create a check module.
 */

const React = require('react');
var api;

class CheckModule extends React.Component {
  
  /**
   * @description - Public method that your check module can call to get the data for the current check.
   * You should only call this method to get data, not to save data.
   * To save data, use the updateCheckStatus(), updateCheckProperty(), and getDataFromTools() methods.
   */
  getCurrentCheck() {
    return this.state.currentCheck;
  }

  /**
   * @description - Public method to update the status of the check to be displayed in the navigation menu.
   * @param {string} newCheckStatus - the check status selected by the user, one of three possible values:
   *  * 'RETAINED': displays a green check in the menu
   *  * 'REPLACED': displays a yellow shuffle icon in the menu
   *  * 'WRONG': displays a red X in the menu
   *  * 'UNCHECKED': displays nothing in the menu
   */
  updateCheckStatus(newCheckStatus) {
    var currentCheck = this.getCurrentCheckFromCheckStore();
    currentCheck.checkStatus = newCheckStatus;
    api.emitEvent('changedCheckStatus', {
      groupIndex: this.getCurrentGroupIndex(),
      checkIndex: this.getCurrentCheckIndex(),
      checkStatus: newCheckStatus
    });
    this.updateState();
  }

  /**
   * @description - Public method to change any property of the current check.
   * @param {string} key - the key used to identify the data in the current check
   * @param {object} value - the value to save in the current check, as selected by the user
   */
  updateCheckProperty(key, value) {
    var currentCheck = this.getCurrentCheckFromCheckStore();
    currentCheck[key] = value;
    this.updateState();
  }
  
  /**
   * @description - Abstract method that must be implemented in your check module if you want
   * to save data that comes from tools within your check module, such as ProposedChanges.
   * This is called when the user clicks the NextButton or a MenuItem in the NavigationMenu.
   * Gets data from tools that are in the check module view and returns an object with
   * keys and values that will be stored in the current check.
   */
  getDataFromTools() {
    return {};
  }
  
  constructor() {
    super();
    api = window.ModuleApi;
    
    this.state = {
      currentCheck: null
    };
    
    // Bind functions to the View object so the "this" context isn't lost
    this.updateCheckStatus = this.updateCheckStatus.bind(this);
    this.goToNext = this.goToNext.bind(this);
    this.goToCheck = this.goToCheck.bind(this);
    this.changeCurrentCheckInCheckStore = this.changeCurrentCheckInCheckStore.bind(this);
  }
  
  componentWillMount() {
    api.registerEventListener('goToNext', this.goToNext);
    api.registerEventListener('goToCheck', this.goToCheck);
    this.updateState();
  }
  
  componentWillUnmount() {
    api.removeEventListener('goToNext', this.goToNext);
    api.removeEventListener('goToCheck', this.goToCheck);
  }
  
  /**
   * @description - Called when the user clicks the next button
   */
  goToNext() {
    var currentGroupIndex = this.getCurrentGroupIndex();
    var currentCheckIndex = this.getCurrentCheckIndex();
    this.changeCurrentCheckInCheckStore(currentGroupIndex, currentCheckIndex + 1);
  }
  
  /**
   * @description - Called when the user clicks a menu item in the navigation menu
   * @param {params} object - contains groupIndex and checkIndex of the menu item clicked
   */
  goToCheck(params) {
    this.changeCurrentCheckInCheckStore(params.groupIndex, params.checkIndex);
  }
  
  /**
   * @description - Changes the current check index and group index within the store
   * @param {integer} newGroupIndex - the group index of the check selected in the navigation menu
   * @param {integer} newCheckIndex - the group index of the check selected in the navigation menu
   */
  changeCurrentCheckInCheckStore(newGroupIndex, newCheckIndex) {
    //Get the proposed changes and add it to the check
    var proposedChanges = api.getDataFromCheckStore('ProposedChanges', 'currentChanges');
    var currentCheck = this.state.currentCheck;
    if (currentCheck && proposedChanges != "" && proposedChanges != this.getVerse('targetLanguage')) {
      currentCheck.proposedChanges = proposedChanges;
    }

    var groups = api.getDataFromCheckStore(this.nameSpace, 'groups');
    var currentGroupIndex = this.getCurrentGroupIndex();
    var currentCheckIndex = this.getCurrentCheckIndex();
    //error check to make sure we're going to a legal group/check index
    if (newGroupIndex !== undefined && newCheckIndex !== undefined) {
      if (newGroupIndex < groups.length) {
        api.putDataInCheckStore(this.nameSpace, 'currentGroupIndex', newGroupIndex);
        if (newCheckIndex < groups[currentGroupIndex].checks.length) {
          api.putDataInCheckStore(this.nameSpace, 'currentCheckIndex', newCheckIndex);
        }
        /* In the case that we're incrementing the check and now we're out of bounds
          * of the group, we increment the group.
          */
        else if (newCheckIndex == groups[currentGroupIndex].checks.length &&
          currentGroupIndex < groups.length - 1) {
          api.putDataInCheckStore(this.nameSpace, 'currentGroupIndex', currentGroupIndex + 1);
          api.putDataInCheckStore(this.nameSpace, 'currentCheckIndex', 0);
        }
        //invalid indices: don't do anything else
        else {
          return;
        }
      }
    }
    this.updateState();
  }

  /**
   * @description - This method grabs the information that is currently in the
   * store and uses it to update our state, which in turn updates our view. This method is
   * typically called after the store is updated so that our view updates to the latest
   * data found in the store
   */
  updateState() {
    var currentGroupIndex = this.getCurrentGroupIndex();
    var currentCheckIndex = this.getCurrentCheckIndex();
    var currentCheckFromStore = this.getCurrentCheckFromCheckStore();
    this.setState({
      currentCheck: currentCheckFromStore
    });
    api.emitEvent('goToVerse', {
      chapterNumber: currentCheckFromStore.chapter,
      verseNumber: currentCheckFromStore.verse
    });
  }
  
  /**
   * @description - Returns the current check from the check store. This is not a copy.
   * If it is modified, the changes will be reflected in the check store.
   */
  getCurrentCheckFromCheckStore() {
    var currentGroupIndex = this.getCurrentGroupIndex();
    var currentCheckIndex = this.getCurrentCheckIndex();
    var groups = api.getDataFromCheckStore(this.nameSpace, 'groups');
    var currentCheck = groups[currentGroupIndex]['checks'][currentCheckIndex];
    return currentCheck;
  }
  
  getCurrentGroupIndex() {
    return api.getDataFromCheckStore(this.nameSpace, 'currentGroupIndex');
  }
  
  getCurrentCheckIndex() {
    return api.getDataFromCheckStore(this.nameSpace, 'currentCheckIndex');
  }
}

module.exports = CheckModule;